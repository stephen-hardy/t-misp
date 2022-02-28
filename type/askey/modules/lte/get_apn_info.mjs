export default json => ({
	method: ['None', 'PAP', 'CHAP'][json.item[0].apn_auth_method[0]],
	name: json.item[0].apn_name[0],
	password: json.item[0].apn_password[0],
	user: json.item[0].apn_user[0],
});