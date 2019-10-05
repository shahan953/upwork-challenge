'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _utility = require('../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import config from 'config';


var payload = void 0;
var token = void 0;

var isAuthenticated = exports.isAuthenticated = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers.auth;

            if (!token) {
              _context.next = 17;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return (0, _utility.jwtVerify)(token);

          case 5:
            payload = _context.sent;

            if (payload) {
              _context.next = 8;
              break;
            }

            throw { message: 'Token has expired' };

          case 8:
            // eslint-disable-next-line require-atomic-updates
            req.user = payload;
            next();
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](2);

            next(_context.t0);

          case 15:
            _context.next = 18;
            break;

          case 17:
            res.status(500).json({
              message: 'Please provide Access Token in key: auth'
            });

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 12]]);
  }));

  return function isAuthenticated(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();