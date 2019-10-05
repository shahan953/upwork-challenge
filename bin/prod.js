const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const dist = path.resolve('dist');
const build = path.resolve('build');
if (fs.existsSync(dist) && fs.existsSync(build)) {
  shell.exec('node dist/core');
} else {
  console.log('Build not found. Creating build file...\n');
  shell.exec('npm run build');
}
