export default json => ({
	current: +json.item[0].current[0],
	percentage: +json.item[0].percentage[0],
	temperature: json.item[0].temperature[0],
	voltage: +json.item[0].voltage[0],
});