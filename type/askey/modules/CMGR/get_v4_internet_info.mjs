const connectStatus = ['Connected', 'Connecting', 'Connection Failed', 'Disconnected'],
	connectivityType = ['Ethernet', 'LTE', 'WiFi'];
export default json => ({
	connect_status: connectStatus[+json.item[0].connect_status[0]] || connectStatus[3],
	connectivity_type: connectivityType[+json.item[0].connectivity_type[0]] || connectivityType[0],
	xlat464: +json.item[0].connectivity_type[0] === 1 && json.item[0].ip[0] == '192.0.0.2', // taken from router admin page's JS post-processing
	gateway: json.item[0].gateway[0],
	ip: json.item[0].ip[0],
	netmask: json.item[0].netmask[0],
	primary_dns: json.item[0].primary_dns[0],
	protocol: +json.item[0].protocol[0], // router admin does not seem to use this value, therefore we have no translation for this number
	secondary_dns: json.item[0].secondary_dns[0],
});