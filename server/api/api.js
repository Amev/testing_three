function socketAPI(socket) {
	console.log('connexion');
	socket.on('error', (payload) => {
		socket.emit('errorMSG', payload);
	});
}

export default socketAPI;
