var LocalStrategy = require( 'passport-local' ).Strategy;
var User = require( '../models/user' );
var bCrypt = require( 'bcrypt' );

module.exports = function ( passport ) {
	passport.use( new LocalStrategy( {
			session: false
		},
		function ( username, password, done ) {
			User.findOne( {username: username} ).then( function checkIfValid( user ) {
				if ( ! user ) {
					return done( null, false, {message: 'Incorrect username/password.'} );
				}
				if ( ! isValidPassword( user, password ) ) {
					return done( null, false, {message: 'Incorrect username/password.'} );
				}

				return done( null, user );

			} ).catch( function ( err ) {
				return done( err );
			} );
		}
	) );

	var isValidPassword = function ( user, password ) {
		return bCrypt.compareSync( password, user.password );
	};

	passport.serializeUser( function ( user, cb ) {
		cb( null, user._id );
	} );

	passport.deserializeUser( function ( id, cb ) {
		User.findById( id, function ( err, user ) {
			if ( err ) {
				return cb( err );
			}
			cb( null, user );
		} );
	} );
};