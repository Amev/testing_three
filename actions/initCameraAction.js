function initCameraAction(context, payload) {
	return new Promise((resolve) => {
		let intervalID = window.setInterval(() => {
			context.dispatch('ANIMATE_CAMERA_ACTION', {});
		}, 17);
		resolve(intervalID);
	}).then((intervalID) => {
		context.dispatch('INIT_CAMERA_ACTION', {intervalID: intervalID});
	});
}

export default initCameraAction;
