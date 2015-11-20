import React from 'react';

class NotFound extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return <p>{"Error 404 Not Found"}</p>;
	}
}

export default NotFound;
