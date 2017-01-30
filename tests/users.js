'use strict';

var helper = require( './helper' );
var expect = require( "chai" ).expect;
var needle = require( "needle" );

var baseUrl = helper.baseUrl() + 'users/';

describe( "Users without authentication", function () {
	describe( "Should get rejected", function () {
		it( "servers response", function ( done ) {
			needle.get( baseUrl, helper.needleOptions,
				function ( err, res ) {
					expect( err ).to.not.exist;
					expect( res ).to.exist;
					expect( res.statusCode ).to.equal( 401 );

					done();
				} );
		} );
	} );
} );