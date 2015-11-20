function receiveColorAction(context, payload) {
	context.dispatch('CHANGE_COLOR_ACTION', {color: payload.color});
}

export default receiveColorAction;
