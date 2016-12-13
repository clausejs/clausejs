#!/usr/bin/env node
var fs = require( 'fs' );
var path = require( 'path' );

var VERSION = require( './package_version' );
var rootPackageFilePath = path.join( __dirname, 'package.json' );
var rootObj = JSON.parse( fs.readFileSync( rootPackageFilePath ) );
rootObj.version = VERSION;
fs.writeFileSync( rootPackageFilePath, JSON.stringify( rootObj, null, 2 ) );

fs.readdir( path.join( __dirname, 'packages' ), ( err, files ) => {
  files.forEach( file => {
    var packagePath = path.join( __dirname, 'packages', file );
    if ( fs.lstatSync( packagePath ).isDirectory() ) {
      var packageFile = path.join( packagePath, 'package.json' );
      var obj = JSON.parse( fs.readFileSync( packageFile, 'utf8' ) );
      // sync package versions
      obj.version = VERSION;

      // sync peer dependency version
      updateDeps_mut( obj.peerDependencies );
      updateDeps_mut( obj.dependencies );
      fs.writeFileSync( packageFile, JSON.stringify( obj, null, 2 ) );
    }
  } );
} );

function updateDeps_mut( deps ) {
  if ( deps ) {
    for ( var depName in deps ) {
      if ( deps.hasOwnProperty( depName ) && /^specky/.test( depName ) ) {
        deps[ depName ] = VERSION;
      }
    }
  }
}

console.log( 'All versions set to ', VERSION );
