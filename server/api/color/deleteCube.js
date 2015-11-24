function deleteCube(socket) {
	socket.on('removeCube', (payload, done) => {
		let cubeID = payload.name,
			len = global.cubes.length;

		for (var i = 0; i < len; i++) {
			if (global.cubes[i].name === cubeID) {
				global.cubes.splice(i, 1);
				break ;
			}
		}
		socket.broadcast.emit('newColor', {color: global.color, cubes: global.cubes});
		done({color: global.color, cubes: global.cubes});
	});
}

export default deleteCube;
