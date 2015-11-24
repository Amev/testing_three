function getColor(socket) {
	socket.on('getColor', (done) => {
		done({color: global.color, cubes: global.cubes});
	});
}

export default getColor;
