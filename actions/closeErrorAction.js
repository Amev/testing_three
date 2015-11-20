function closeErrorAction(context, payload) {
	context.dispatch('CLOSE_ERROR_ACTION', payload);
}

export default closeErrorAction;
