module.exports.dbConnectionString = function ( env ) {
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