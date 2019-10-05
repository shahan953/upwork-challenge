'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routers = undefined;

var _controller = require('./controller');

var routers = exports.routers = {
  baseUrl: '/api/admin',
  routes: [{
    method: 'GET',
    route: '/cities',
    handlers: [_controller.GetCities]
  }, {
    method: 'GET',
    route: '/city-info',
    handlers: [_controller.GetCityInfo]
  }, {
    method: 'GET',
    route: '/weather-info',
    handlers: [_controller.GetWeatherInfo]
  }, {
    method: 'GET',
    route: '/init-data',
    handlers: [_controller.InitData]
  }]
};