export default class TMISP {
	// properties
		type; // TMO modem type, matches type folder - "askey"
		ip = '192.168.1.1'; // unless LAN settings have been changed, most setups will have this as a default address. Can be overwritten
		username = 'admin'; // askey modem doesn't seem to allow any username changes. Still, can be overwritten
		password; // will be hashed
	constructor(cfg) { Object.assign(this, cfg); }
	get typeModule() {
		if (this._typeModule) { return Promise.resolve(this._typeModule); }
		return import(`./type/${this.type}/main.mjs`).then(tMod => this._typeModule = tMod); // can't use await in a getter - no such thing as an async getter
	}
	
	async command(...cmds) { return await (await this.typeModule).command(this, cmds.flat(Infinity)); }
	async login() { await (await this.typeModule).login(this); return this; }
	async logout() { await (await this.typeModule).logout(this); return this; }
	async smsInbox() { return (await this.typeModule).smsInbox(this); }
	async smsSend(to, msg) { return (await this.typeModule).smsSend(this, to, msg); }
	async wifi() { return (await this.typeModule).wifi(this); }
	async lan() { return (await this.typeModule).lan(this); }
	async wan() { return (await this.typeModule).wan(this); }
	async firmware() { return (await this.typeModule).firmware(this); }
};