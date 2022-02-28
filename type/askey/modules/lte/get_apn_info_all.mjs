export default json => json.item.map(i => ({
	apn_auth_method: +i.apn_auth_method[0],
	apn_name: i.apn_name[0],
	apn_password: i.apn_password[0],
	apn_user: i.apn_user[0],
	enabled: Boolean(+i.enable[0]),
	isDefault: Boolean(+i.is_default[0]),
	profileName: i.profile_name[0],
	type: +i.type[0] // TODO: to text
}));