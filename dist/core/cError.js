'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (app) {
  app.use(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return next();

            case 3:
              _context.next = 9;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context['catch'](0);

              _context.t0.status = 404;
              next(_context.t0);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 5]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());

  var statusMsg = {
    400: 'Entity not found and will not proceed',
    401: 'Not authorized',
    403: 'Forbidden',
    404: 'Resource not found',
    405: 'Method not allowed',
    409: 'Record conflict',
    422: 'Unprocessable entity',
    429: 'Too many requests.',
    500: 'Network Error',
    501: 'Unknown error'
  };

  //Error handler funciton
  // eslint-disable-next-line no-unused-vars
  app.use(function (err, req, res, next) {
    var error = process.env.NODE_ENV === 'development' ? err : {};
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }
    var status = err.status || 501;
    //Respond to  client 
    res.status(status).json(_extends({
      errMessage: statusMsg[status]
    }, error));
  });
};