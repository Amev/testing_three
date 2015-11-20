import ApplicationStore from '../stores/ApplicationStore';
import {connectToStores} from 'fluxible-addons-react';
import {NavLink} from 'fluxible-router';
import React from 'react';

@connectToStores([ApplicationStore], (context) => {
	return context.getStore(ApplicationStore).getState();
})
class NavBar extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div>
				<div className='navBar'>
					<NavLink href='/'> Home </NavLink>
				</div>
			</div>
		);
	}
}

export default NavBar;
