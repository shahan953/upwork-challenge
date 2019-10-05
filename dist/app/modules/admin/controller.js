'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitData = exports.GetWeatherInfo = exports.GetCityInfo = exports.GetCities = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _city = require('./city.model');

var _cities = require('cities.json');

var _cities2 = _interopRequireDefault(_cities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var OpenWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

var cities = void 0;

var GetCities = exports.GetCities = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var citylistNew;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              citylistNew = _cities2.default.filter(function (city) {
                return city.name.toLowerCase().includes(req.query.city ? req.query.city.toLowerCase() : '');
              });


              res.status(200).json(citylistNew.slice(0, 20));
            } catch (error) {
              res.status(422).json(error);
            }

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function GetCities(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var GetCityInfo = exports.GetCityInfo = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var query, url, city, response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            query = req.query.city;
            url = 'https://www.metaweather.com/api/location/search/?query=' + query;
            _context2.next = 5;
            return (0, _nodeFetch2.default)(url);

          case 5:
            city = _context2.sent;
            _context2.next = 8;
            return city.json();

          case 8:
            response = _context2.sent;

            res.status(200).json(response[0]);
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](0);

            res.status(422).json(_context2.t0);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 12]]);
  }));

  return function GetCityInfo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var GetWeatherInfo = exports.GetWeatherInfo = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var query, url, city, response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            query = req.query;
            url = 'https://samples.openweathermap.org/data/2.5/weather?lat=' + query.lat + '&lon=' + query.lng + '&appid=' + OpenWeatherApiKey;
            _context3.next = 5;
            return (0, _nodeFetch2.default)(url);

          case 5:
            city = _context3.sent;
            _context3.next = 8;
            return city.json();

          case 8:
            response = _context3.sent;

            res.status(200).json(response);
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](0);

            res.status(422).json(_context3.t0);

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 12]]);
  }));

  return function GetWeatherInfo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var InitData = exports.InitData = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var url, response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            url = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json';
            _context4.next = 4;
            return (0, _nodeFetch2.default)(url);

          case 4:
            cities = _context4.sent;
            _context4.next = 7;
            return cities.json();

          case 7:
            response = _context4.sent;
            _context4.next = 10;
            return _city.cityModel.insertMany(response);

          case 10:
            res.status(200).json({
              success: true
            });
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4['catch'](0);

            res.status(422).json(_context4.t0);

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 13]]);
  }));

  return function InitData(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();