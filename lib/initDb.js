var conf = require( './conf' );
var Promise = require( "bluebird" );
var mongoose = Promise.promisifyAll( require( "mongoose" ) );
mongoose.Promise = require( 'bluebird' );

mongoose.connect( conf.dbConnectionString(), conf.dbConnectionOptions );

var User = require( '../models/user' );


var pasteurize = conf.pasteurize();
pasteurize.hashPassword( 'admin' ).then( function createUser( hash ) {
	var admin = new User( {
		id: 1,
		username: 'admin',
		password: hash,
		email: 'admin@localhost.com',
		firstName: 'admin-first',
		lastName: 'admin-last',
		authToken: null,
		tokenLastUsed: null
	} );

	admin.save().then( function outputSaved() {
		console.log( 'admin added' );
		exit();
	} );
} ).catch( function ( err ) {
	console.log( err );
	exit();
} );


function exit() {
	process.exit();
}