const https = require('https');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
require('dotenv').config();

const CONFIG = require('./config.js');

const ApiRoutes = require('./api/routes/routes');

const app = express();
// disable x-powered-by header
app.disable('x-powered-by');
app.use(helmet({
	contentSecurityPolicy: false,
	crossOriginIsolated: false,
	crossOriginResourcePolicy: { policy: 'cross-origin' },
	crossOriginEmbedderPolicy: false,
	crossOriginOpenerPolicy: false
}));

const server = https.createServer({
	cert: fs.readFileSync(path.resolve(CONFIG.SSL.CERT)),
	key: fs.readFileSync(path.resolve(CONFIG.SSL.KEY))
}, app);

server.listen(CONFIG.SERVER.PORT, () => {
	console.log('[HTTP] Web server is online on port ' + CONFIG.SERVER.PORT);
});

app.use(cors({
	exposedHeaders: 'Authorization',
	credentials: true,
	origin: ['https://mealmate.io', 'http://127.0.0.1:5173', 'http://localhost:5173']
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// host app
app.use(express.static(path.resolve(__dirname, '../app/dist')));

// api routes
app.use('/api', ApiRoutes);

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../app/dist/index.html')));

// listen for unexpected errors
const EXIT_EVENTS = ['beforeExit', 'SIGINT', 'uncaughtException', 'unhandledRejection'];
EXIT_EVENTS.forEach((event) => {
	process.on(event, (exitCode) => {
		console.log(`[PROCESS] Exiting with code: ${exitCode}`);

		// print stack trace not just exit code
		if(event === 'uncaughtException' || event === 'unhandledRejection'){
			console.log('[PROCESS] Stack trace:');
			console.log(exitCode);
		}
		
		return process.exit(1);
	});
});