import animateCubeAction from '../actions/animateCubeAction';
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

	constructor(props, context) {
		super(props, context);
		this.handleAnimate = this.handleAnimate.bind(this);
	}

	handleAnimate(event) {
		this.context.executeAction(animateCubeAction, {});
	}

	render() {
		let width = 500, height = 500;

		return (
			<React3 mainCamera="camera" width={width} height={height}
				onAnimate={this.handleAnimate}>
				<scene>
					<perspectiveCamera name="camera" fov={75} aspect={width/height}
						near={0.1} far={1000} position={this.props.cameraPosition} />
					<mesh rotation={this.props.cubeRotation}>
						<boxGeometry width={1} height={1} depth={1} />
						<meshBasicMaterial color={0x00ff00} />
					</mesh>
				</scene>
			</React3>
		);
	}
}

export default Home;
