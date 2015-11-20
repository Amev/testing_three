export default {
	home: {
		path: '/',
		method: 'get',
		label: 'Home',
		handler: require('../components/Home.jsx'),
		action: require('../actions/getColorAction.js')
	},
	notFound: {
		path: '*',
		method: 'get',
		handler: require('../components/NotFound.jsx')
	}
};
