function errorAction(context, payload) {
	context.dispatch('ERROR_ACTION', payload);
}

export default errorAction;
