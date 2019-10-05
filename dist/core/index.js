'use strict';

var _cServer = require('./cServer');

var _cServer2 = _interopRequireDefault(_cServer);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _cDatabase = require('./cDatabase');

var _cDatabase2 = _interopRequireDefault(_cDatabase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var port = _config2.default.get('server.port');

// DB Connection
(0, _cDatabase2.default)();

_cServer2.default.listen(port, function (err) {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log('Server running at port: ' + port);
});