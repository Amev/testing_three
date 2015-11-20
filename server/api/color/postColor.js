function postColor(socket) {
	socket.on('postColor', (done) => {
		global.color = Math.random() * 0x808080 + 0x808080;
		socket.broadcast.emit('newColor', {color: global.color});
		done({color: global.color});
	});
}

export default postColor;
