'use strict';


exports.baseUrl = function () {
	var port = exports.ensureValidPort( process.env.HTTPS_PORT ) || 8443;
	return 'https://localhost:' + port + '/';
};

exports.baseUrlHttp = function () {
	var port = exports.ensureValidPort( process.env.HTTP_PORT ) || 8080;
	return 'http://localhost:' + port + '/';
};

exports.needleOptions = {
	compressed: true,
	rejectUnauthorized: false
};

exports.ensureValidPort = function ( port ) {
	var p = parseInt( port, 10 );

	if ( isNaN( p ) ) {
		return false;
	}

	if ( p >= 0 ) {
		return p;
	}

	return false;
};