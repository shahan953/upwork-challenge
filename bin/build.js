const shell = require('shelljs');
shell.exec('babel server --out-dir dist');
console.log('\n');
shell.exec('react-scripts build');
