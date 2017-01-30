var dbConf = require( './dbConf' );
var mongoose = require( 'mongoose' );
var Promise = require( "bluebird" );
mongoose.Promise = require( 'bluebird' );
Promise.promisifyAll( mongoose );
mongoose.connect( dbConf.url( process.env ), dbConf.options );

var bcrypt = require( 'bcrypt' );

var User = require( '../models/user' );

var saltRounds = process.env.SALTROUNDS || 10;

bcrypt.hash( 'admin', saltRounds ).then( function createUser( hash ) {
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