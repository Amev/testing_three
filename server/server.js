import {createElementWithContext} from 'fluxible-addons-react';
import ApplicationStore from '../stores/ApplicationStore';
import HtmlComponent from '../components/Html.jsx';
import config from '../config/configServer.json';
import {navigateAction} from 'fluxible-router';
import serialize from 'serialize-javascript';
import ReactDOM from 'react-dom/server';
import compression from 'compression';
import favicon from 'serve-favicon';
import socketAPI from './api/api';
import SocketIO from 'socket.io';
import app from '../app/app.js';
import express from 'express';
import React from 'react';
import path from 'path';
import http from 'http';

var server = express();
var serverIO = http.createServer(server);
var component = React.createFactory(HtmlComponent);
server.use(compression());
server.use(favicon(__dirname + '/../app/favicon.ico'));
server.use(express.static('./'));
server.set('port', config.port || 3030);

global.color = 0x00ff00;
console.log(global.color);

var io = new SocketIO(serverIO);

server.use('/', (req, res, next) => {
	var context = app.createContext();

	context.getStore(ApplicationStore).initSocket();
	context.executeAction(navigateAction, {url: req.url}, (error) => {
		if (error) next(error);
		var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';'
		var contextComponent = context.getComponentContext();
		var html = ReactDOM.renderToStaticMarkup(component({
			state: exposed,
			markup: ReactDOM.renderToString(createElementWithContext(context)),
			context: contextComponent
		}));
		res.send(html);
	});
});

server.use((error, req, res, next) => {
	res.status(400).json(error);
});

serverIO.listen(server.get('port'), function() {
	console.log('Server started: http://localhost:' + server.get('port') + '/');
});

io.on('connection', socketAPI);
