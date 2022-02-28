export default json => json.item.map(i => ({
	// idx: +i.idx[0], // unneeded, as it seems to always be the same as the array index
	// total: +i.total[0], // unneeded, as it seems to always be the same as the array length
	ip: i.ip[0],
	mac: i.mac[0],
	name: i.name[0],
	type: +i.type[0] === 0 ? 'WiFi' : 'LAN', // router admin interface considers type=0 to be WiFi, all else to be LAN
	v6ip: i.v6ip[0],
}));