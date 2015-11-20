export default {
	home: {
		path: '/',
		method: 'get',
		label: 'Home',
		handler: require('../components/Home.jsx')
	},
	notFound: {
		path: '*',
		method: 'get',
		handler: require('../components/NotFound.jsx')
	}
};
