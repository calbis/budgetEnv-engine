var dbConf = require( './dbConf' );
var Promise = require( "bluebird" );
var mongoose = Promise.promisifyAll( require( "mongoose" ) );
mongoose.Promise = require( 'bluebird' );


var conn = mongoose.connect( dbConf.url(), dbConf.options );
console.log( "conn: " + conn );
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