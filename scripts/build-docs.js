#!/usr/bin/env node
import cheerio from 'cheerio';
var path = require( 'path' );
var fs = require( 'fs' );
var populateContent = require( '../docs/src/populateContent' );

const INDEX_TEMPLATE_FILE_NAME = path.join( __dirname, '..', 'docs', 'index.template.html' );
const INDEX_FILE_NAME = path.join( __dirname, '..', 'docs', 'index.html' );

let $ = cheerio.load( fs.readFileSync( INDEX_TEMPLATE_FILE_NAME ) );

populateContent( $, loadMd );

function loadMd(fileName) {
  return fs.readFileSync(path.join(__dirname, '../', 'docs', 'articles', fileName), "utf8");
}

fs.writeFileSync( INDEX_FILE_NAME, $.html() );
