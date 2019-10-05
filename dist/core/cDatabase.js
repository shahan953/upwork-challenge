'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var dbUri, info;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _mongoose2.default.Promise = global.Promise;
          dbUri = void 0;

          if (_config2.default.get('db.options.username')) {
            dbUri = 'mongodb://' + _config2.default.get('db.options.username') + ':' + encodeURIComponent(_config2.default.get('db.options.password')) + '@' + _config2.default.get('db.host') + ':' + _config2.default.get('db.options.port') + '/' + _config2.default.get('db.dbname');
          } else {
            dbUri = 'mongodb://' + _config2.default.get('db.host') + ':' + _config2.default.get('db.options.port') + '/' + _config2.default.get('db.dbname');
          }

          try {
            _mongoose2.default.connect(dbUri, {
              useNewUrlParser: true,
              useCreateIndex: true,
              useUnifiedTopology: true
            });
          } catch (err) {
            _mongoose2.default.createConnection(dbUri);
          }

          info = _mongoose2.default.connections[0];


          _mongoose2.default.connection
          // eslint-disable-next-line no-console
          .on('error', function () {
            return console.error('Unable to connect to database');
          }).on('close', function () {
            return console.log('Database connection closed.');
          }) // eslint-disable-line no-console
          // eslint-disable-next-line no-console
          .once('open', function () {
            return console.log('Connected to ' + info.host + ':' + info.port + '/' + info.name);
          });

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));