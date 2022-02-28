export default class TMISP {
	// properties
		type;
		ip = '192.168.1.1';
		username = 'admin';
		password;
	constructor(cfg) { Object.assign(this, cfg); }
	get typeModule() {
		if (this._typeModule) { return Promise.resolve(this._typeModule); }
		return import(`./type/${this.type}/main.mjs`).then(tMod => this._typeModule = tMod);
	}
	
	async command(...cmds) { return await (await this.typeModule).command(this, cmds.flat(Infinity)); }
	async login() { await (await this.typeModule).login(this); return this; }
	async logout() { await (await this.typeModule).logout(this); return this; }
	async smsInbox() { return (await this.typeModule).smsInbox(this); }
	async smsSend() { return (await this.typeModule).smsSend(this); }
	async wifi() { return (await this.typeModule).wifi(this); }
	async lan() { return (await this.typeModule).lan(this); }
	async wan() { return (await this.typeModule).wan(this); }
	async firmware() { return (await this.typeModule).firmware(this); }
};