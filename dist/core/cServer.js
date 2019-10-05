'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicPath = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cMiddleware = require('./cMiddleware');

var _cMiddleware2 = _interopRequireDefault(_cMiddleware);

var _cRoutes = require('./cRoutes');

var _cRoutes2 = _interopRequireDefault(_cRoutes);

var _cError = require('./cError');

var _cError2 = _interopRequireDefault(_cError);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressHistoryApiFallback = require('express-history-api-fallback');

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Middlewares
(0, _cMiddleware2.default)(app);

// Api Router
app.use(_cRoutes2.default);

var publicPath = exports.publicPath = _path2.default.join(__dirname, '../../build');
// Public Folder
app.use(_express2.default.static(publicPath));
app.use((0, _expressHistoryApiFallback2.default)('index.html', { root: publicPath }));

// Error Handling
(0, _cError2.default)(app);

exports.default = app;