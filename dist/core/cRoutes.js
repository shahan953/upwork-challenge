'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _modules = require('../app/modules');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var router = (0, _expressPromiseRouter2.default)();

_modules.routerHandlers.forEach(function (routerProperty) {
  routerProperty.routes.forEach(function (config) {
    var _router$route;

    var _config$method = config.method,
        method = _config$method === undefined ? '' : _config$method,
        _config$route = config.route,
        route = _config$route === undefined ? '' : _config$route,
        _config$handlers = config.handlers,
        handlers = _config$handlers === undefined ? [] : _config$handlers;


    var endpoint = routerProperty.baseUrl + route;

    router.route(endpoint).options((0, _cors2.default)());
    (_router$route = router.route(endpoint))[method.toLowerCase()].apply(_router$route, _toConsumableArray(handlers));
  });
});

exports.default = router;