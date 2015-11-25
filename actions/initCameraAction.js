function initCameraAction(context, payload) {
	let callback = () => {
		let promise = new Promise((resolve) => {
			context.dispatch('ANIMATE_CAMERA_ACTION', {});
			resolve();
		});
		promise.then(() => {
			window.requestID = requestAnimationFrame(callback);
		});
	};

	window.requestID = requestAnimationFrame(callback);
}

export default initCameraAction;
