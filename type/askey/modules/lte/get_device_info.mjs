export default json => ({
	iccid: json.item[0].iccid[0],
	imei: json.item[0].imei[0],
	imsi: json.item[0].imsi[0],
	msisdn: json.item[0].msisdn[0],
});