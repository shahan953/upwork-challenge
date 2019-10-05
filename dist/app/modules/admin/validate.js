'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAdmin = exports.validateRegistration = undefined;

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateRegistration = exports.validateRegistration = function validateRegistration(req, res, next) {
  var schema = _joi2.default.object().keys({
    username: _joi2.default.string().required(),
    firstname: _joi2.default.string().required(),
    lastname: _joi2.default.string().required(),
    password: _joi2.default.string().required(),
    email: _joi2.default.string().email().required(),
    role: _joi2.default.string().valid('admin'),
    phone: _joi2.default.string()
  });
  _joi2.default.validate(req.body, schema, function (err) {
    if (err === null) {
      next();
    } else {
      res.json({
        message: 'Something error'
      });
    }
  });
};

var validateAdmin = exports.validateAdmin = function validateAdmin(req, res, next) {
  var schema = _joi2.default.object().keys({
    username: _joi2.default.string().required(),
    firstname: _joi2.default.string().required(),
    lastname: _joi2.default.string().required(),
    password: _joi2.default.string().required(),
    email: _joi2.default.string().email().required(),
    role: _joi2.default.string().valid('admin'),
    phone: _joi2.default.string()
  });
  _joi2.default.validate(req.body, schema, function (err) {
    if (err === null) {
      next();
    } else {
      next(err);
    }
  });
};