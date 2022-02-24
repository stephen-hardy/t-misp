export default json => json.item.map(i => ({
	ch_band: +i.ch_band[0],
	ch_mode: +i.ch_mode[0],
	ch_width: +i.ch_width[0],
	channel: +i.channel[0],
	country_code: i.country_code[0],
	enable: +i.enable[0],
	ifname: i.ifname[0],
	ssid: i.ssid[0],
	ssid_hidden: +i.ssid_hidden[0]
}))