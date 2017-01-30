module.exports.dbConnectionString = function () {
	var host = 'localhost';
	var port = '27017';
	var user = null;
	var password = null;
	var dbName = 'beengine';

	if ( user ) {
		return 'mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + dbName;
	} else {
		return 'mongodb://' + host + ':' + port + '/' + dbName;
	}

};

module.exports.dbConnectionOptions = {};

module.exports.crypto = {
	keyLength: 128,
	saltLength: 256,
	iterations: 1000,
	digest: 'sha512'
};

module.exports.pasteurize = function () {
	var Promise = require( "bluebird" );
	var Pasteurize = Promise.promisifyAll( require( 'pasteurize' ).Pasteurize );
	return new Pasteurize( module.exports.crypto.keyLength, module.exports.crypto.saltLength, module.exports.crypto.iterations, module.exports.crypto.digest );
};
