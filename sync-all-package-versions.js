#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var rootObj = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));

fs.readdir(path.join(__dirname, 'packages'), (err, files) => {
  files.forEach(file => {
    var packagePath = path.join(__dirname, 'packages', file);
    if(fs.lstatSync(packagePath).isDirectory()) {
      var packagePath = path.join(packagePath, 'package.json');
      var obj = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      obj.version = rootObj.version;
      fs.writeFileSync(packagePath, JSON.stringify(obj, null, 2));
    }
  });
});
