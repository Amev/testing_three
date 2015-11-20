require("babel/register")({
	stage: 0,
	extensions: [".jsx", ".js"]
});

var server = require('./server/server.js');
