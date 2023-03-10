const DATE = new Date().toJSON().split('T')[0];

module.exports = {
	apps: [{
		name: 'Main Server',
		script: 'server.js',
		watch: false,

		// add --trace-warnings to node args
		args: ['--trace-warnings'],
		node_args: ['--trace-warnings'],

		max_restarts: 5,
		exp_backoff_restart_delay: 1000,
		autorestart: true,

		log_date_format: 'YYYY-MM-DD HH:mm Z',
		error_file: `./logs/ERROR_${DATE}.log`,
		out_file: `./logs/OUT_${DATE}.log`
	}]
};