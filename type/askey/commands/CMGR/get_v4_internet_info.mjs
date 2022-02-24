export default json => ({
	connect_status: +json.item[0].connect_status[0],
	connectivity_type: +json.item[0].connectivity_type[0],
	gateway: json.item[0].gateway[0],
	ip: json.item[0].ip[0],
	netmask: json.item[0].netmask[0],
	primary_dns: json.item[0].primary_dns[0],
	protocol: +json.item[0].protocol[0],
	secondary_dns: json.item[0].secondary_dns[0],
});