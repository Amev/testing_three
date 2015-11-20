import React from 'react';

class Html extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<html>
				<head>
					<meta charSet="utf-8"/>
					<title>Slidor</title>
					<link rel="stylesheet" href="http://localhost:3000/build/style.css" />
				</head>
				<body>
					<div id="container" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
					<script src="/socket.io/socket.io.js"></script>
					<script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
					<script src="/build/bundle.js"></script>
				</body>
			</html>
		);
	}
}

export default Html;
