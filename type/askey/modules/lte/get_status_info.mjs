const simStatus = ['Unknown', 'Ready', 'Unlock', 'Locked', 'Blocked', 'Does Not Exist', 'Error'],
	techType = {
		'2G': ['GPRS', 'EDGE', '1X', 'GSM'],
		'3G': ['HSDPA', 'HSUPA', 'REV0', 'REVA', 'REVB', 'WCDMA', 'HSDPA_PLUS', 'DC_HSDPA_PLUS', 'HSPA', 'HRPD', 'EHRPD', 'TDSCDMA'],
		'4G': ['64_QAM', 'LTE', 'FMC'],
		'5G': ['5G_NR'],
		'WLAN': ['3GPP_WLAN', '3GPP2_WLAN'],
	},
	roamStatus = ['Home', 'Roaming', '']; // empty string matches admin interface value
export default json => ({
	signal: +json.item[0].signal_level[0] / 5, // change to percent (0 - 1) to make maximum value clear
	tech: json.item[0].tech_status[0],
	techType: Object.entries(techType).find(([type, techs]) => techs.includes(json.item[0].tech_status[0]))[0],
	plmnName: json.item[0].plmn_name[0],
	roamStatus: roamStatus[+json.item[0].roam_status[0]],
	simStatus: simStatus[+json.item[0].sim_status[0]],
});