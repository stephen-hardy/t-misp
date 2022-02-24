export default json => ({
	start: new Date(json.item[0].datebegin[0]),
	end: new Date(json.item[0].dateend[0])
});