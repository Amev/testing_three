import {connectToStores, provideContext} from 'fluxible-addons-react';
import closeErrorAction from '../actions/closeErrorAction';
import ApplicationStore from '../stores/ApplicationStore';
import {handleHistory} from 'fluxible-router';
import NotFound from './NotFound.jsx';
import React from 'react';

@provideContext
@handleHistory
@connectToStores([ApplicationStore], (context) => {
	return context.getStore(ApplicationStore).getState();
})
class Application extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose(event) {
		event.preventDefault();

		this.context.executeAction(closeErrorAction, {});
	}

	render() {
		var Handler = NotFound, error = '';

		if (this.props.error.message) {
			error = (
				<div className='errorBox'>
					<span>{this.props.error.informations}</span>
					<input type="button" value="Close" onClick={this.handleClose} />
				</div>
			);
		}
		if (this.props.currentRoute && this.props.currentRoute.handler)
			Handler = this.props.currentRoute.handler;
		return (
			<div>
				{error}
				<Handler />
			</div>
		);
	}
}

export default Application;
