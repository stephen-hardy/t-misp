export default json => ({
	connectivityType: json.item[0].connectivity_type[0],
	enabled: Boolean(+json.item[0].enable[0]),
	protocol: +json.item[0].protocol[0],
});