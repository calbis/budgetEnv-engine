'use strict';

var helper = require( './helper' );
var expect = require( "chai" ).expect;
var needle = require( "needle" );


describe( "BudgetEnv Engine", function () {
	describe( "Should get a response back from the server", function () {
		it( "servers response", function ( done ) {
			needle.get( helper.baseUrl(), helper.needleOptions,
				function ( err, res ) {
					expect( err ).to.not.exist;
					expect( res ).to.exist;

					done();
				} );
		} );
	} );

	describe( "Should get a 404 error when a valid route/file is not found", function () {
		it( "returns status 404", function ( done ) {
			needle.get( helper.baseUrl() + 'asdfg.hjk', helper.needleOptions,
				function ( err, res ) {
					expect( err ).to.not.exist;
					expect( res ).to.exist;
					expect( res.statusCode ).to.equal( 404 );

					done();
				} );
		} );
	} );

	describe( "Should be redirected from http to https", function () {
		it( "Returns status 301", function ( done ) {
			needle.get( helper.baseUrlHttp(), helper.needleOptions,
				function ( err, res ) {
					expect( err ).to.not.exist;
					expect( res ).to.exist;
					expect( res.statusCode ).to.equal( 301 );

					done();
				} );
		} );
	} );
} );