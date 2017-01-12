/* global describe, it */

'use strict';

var helper = require( './helper.js' );
var expect = require( "chai" ).expect;
var needle = require( "needle" );


describe( "BudgetEnv Engine", function() {
	describe( "Should get a response back from the server", function() {
		it( "servers response", function( done ) {
			needle.get( helper.baseUrl,
				function( err, res ) {
					expect( err ).to.not.exist;
					expect( res ).to.exist;

					done();
				} );
		} );
	} );
} );