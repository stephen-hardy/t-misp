const connectStatus = ['Connected', 'Connecting', 'Connection Failed', 'Disconnected'],
	connectivityType = ['Ethernet', 'LTE', 'WiFi'];
export default json => ({
	connect_status: connectStatus[+json.item[0].connect_status[0]] || connectStatus[3],
	connectivity_type: connectivityType[+json.item[0].connectivity_type[0]] || connectivityType[0],
	gateway: json.item[0].gateway[0],
	ip: json.item[0].ip[0],
	primary_dns: json.item[0].primary_dns[0],
	protocol: +json.item[0].protocol[0], // router admin does not seem to use this value, therefore we have no translation for this number
	secondary_dns: json.item[0].secondary_dns[0],

	pd_addr: json.item[0].pd_addr[0], // prefix delegation address
	pd_len: +json.item[0].pd_len[0], // prefix delegation length
	plen: +json.item[0].plen[0], // prefix length
});