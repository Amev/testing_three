import animateCubeAction from '../actions/animateCubeAction';
import changeColorAction from '../actions/changeColorAction';
import ApplicationStore from '../stores/ApplicationStore';
import {connectToStores} from 'fluxible-addons-react';
import HomeStore from '../stores/HomeStore';
import React3 from 'react-three-renderer';
import ReactDOM from 'react-dom';
import THREE from 'three.js';
import React from 'react';

@connectToStores([HomeStore], (context) => {
	return context.getStore(HomeStore).getState();
})
class Home extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	static propTypes = {
		handleClick: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
		this.handleClick = this.handleClick.bind(this);
		this.handleAnimate = this.handleAnimate.bind(this);
	}

	handleAnimate(event) {
		this.context.executeAction(animateCubeAction, {});
	}

	handleClick(event) {
		event.preventDefault();

		this.context.executeAction(changeColorAction, {});
	}

	render() {
		let window = this.context.getStore(ApplicationStore).getWindow(),
			height = window ? window.innerHeight : 500,
			width = window ? window.innerWidth : 500;

		return (
			<div onMouseDown={this.handleClick}>
			<React3 mainCamera="camera" width={width} height={height}
				onAnimate={this.handleAnimate}>
				<scene>
					<perspectiveCamera name="camera" fov={75} aspect={width/height}
						near={0.1} far={1000} position={this.props.cameraPosition} />
					<mesh rotation={this.props.cubeRotation} ref="mesh">
						<boxGeometry width={1} height={1} depth={1} />
						<meshBasicMaterial color={this.props.color} wireframe />
					</mesh>
				</scene>
			</React3>
			</div>
		);
	}
}

export default Home;
