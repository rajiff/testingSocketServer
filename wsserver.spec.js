const expect = require('chai').expect;
const wsServer = require('./wsserver');
const http = require('http');

describe('Websocket server tests', function(){
	let server = undefined;

	before(function(done) {
		server = http.createServer(() => console.log(" -/- "));
		wsServer(server);
		server.listen(7575, () => { console.log("BEFORE"); done(); });
	});

	after(function(done) {
		if(server) {
			server.on('close', () => { console.log('AFTER'); done(); });
			server.close(() => { console.log('CLOSING'); server.unref(); });
		}
	});

	it('PING Test', function(done) {
		const wsClient = require('socket.io-client')('http://localhost:7575/');
		wsClient.on('connection', () => console.log('Client connected'));
		wsClient.emit('PING', '');
		wsClient.on('PONG', (data) => {console.log(`${data}`); done(); });
	});
})