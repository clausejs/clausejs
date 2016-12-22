#!/usr/bin/env node
import cheerio from 'cheerio';
var path = require( 'path' );
var fs = require( 'fs' );
var S = require( '../src' );
var docgen = require( '../src/docgen' );
import '../src/specs';
require( '../src/specs/index.annotation.js' );

const finalDocStr = docgen.gen( S.getRegistry() );
const finalCotStr = docgen.genCot( S.getRegistry() );

const INDEX_TEMPLATE_FILE_NAME = path.join( __dirname, '..', 'docs', 'index.template.html' );
const INDEX_FILE_NAME = path.join( __dirname, '..', 'docs', 'index.html' );

let $ = cheerio.load( fs.readFileSync( INDEX_TEMPLATE_FILE_NAME ) );
// console.log( finalDocStr )
$( '#cot' ).html( finalCotStr );
$( '#api' ).html( finalDocStr );
$( '.specky-version' ).html( S.VERSION );

fs.writeFileSync( INDEX_FILE_NAME, $.html() );
