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
      // sync package versions
      obj.version = rootObj.version;

      // sync peer dependency version
      updateDeps_mut(obj.peerDependencies);
      updateDeps_mut(obj.dependencies);
      fs.writeFileSync(packagePath, JSON.stringify(obj, null, 2));
    }
  });
});

function updateDeps_mut(deps) {
  if(deps) {
    for(var depName in deps) {
      if (deps.hasOwnProperty(depName) && /^specky/.test(depName)) {
        deps[depName] = rootObj.version;
      }
    }
  }
}
