const mode = [
	// 2.4ghz
		'802.11b Only',
		null,
		'802.11b/g Mixed',
		null,
		'802.11g/n Mixed',
	// 5ghz
		'802.11a/ac/n Mixed',
		'802.11a Only',
		'802.11a/n Mixed',
		'802.11ac Only',
];
const width = ['Auto', '20MHz', '40MHz', null, '80MHz'];
export default json => json.item.map((i, radio) => ({
	ch_band: +i.ch_band[0],
	ch_mode: mode[+i.ch_mode[0]] || mode[radio ? 0 : 5],
	ch_width: width[+i.ch_width[0]] || width[0],
	channel: +i.channel[0],
	country_code: i.country_code[0],
	enabled: Boolean(+i.enable[0]),
	ifname: i.ifname[0],
	ssid: i.ssid[0],
	ssid_hidden: Boolean(+i.ssid_hidden[0])
}))