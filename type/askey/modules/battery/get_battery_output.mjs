export default json => ({
	current: +json.item[0].current[0], // router admin appends " mA"
	percentage: json.item[0].percentage[0] === '' ? 'No Battery' : +json.item[0].percentage[0], // router admin indicates empty string means no battery is installed
	temperature: json.item[0].temperature[0], // router admin appends " °C"
	voltage: +json.item[0].voltage[0], // router admin appends " V"
});