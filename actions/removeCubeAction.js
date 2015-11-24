import ApplicationStore from '../stores/ApplicationStore';

function removeCubeAction(context, payload) {
	let socket = context.getStore(ApplicationStore).getSocket();

	return new Promise((resolve, reject) => {
		socket.emit('removeCube', payload, (response) => {
			if (response.error === true) reject(response);
			context.dispatch('CHANGE_COLOR_ACTION', response);
			resolve();
		});
	}).catch((e) => {
		console.log(e);
		context.dispatch('ERROR_ACTION', e);
	});
}

export default removeCubeAction;
