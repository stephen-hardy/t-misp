export default json => ({
	signal: +json.item[0].signal_level[0],
	tech: json.item[0].tech_status[0],

	plmnName: json.item[0].plmn_name[0],
	roamStatus: +json.item[0].roam_status[0],
	simStatus: +json.item[0].sim_status[0]
});