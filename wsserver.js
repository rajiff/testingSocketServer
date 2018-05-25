const socketIO = require('socket.io');

function socketServer(serverToBind) {
	const wsServer = socketIO(serverToBind);

	wsServer.on('connection', (clientSocket) => {

		clientSocket.on('PING', (msg) =>{
			// console.log('Received PING from ', clientSocket.handshake.headers);
      let now = new Date();
      // PONG is the event name
      clientSocket.emit('PONG', `PONG ${new Date()}`);
		});

	}); //end of on Client connection event

}

module.exports = socketServer;