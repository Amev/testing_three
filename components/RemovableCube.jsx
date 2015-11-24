import removeCubeAction from '../actions/removeCubeAction';
import ReactTHREE from 'react-three';
import THREE from 'three.js-node';
import ReactDOM from 'react-dom';
import React from 'react';

var Mesh = ReactTHREE.Mesh;
var Scene = ReactTHREE.Scene;
var Object3D = ReactTHREE.Object3D;
var PerspectiveCamera = ReactTHREE.PerspectiveCamera;

class RemovableCube extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event, intersection) {
		event.preventDefault();
		this.context.executeAction(removeCubeAction, {name: intersection.object.name});
	}

	render() {
		let cube = this.props.cube;
		let window = this.props.window;
		let Three = window ? window.THREE : THREE;
		let position = new Three.Vector3(cube.position.x, cube.position.y, cube.position.z);
		let geometry = new Three.BoxGeometry(100, 100, 100);
		let material = new Three.MeshBasicMaterial({color: cube.color, wireframe: true});
		let quaternion = new Three.Quaternion(
			cube.quaternion._x,
			cube.quaternion._y,
			cube.quaternion._z,
			cube.quaternion._w,
		);

		return (
			<Object3D position={position}>
				<Mesh position={position} geometry={geometry} material={material}
					quaternion={quaternion} name={cube.name} onClick3D={this.handleClick}/>
			</Object3D>
		);
	}
}

export default RemovableCube;
