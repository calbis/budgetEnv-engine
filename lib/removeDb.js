var conf = require( './conf' );
var Promise = require( "bluebird" );
var mongoose = Promise.promisifyAll( require( "mongoose" ) );
mongoose.Promise = require( 'bluebird' );


var conn = mongoose.connect( conf.dbConnectionString(), conf.dbConnectionOptions );

mongoose.connection.dropDatabase().then( function () {
	console.log( "Database dropped" );
	exit();
} ).catch( function ( err ) {
	console.log( "Unable to drop database with error: " + err );
	exit();
} );


function exit() {
	process.exit();
}