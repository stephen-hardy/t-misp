import crypto from 'crypto'; import { parseStringPromise as parseXML } from 'xml2js';
const fetch = globalThis.fetch || (await import('node-fetch')).default;
// auth
	async function auth(tmisp, cmd, cfg = {}) {
		return fetch(`http://${tmisp.ip}/auth.fcgi`, {
			method: 'POST', contentType: 'application/json; charset=UTF-8',
			body: JSON.stringify({ AuthCmd: cmd, ...cfg })
		}).then(r => r.json()).then(r => r.Result[0]);
	}
	export async function login(tmisp) {
		const secret = (await (await fetch('http://192.168.1.1/vendor/hmac-sha512.js')).text()).slice(8464, 8476),
			UserPW = crypto.createHmac('SHA512', secret).update(tmisp.password).digest('hex');
		tmisp.uid = (await auth(tmisp, 'Login', { UserName: tmisp.username, UserPW })).Login;
	};
	export async function logout(tmisp) {
		await auth(tmisp, 'Logout', { AuthID: tmisp.uid });
		tmisp.uid = null;
	};
// wrcp - core command execution
	const tFmt = [['getHours', 2], ['getMinutes', 2], ['getSeconds', 2], ['getMilliseconds', 3]];
	function tID(dt = new Date()) { return tFmt.map(([type, pad]) => dt[type]().toString().padStart(pad, '0')).join(''); };
	async function wait(ms) { return new Promise(res => setTimeout(res, ms)); }
	async function wrcp(tmisp, files, add = [], transaction = tID()) {
		function toFileName(f) { return `!file=/${f}.xml`; }
		if (!tmisp.uid) { await tmisp.login(); }
		const body = ['transactionid=' + transaction, ...files.map(toFileName), ...add, '!'].join('&'),
			response = await fetch(`http://${tmisp.ip}/wrcp.fcgi?AuthID=${tmisp.uid}&ResetLoginTime=true`, { method: 'POST', body }),
			xml = await response.text(), json = await parseXML(xml);
		return Promise.all(json.web_main.command.map(async c => {
			const modName = c.module_name[0], cmd = c.module_command[0];
			if (c.module_result[0] === 'wait') {
				console.log(`waiting 1sec for ${modName}/${cmd}`);
				await wait(1000);
				return (await wrcp(tmisp, [modName + '/' + cmd], [], transaction))[0];
			}
			const transformed = (await import(`./modules/${modName}/${cmd}.mjs`).catch(_ => ({ default: c => c }))).default(c);
			if (tmisp.debug) { console.log(`${modName}/${cmd}`, c, transformed); }
			return transformed;
		}));
	}
// exported functions
	export async function smsSend(tmisp, to, msg) {
		return (await wrcp(tmisp, ['sms/set_send_msg'], [`param0= ;<WEB_UTF8>${to}</WEB_UTF8>;<WEB_UTF8>${msg}</WEB_UTF8>;`]))[0]
	}
	export async function smsInbox(tmisp) { return (await wrcp(tmisp, ['sms/get_inbox_all']))[0]; }
	export async function command(tmisp, cmds) { return await wrcp(tmisp, cmds); }
	export async function wifi(tmisp) {
		const [ifname, basic] = await wrcp(tmisp, ['wifiap/get_wifi_ifname', 'wifiap/get_wifi_basic']);
		return basic.map(network => ({
			band: network.ch_band,
			mode: network.ch_mode,
			channelWidth: network.ch_width,
			country: network.country_code,
			enabled: network.enable,
			ifname: network.ifname,
			description: ifname[network.ifname],
			ssid: network.ssid,
			hidden: network.ssid_hidden,
		}));
	}
	export async function lan(tmisp) {
		const [config, dhcps, mac] = await wrcp(tmisp, ['lan/get_lan_config', 'lan/get_lan_enable_dhcps', 'lan/get_lan_macaddr']);
		return config.map((cfg, i) => ({ ...cfg, ...dhcps[i], ...mac[i] }));
	}
	export async function wan(tmisp) {
		const [lteStatus, trafficDaily, trafficMonthly] = await wrcp(tmisp, ['lte/get_status_info', 'traffic/get_traffic_lte_currently', 'traffic/get_traffic_lte_monthly']);
		return {
			network: lteStatus.plmnName,
			connection: lteStatus.tech,
			signal: lteStatus.signal,
			traffic: {
				daily: trafficDaily,
				monthly: trafficMonthly,
			}
		};
	}
	export async function firmware(tmisp) {
		const [fwVer, hwVer, status] = await wrcp(tmisp, ['fwup/get_fw_version', 'fwup/get_hw_version', 'fwup/get_manage_status']);
		return { ...fwVer, ...hwVer, ...status };
	}