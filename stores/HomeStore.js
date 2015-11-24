import {BaseStore} from 'fluxible/addons';
import THREE from 'three.js-node';

class HomeStore extends BaseStore {

	constructor(dispatcher) {
		super(dispatcher);
		this.cameraPosition = new THREE.Vector3(600, 0, 0);
		this.intervalID = undefined;
		this.cameraAzimuth = 0;
		this.color = 0x00ff00;
	}

	getState() {
		return {
			cameraPosition: this.cameraPosition,
			cameraAzimuth: this.cameraAzimuth,
			intervalID: this.intervalID,
			color: this.color
		};
	}

	onInitCamera(payload) {
		this.intervalID = payload.intervalID;
	}

	onAnimateCamera(payload) {
		this.cameraAzimuth += 0.01;

		let orbitQuaternion = new THREE.Quaternion();
		orbitQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.cameraAzimuth);

		this.cameraPosition = new THREE.Vector3(600, 0, 0);
		this.cameraPosition.applyQuaternion(orbitQuaternion);
		this.emitChange();
	}

	onChangeColor(payload) {
		this.color = payload.color;
		this.emitChange();
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.cameraPosition = new THREE.Vector3(0, 0, 5);
		this.cubeRotation = new THREE.Euler();
		this.color = state.color;
	}
}

HomeStore.storeName = 'HomeStore';
HomeStore.handlers = {
	'ANIMATE_CAMERA_ACTION': 'onAnimateCamera',
	'CHANGE_COLOR_ACTION': 'onChangeColor',
	'INIT_CAMERA_ACTION': 'onInitCamera'
};

export default HomeStore;
