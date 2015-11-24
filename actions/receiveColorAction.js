function receiveColorAction(context, payload) {
	context.dispatch('CHANGE_COLOR_ACTION', payload);
}

export default receiveColorAction;
