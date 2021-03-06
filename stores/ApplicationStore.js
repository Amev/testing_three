import config from '../config/configPublic.json';
import {BaseStore} from 'fluxible/addons';
import socket from 'socket.io-client';

class ApplicationStore extends BaseStore {

	constructor(dispatcher) {
		super(dispatcher);
		this.error = new Object();
		this.socket = undefined;
		this.window = undefined;
	}

	initSocket() {
		this.socket = socket('http://localhost:3030/');
	}

	initSocketClient(socket) {
		this.socket = socket;
	}

	getWindow() {
		return this.window;
	}

	initWindow(window) {
		this.window = window;
	}

	getSocket() {
		return this.socket;
	}

	getError() {
		return this.error;
	}

	getState() {
		return {
			error: this.error
		};
	}

	onReceiveError(payload) {
		if (payload.error === true) {
			this.error = payload;
			this.emitChange();
		}
	}

	onCloseError(payload) {
		this.error = new Object();
		this.emitChange();
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.error = state.error;
	}
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
	'CLOSE_ERROR_ACTION': 'onCloseError',
	'ERROR_ACTION': 'onReceiveError'
};

export default ApplicationStore;
