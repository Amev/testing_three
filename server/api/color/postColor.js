import THREE from 'three.js-node';

function newCube() {
	let	cubeID = global.index++;
	cubeID = 'cube' + cubeID.toString();

	let newCube = {
		position: new THREE.Vector3(
			(Math.random() - 0.5) * 500,
			(Math.random() - 0.5) * 500,
			(Math.random() - 0.5) * 500
		),
		quaternion: new THREE.Quaternion().setFromEuler(new THREE.Euler(
			Math.random() * Math.PI,
			Math.random() * Math.PI,
			Math.random() * Math.PI,
			'XYZ'
		)),
		color: Math.random() * 0x808080 + 0x808080,
		key: cubeID,
		name: cubeID
	};

	global.cubes.push(newCube);
}

function postColor(socket) {
	socket.on('postColor', (done) => {
		global.color = Math.random() * 0x808080 + 0x808080;
		newCube();
		socket.broadcast.emit('newColor', {color: global.color, cubes: global.cubes});
		done({color: global.color, cubes: global.cubes});
	});
}

export default postColor;
