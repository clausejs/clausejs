const whiteSpaces = [
  0x0009, // Tab
  0x000a, // Line Feed
  0x000b, // Vertical Tab
  0x000c, // Form Feed
  0x000d, // Carriage Return
  0x0020, // Space
    //0x0085, // Next line - Not ES5 whitespace
  0x00a0, // No-break space
  0x1680, // Ogham space mark
  0x180e, // Mongolian vowel separator
  0x2000, // En quad
  0x2001, // Em quad
  0x2002, // En space
  0x2003, // Em space
  0x2004, // Three-per-em space
  0x2005, // Four-per-em space
  0x2006, // Six-per-em space
  0x2007, // Figure space
  0x2008, // Punctuation space
  0x2009, // Thin space
  0x200a, // Hair space
    //0x200b, // Zero width space - Not ES5 whitespace
  0x2028, // Line separator
  0x2029, // Paragraph separator
  0x202f, // Narrow no-break space
  0x205f, // Medium mathematical space
  0x3000, // Ideographic space
  0xfeff // Byte Order Mark
];

export default whiteSpaces.reduce( ( acc, item ) => {
  return acc + String.fromCharCode( item );
}, '' );
