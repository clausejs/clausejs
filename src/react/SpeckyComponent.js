const React = require( 'react' );
import fromBaseClass from './fromBaseClass';

const SpeckyComponent = fromBaseClass( React.Component );

module.exports = SpeckyComponent;
module.exports.default = SpeckyComponent;
