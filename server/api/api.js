import deleteCube from './color/deleteCube';
import postColor from './color/postColor';
import getColor from './color/getColor';

function socketAPI(socket) {
	getColor(socket);
	postColor(socket);
	deleteCube(socket);

	socket.on('error', (payload) => {
		socket.emit('errorMSG', payload);
	});
}

export default socketAPI;
