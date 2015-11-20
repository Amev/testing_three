import {BaseStore} from 'fluxible/addons';
import THREE from 'three.js';

class HomeStore extends BaseStore {

	constructor(dispatcher) {
		super(dispatcher);
		this.cameraPosition = new THREE.Vector3(0, 0, 5);
		this.cubeRotation = new THREE.Euler();
	}

	getState() {
		return {
			cameraPosition: this.cameraPosition,
			cubeRotation: this.cubeRotation
		};
	}

	onAnimateCube(payload) {
		this.cubeRotation = new THREE.Euler(this.cubeRotation.x + 0.001, this.cubeRotation.y + 0.01, 0);
		this.emitChange();
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.cameraPosition = state.cameraPosition;
		this.cubeRotation = state.cubeRotation;
	}
}

HomeStore.storeName = 'HomeStore';
HomeStore.handlers = {
	'ANIMATE_CUBE_ACTION': 'onAnimateCube'
};

export default HomeStore;
