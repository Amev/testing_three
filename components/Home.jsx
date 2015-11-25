import changeColorAction from '../actions/changeColorAction';
import initCameraAction from '../actions/initCameraAction';
import ApplicationStore from '../stores/ApplicationStore';
import createFragment from 'react-addons-create-fragment';
import {connectToStores} from 'fluxible-addons-react';
import RemovableCube from './RemovableCube.jsx';
import HomeStore from '../stores/HomeStore';
import ReactTHREE from 'react-three';
import THREE from 'three.js-node';
import ReactDOM from 'react-dom';
import React from 'react';

var Mesh = ReactTHREE.Mesh;
var Scene = ReactTHREE.Scene;
var Object3D = ReactTHREE.Object3D;
var PerspectiveCamera = ReactTHREE.PerspectiveCamera;

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
		this.handleClick = this.handleClick.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	handleClick(event) {
		event.preventDefault();
		this.context.executeAction(changeColorAction, {});
	}

	componentDidMount() {
		if (this.context.getStore(ApplicationStore).getWindow())
			this.context.executeAction(initCameraAction, {});
	}

	shouldComponentUpdate(nextProps) {
		let diff = nextProps.perform - this.props.perform;

		if (diff < 15)
			return false;
		return true;
	}

	componentWillUnmount() {
		if (window.requestID)
			cancelAnimationFrame(window.requestID);
		window.requestID = undefined;
	}

	render() {
		let window = this.context.getStore(ApplicationStore).getWindow(),
			height = window ? window.innerHeight : 500,
			width = window ? window.innerWidth : 500,
			Three = window ? window.THREE : THREE;
		let position = new Three.Vector3(0, 0, 0);
		let	geometry = new Three.BoxGeometry(200, 200, 200);
		let	material = new Three.MeshBasicMaterial({color: this.props.color, wireframe: true});
		let cubes = '';

		if (this.props.cubes.length > 0) {
			cubes = this.props.cubes.map((cube) => {
				return <RemovableCube key={cube.key} cube={cube} window={window}/>
			});
			return (
				<Scene width={width} height={height} camera="camera" background={0xffffff}
						antialias={true} pointerEvents={new Array('onClick')}>
					<PerspectiveCamera name="camera" fov={75} aspect={width/height}
						far={10000} near={1} position={this.props.cameraPosition}
						lookat={new Three.Vector3(0, 0, 0)} />
					<Object3D position={position}>
						<Mesh position={position} geometry={geometry} material={material}
							onClick3D={this.handleClick}/>
					</Object3D>
					{cubes}
				</Scene>
			);
		} else {
			return (
				<Scene width={width} height={height} camera="camera" background={0xffffff}
						antialias={true} pointerEvents={new Array('onClick')}>
					<PerspectiveCamera name="camera" fov={75} aspect={width/height}
						far={10000} near={1} position={this.props.cameraPosition}
						lookat={new Three.Vector3(0, 0, 0)} />
					<Object3D position={position}>
						<Mesh position={position} geometry={geometry} material={material}
							onClick3D={this.handleClick}/>
					</Object3D>
				</Scene>
			);
		}
	}
}

export default Home;
