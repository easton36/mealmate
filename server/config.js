const PRODUCTION = false;

module.exports = {
	PRODUCTION,
	SSL: {
		CERT: 'ssl/cert.pem',
		KEY: 'ssl/key.pem'
	},
	SERVER: {
		PORT: PRODUCTION ? 443 : 3000,
		DOMAIN: 'mealmate.io'
	}
}