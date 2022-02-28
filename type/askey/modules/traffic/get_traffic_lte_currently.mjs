export default json => ({
	rx: json.item[0].rx[0],
	total: json.item[0].total[0],
	tx: json.item[0].tx[0],
});