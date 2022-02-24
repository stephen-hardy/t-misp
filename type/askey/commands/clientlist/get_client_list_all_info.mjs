export default json => json.item.map(i => ({
	// idx: +i.idx[0],
	ip: i.ip[0],
	mac: i.mac[0],
	name: i.name[0],
	// total: +i.total[0],
	type: +i.type[0],
	v6ip: i.v6ip[0],
}));