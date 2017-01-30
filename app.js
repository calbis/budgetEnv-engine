var express = require( 'express' );
var path = require( 'path' );
var logger = require( 'morgan' );
var bodyParser = require( 'body-parser' );

var dbConf = require( './lib/dbConf' );
var Promise = require( "bluebird" );
var mongoose = Promise.promisifyAll( require( "mongoose" ) );
mongoose.Promise = require( 'bluebird' );
mongoose.connect( dbConf.url(), dbConf.options );

var passport = require( 'passport' );
require( './lib/passport' )( passport );

var index = require( './routes/index' );
var users = require( './routes/users' );
var login = require( './routes/login' );
var logout = require( './routes/logout' );

var app = express();

app.use( passport.initialize() );

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', index );
app.use( '/users', users );
app.use( '/login', login );
app.use( '/logout', logout );

app.use( function ( req, res, next ) {
	res.sendStatus( 404 );
} );

app.use( function ( err, req, res ) {
	res.sendStatus( err.status || 500 );
} );

module.exports = app;
