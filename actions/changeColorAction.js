import ApplicationStore from '../stores/ApplicationStore';

function changeColorAction(context, payload) {
	let socket = context.getStore(ApplicationStore).getSocket();

	return new Promise((resolve, reject) => {
		socket.emit('postColor', (response) => {
			if (response.error === true) reject(response);
			context.dispatch('CHANGE_COLOR_ACTION', {color: response.color});
			resolve();
		});
	}).catch((e) => {
		console.log(e);
		context.dispatch('ERROR_ACTION', e);
	});
}

export default changeColorAction;
