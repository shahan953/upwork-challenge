'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cityCrud = exports.cityModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _utility = require('../../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var citySchema = new _mongoose2.default.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  state_id: {
    type: Number
  },
  country_id: {
    type: Number
  }
});

citySchema.plugin(_mongooseUniqueValidator2.default);
citySchema.plugin(_mongooseTimestamp2.default);

var cityModel = _mongoose2.default.model('city', citySchema);
var cityCrud = new _utility.CRUD(cityModel);

exports.cityModel = cityModel;
exports.cityCrud = cityCrud;