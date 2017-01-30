var express = require( 'express' );
var router = express.Router();
var passport = require( 'passport' );
var User = require( '../models/user' );


router.post( '/', passport.authenticate( 'local' ),
	function ( req, res ) {
		User.findOne( {username: req.user.username} ).then( function updateUser( user ) {
			require( 'crypto' ).randomBytes( 48, function ( err, buffer ) {
				var token = buffer.toString( 'hex' );

				user.authToken = token;
				user.tokenLastUsed = new Date();

				user.save().then( function sendToken( user ) {
					res.json( {authToken: user.authToken} );
				} );
			} );
		} );
	}
);

module.exports = router;
