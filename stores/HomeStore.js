import {BaseStore} from 'fluxible/addons';
import THREE from 'three.js';

class HomeStore extends BaseStore {

	constructor(dispatcher) {
		super(dispatcher);
		this.cameraPosition = new THREE.Vector3(0, 0, 5);
		this.cubeRotation = new THREE.Euler();
		this.color = 0x00ff00;
	}

	getState() {
		return {
			cameraPosition: this.cameraPosition,
			cubeRotation: this.cubeRotation,
			color: this.color
		};
	}

	onAnimateCube(payload) {
		this.cubeRotation = new THREE.Euler(this.cubeRotation.x + 0.001, this.cubeRotation.y + 0.01, 0);
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
	'ANIMATE_CUBE_ACTION': 'onAnimateCube',
	'CHANGE_COLOR_ACTION': 'onChangeColor'
};

export default HomeStore;
