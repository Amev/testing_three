import {createElementWithContext} from 'fluxible-addons-react';
import receiveColorAction from '../actions/receiveColorAction';
import ApplicationStore from '../stores/ApplicationStore';
import errorAction from '../actions/errorAction';
import config from '../config/configPublic.json';
import ReactDOM from 'react-dom';
import THREE from 'three';
import React from 'react';
import app from './app';

const dehydratedState = window.App;

window.React = React;
window.THREE = THREE;
window.socket = io.connect(config.serviceURL);

app.rehydrate(dehydratedState, (err, context) => {
	if (err) throw err;

	window.context = context;
	window.context.getStore(ApplicationStore).initWindow(window);
	window.context.getStore(ApplicationStore).initSocketClient(window.socket);
	const mountNode = document.getElementById('container');
	ReactDOM.render(createElementWithContext(context), mountNode);
});

socket.on('newColor', (payload) => {
	console.log(payload);
	window.context.executeAction(receiveColorAction, payload);
});

socket.on('errorMSG', (payload) => {
	console.log(payload);
	window.context.executeAction(errorAction, payload);
});
