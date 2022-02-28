export default json => json.item.map(i => ({
	connectionStatus: i.connect_status[0],
	connectivityType: i.connectivity_type[0],
	gateway: i.gateway[0],
	ip: i.ip[0],
	netmask: i.netmask[0],
	primaryDNS: i.primary_dns[0],
	protocol: i.protocol[0],
	secondaryDNS: i.secondary_dns[0],
}));