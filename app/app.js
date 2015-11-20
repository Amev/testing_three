import ApplicationStore from '../stores/ApplicationStore';
import Component from '../components/Application.jsx';
import RouteStore from '../stores/RouteStore';
import HomeStore from '../stores/HomeStore';
import Fluxible from 'fluxible';

let app = new Fluxible({
	component: Component,
	stores: [
		ApplicationStore,
		RouteStore,
		HomeStore
	]
});

export default app;
