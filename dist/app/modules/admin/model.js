'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminCrud = exports.adminModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _bcryptjs = require('bcryptjs');

var _utility = require('../../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adminSchema = new _mongoose2.default.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    enum: ['supper', 'admin', 'user'],
    default: 'user'
  },
  profileimage: {
    type: String
  }
});

adminSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});
adminSchema.methods = {
  _hashPassword: function _hashPassword(password) {
    var salt = (0, _bcryptjs.genSaltSync)();
    return (0, _bcryptjs.hashSync)(password, salt);
  },
  isMatchedPassword: function isMatchedPassword(password) {
    return (0, _bcryptjs.compareSync)(password, this.password);
  },
  toJSON: function toJSON() {
    var user = this.toObject();
    delete user.password;
    return {
      user: user
    };
  },
  toAuthJSON: function toAuthJSON() {
    var user = this.toObject();
    var token = (0, _utility.generateJwt)({ uid: user._id });
    delete user.password;
    return {
      token: 'JWT ' + token,
      user: user
    };
  }
};

adminSchema.plugin(_mongooseUniqueValidator2.default);
adminSchema.plugin(_mongooseTimestamp2.default);

var adminModel = _mongoose2.default.model('Admin', adminSchema);
var adminCrud = new _utility.CRUD(adminModel);

exports.adminModel = adminModel;
exports.adminCrud = adminCrud;