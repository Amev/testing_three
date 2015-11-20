import postColor from './color/postColor';
import getColor from './color/getColor';

function socketAPI(socket) {
	console.log('connexion color');

	getColor(socket);
	postColor(socket);

	socket.on('error', (payload) => {
		socket.emit('errorMSG', payload);
	});
}

export default socketAPI;
