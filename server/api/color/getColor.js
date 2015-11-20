function getColor(socket) {
	socket.on('getColor', (done) => {
		done({color: global.color});
	});
}

export default getColor;
