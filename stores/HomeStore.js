import {BaseStore} from 'fluxible/addons';
import THREE from 'three.js-node';

class HomeStore extends BaseStore {

	constructor(dispatcher) {
		super(dispatcher);
		this.cameraPosition = new THREE.Vector3(1000, 0, 0);
		this.cubes = new Array(),
		this.cameraAzimuth = 0;
		this.color = 0x00ff00;
		this.perform = 0;
	}

	getState() {
		return {
			cameraPosition: this.cameraPosition,
			cameraAzimuth: this.cameraAzimuth,
			perform: this.perform,
			cubes: this.cubes,
			color: this.color
		};
	}

	onAnimateCamera(payload) {
		this.cameraAzimuth += 0.01;

		let orbitQuaternion = new THREE.Quaternion();
		orbitQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.cameraAzimuth);

		this.cameraPosition = new THREE.Vector3(1000, 0, 0);
		this.cameraPosition.applyQuaternion(orbitQuaternion);
		this.perform = window.performance.now();
		this.emitChange();
	}

	onChangeColor(payload) {
		this.color = payload.color;
		this.cubes = payload.cubes;
		this.emitChange();
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.cameraPosition = new THREE.Vector3(1000, 0, 0);
		this.cubeRotation = new THREE.Euler();
		this.perform = state.perform;
		this.color = state.color;
		this.cubes = state.cubes;
	}
}

HomeStore.storeName = 'HomeStore';
HomeStore.handlers = {
	'ANIMATE_CAMERA_ACTION': 'onAnimateCamera',
	'CHANGE_COLOR_ACTION': 'onChangeColor'
};

export default HomeStore;
