/*!
 * Trigger.js v1.0.8
 * Copyright (c) 2021 Steven Lei
 * Released under the MIT License.
*/
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bind.ts":
/*!*********************!*\
  !*** ./src/bind.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prefix */ \"./src/prefix.ts\");\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(observer, hook) {\n  // Before Hook\n  hook && typeof hook.before === 'function' && hook.before(); // Fetch all DOM elements with [tg-name] attribute and set the current top & left offset\n\n  var prefix = (0,_prefix__WEBPACK_IMPORTED_MODULE_0__.getPrefix)();\n  document.querySelectorAll(\"[\".concat(prefix, \"name]\")).forEach(function (element) {\n    var _element$getBoundingC = element.getBoundingClientRect(),\n        top = _element$getBoundingC.top,\n        height = _element$getBoundingC.height;\n\n    element.style.setProperty(\"--\".concat(prefix, \"top\"), \"\".concat(top + window.scrollY));\n    element.style.setProperty(\"--\".concat(prefix, \"height\"), \"\".concat(height));\n    observer && observer.observe(element);\n  }); // After Hook\n\n  hook && typeof hook.after === 'function' && hook.after();\n}\n\n//# sourceURL=webpack://Trigger/./src/bind.ts?");

/***/ }),

/***/ "./src/directives/index.ts":
/*!*********************************!*\
  !*** ./src/directives/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"extractValues\": () => (/* binding */ extractValues)\n/* harmony export */ });\n/* harmony import */ var _prefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefix */ \"./src/prefix.ts\");\n\nvar SHOULD_NOT_INHERIT_DIRECTIVES = [\"tg-follow\", \"tg-ref\"]; // As we cannot get the latest value of getPrefix here\n// (require('...') run at webpack build time)\n// so we have to use tg- here as key first\n// and deal with custom prefix later\n// Declare Object directives\n\nvar directives = {}; // Load all the directives\n\nvar importDir = __webpack_require__(\"./src/directives sync tg-[\\\\S]+\\\\.ts$\");\n\nimportDir.keys().map(function (key) {\n  var _key$match;\n\n  var formatKey = (_key$match = key.match(/tg-[^.]+/)) === null || _key$match === void 0 ? void 0 : _key$match[0];\n\n  if (formatKey) {\n    directives[formatKey] = importDir(key);\n  }\n}); // Extract the value of tg element\n\nfunction extractValues(element, directive, data) {\n  // Check if the directive prefix is customised\n  // Replace custom prefix to tg- here if necessary\n  // in order to have the correct object key\n  // for getting the correct value from directives object\n  var directiveKey = directive;\n\n  if (directiveKey.substring(0, 3) !== 'tg-') {\n    var newPrefix = (0,_prefix__WEBPACK_IMPORTED_MODULE_0__.getPrefix)();\n    directiveKey = \"tg-\".concat(directiveKey.replace(newPrefix, ''));\n  }\n\n  if (typeof directives[directiveKey] === 'undefined') {\n    return null;\n  }\n\n  var targetElement = selfOrInheritFromParent(element, directive, directiveKey); // In order to know whether the attribute present or not\n\n  var value = targetElement.hasAttribute(directive) ? targetElement.getAttribute(directive) : null;\n  return directives[directiveKey].get(value, data);\n} // Find the target element to get the value, is it from self, or inherit from parents?\n\nfunction selfOrInheritFromParent(el, directive, directiveKey) {\n  // If the current element has already been set the directive\n  if (el.hasAttribute(directive) || SHOULD_NOT_INHERIT_DIRECTIVES.includes(directiveKey)) {\n    return el;\n  }\n\n  var currentEl = el; // Traverse parents\n\n  while (true) {\n    currentEl = currentEl.parentElement; // Already arrives to body, stop\n\n    if (currentEl === document.body) {\n      break;\n    }\n\n    if (currentEl.hasAttribute(directive)) {\n      return currentEl;\n    }\n  }\n\n  return el; // Return original (self) element, as no results from parents\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/index.ts?");

/***/ }),

/***/ "./src/directives/tg-bezier.ts":
/*!*************************************!*\
  !*** ./src/directives/tg-bezier.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\n/* harmony import */ var _ease__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ease */ \"./src/ease.ts\");\n\nfunction get(value) {\n  if (typeof value === 'string') {\n    if (value.indexOf(',') > -1) {\n      var arr = value.split(',');\n\n      if (arr.length !== 4) {\n        throw new Error(\"Bezier function expected 4 arguments, but got \".concat(arr.length, \".\"));\n      }\n\n      return arr;\n    } else if (!_ease__WEBPACK_IMPORTED_MODULE_0__.defaultBezier.hasOwnProperty(value)) {\n      // Available named bezier values: `ease`, `easeIn`, `easeOut`, `easeInOut`\n      throw new Error('The default value of the bezier function does not exist！');\n    }\n\n    return value;\n  }\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-bezier.ts?");

/***/ }),

/***/ "./src/directives/tg-edge.ts":
/*!***********************************!*\
  !*** ./src/directives/tg-edge.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\n// Default Value\nvar DEFAULT = 'cover';\nfunction get(value) {\n  // only supports cover / inset for now\n  if (!value || !['cover', 'inset'].includes(value)) {\n    value = DEFAULT;\n  }\n\n  return value;\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-edge.ts?");

/***/ }),

/***/ "./src/directives/tg-filter.ts":
/*!*************************************!*\
  !*** ./src/directives/tg-filter.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\nfunction get(value) {\n  var filter = {\n    mode: 'retain',\n    // mode = retain / exact\n    values: []\n  };\n\n  if (typeof value === 'string' && value.trim() !== '') {\n    // switch mode to 'exact', means that if the value is other\n    // than this, should remove the css attribute (in order to keep the\n    // default value of the css variable)\n    if (value.substring(value.length - 1) === '!') {\n      filter.mode = 'exact';\n      value = value.substring(0, value.length - 1);\n    } // Clean up all exclamation marks if added accidentally\n\n\n    value = value.replace(/!/g, '');\n    filter.values = value.split(',').map(function (item) {\n      return Number(item.trim());\n    });\n  }\n\n  return filter;\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-filter.ts?");

/***/ }),

/***/ "./src/directives/tg-follow.ts":
/*!*************************************!*\
  !*** ./src/directives/tg-follow.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\n/* harmony import */ var _prefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefix */ \"./src/prefix.ts\");\n\nfunction get(value) {\n  if (!value) {\n    return null;\n  } // Suppose tg-ref is unique like id attribute\n\n\n  var follow = document.querySelector(\"[\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_0__.getPrefix)(), \"ref=\\\"\").concat(value, \"\\\"]\")); // Do not support follow chain right now\n\n  if (!follow || follow.hasAttribute(\"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_0__.getPrefix)(), \"follow\"))) {\n    return null;\n  }\n\n  return follow;\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-follow.ts?");

/***/ }),

/***/ "./src/directives/tg-from.ts":
/*!***********************************!*\
  !*** ./src/directives/tg-from.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\n// Default value\nvar DEFAULT = 0;\nfunction get(value) {\n  return value ? Number(value) : DEFAULT;\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-from.ts?");

/***/ }),

/***/ "./src/directives/tg-map.ts":
/*!**********************************!*\
  !*** ./src/directives/tg-map.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction get(value, data) {\n  var items = {};\n\n  if (typeof value === 'string' && value.trim() !== '') {\n    value.split(';').forEach(function (pair) {\n      var arr = pair.split(':');\n\n      if (arr.length === 2) {\n        if (arr[0].indexOf(',') > -1) {\n          // Multiple Values\n          arr[0].split(',').forEach(function (key) {\n            items[key.trim()] = arr[1].trim();\n          });\n        } else if (arr[0].indexOf('...') > -1) {\n          // Use `...` here to define a range, inspired by Swift range operator.\n          // Instead of using `-`, we can handle negative numbers easily.\n          var _arr$0$split$map$sort = arr[0].split('...').map(function (val) {\n            return +val;\n          }).sort(function (a, b) {\n            return a - b;\n          }),\n              _arr$0$split$map$sort2 = _slicedToArray(_arr$0$split$map$sort, 2),\n              from = _arr$0$split$map$sort2[0],\n              to = _arr$0$split$map$sort2[1];\n\n          var i = from;\n\n          while (i <= to) {\n            i = Number(i.toFixed((data === null || data === void 0 ? void 0 : data.decimals) || 2));\n            items[i] = arr[1].trim();\n            i += (data === null || data === void 0 ? void 0 : data.increment) || 0.01;\n          }\n        } else {\n          items[arr[0].trim()] = arr[1].trim();\n        }\n      }\n    });\n  }\n\n  return items;\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-map.ts?");

/***/ }),

/***/ "./src/directives/tg-name.ts":
/*!***********************************!*\
  !*** ./src/directives/tg-name.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\n/* harmony import */ var _prefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefix */ \"./src/prefix.ts\");\n\nfunction get(value) {\n  if (!value) {\n    console.warn(\"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_0__.getPrefix)(), \"name is not set\"));\n  }\n\n  if (value.substring(0, 2) === \"--\") {\n    return value;\n  } // Auto prepend -- for a CSS variable name\n\n\n  return \"--\".concat(value);\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-name.ts?");

/***/ }),

/***/ "./src/directives/tg-ref.ts":
/*!**********************************!*\
  !*** ./src/directives/tg-ref.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\nfunction get(value) {\n  if (!value) {\n    return null;\n  }\n\n  return value;\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-ref.ts?");

/***/ }),

/***/ "./src/directives/tg-step.ts":
/*!***********************************!*\
  !*** ./src/directives/tg-step.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\n// Default value\nvar DEFAULT = 0;\nfunction get(value) {\n  return value ? Number(value) : DEFAULT;\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-step.ts?");

/***/ }),

/***/ "./src/directives/tg-steps.ts":
/*!************************************!*\
  !*** ./src/directives/tg-steps.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\n// Default value\nvar DEFAULT = 100;\nfunction get(value) {\n  var result = value ? Number(value) : DEFAULT; // Should never be 0\n\n  if (result === 0) {\n    result = DEFAULT;\n  }\n\n  return result;\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-steps.ts?");

/***/ }),

/***/ "./src/directives/tg-to.ts":
/*!*********************************!*\
  !*** ./src/directives/tg-to.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\n// Default value\nvar DEFAULT = 1;\nfunction get(value) {\n  return value ? Number(value) : DEFAULT;\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-to.ts?");

/***/ }),

/***/ "./src/ease.ts":
/*!*********************!*\
  !*** ./src/ease.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cubicBezier\": () => (/* binding */ cubicBezier),\n/* harmony export */   \"ease\": () => (/* binding */ ease),\n/* harmony export */   \"easeIn\": () => (/* binding */ easeIn),\n/* harmony export */   \"easeOut\": () => (/* binding */ easeOut),\n/* harmony export */   \"easeInOut\": () => (/* binding */ easeInOut),\n/* harmony export */   \"defaultBezier\": () => (/* binding */ defaultBezier),\n/* harmony export */   \"easePercentage\": () => (/* binding */ easePercentage)\n/* harmony export */ });\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction cubicBezier(p1x, p1y, p2x, p2y) {\n  var ZERO_LIMIT = 1e-6; // Calculate the polynomial coefficients,\n  // implicit first and last control points are (0,0) and (1,1).\n\n  var ax = 3 * p1x - 3 * p2x + 1;\n  var bx = 3 * p2x - 6 * p1x;\n  var cx = 3 * p1x;\n  var ay = 3 * p1y - 3 * p2y + 1;\n  var by = 3 * p2y - 6 * p1y;\n  var cy = 3 * p1y;\n\n  function sampleCurveDerivativeX(t) {\n    // `ax t^3 + bx t^2 + cx t` expanded using Horner's rule\n    return (3 * ax * t + 2 * bx) * t + cx;\n  }\n\n  function sampleCurveX(t) {\n    return ((ax * t + bx) * t + cx) * t;\n  }\n\n  function sampleCurveY(t) {\n    return ((ay * t + by) * t + cy) * t;\n  } // Given an x value, find a parametric value it came from.\n\n\n  function solveCurveX(x) {\n    var t2 = x;\n    var derivative;\n    var x2; // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation\n    // first try a few iterations of Newton's method -- normally very fast.\n    // http://en.wikipedia.org/wikiNewton's_method\n\n    for (var i = 0; i < 8; i++) {\n      // f(t) - x = 0\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      derivative = sampleCurveDerivativeX(t2); // == 0, failure\n\n      /* istanbul ignore if */\n\n      if (Math.abs(derivative) < ZERO_LIMIT) {\n        break;\n      }\n\n      t2 -= x2 / derivative;\n    } // Fall back to the bisection method for reliability.\n    // bisection\n    // http://en.wikipedia.org/wiki/Bisection_method\n\n\n    var t1 = 1;\n    /* istanbul ignore next */\n\n    var t0 = 0;\n    /* istanbul ignore next */\n\n    t2 = x;\n    /* istanbul ignore next */\n\n    while (t1 > t0) {\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      if (x2 > 0) {\n        t1 = t2;\n      } else {\n        t0 = t2;\n      }\n\n      t2 = (t1 + t0) / 2;\n    } // Failure\n\n\n    return t2;\n  }\n\n  function solve(x) {\n    return sampleCurveY(solveCurveX(x));\n  }\n\n  return solve;\n}\nvar ease = cubicBezier(0.25, 0.1, 0.25, 1);\nvar easeIn = cubicBezier(0.42, 0, 1, 1);\nvar easeOut = cubicBezier(0, 0, 0.58, 1);\nvar easeInOut = cubicBezier(0.42, 0, 0.58, 1); // Default named bezier values\n\nvar defaultBezier = {\n  ease: cubicBezier(0.25, 0.1, 0.25, 1),\n  easeIn: cubicBezier(0.42, 0, 1, 1),\n  easeOut: cubicBezier(0, 0, 0.58, 1),\n  easeInOut: cubicBezier(0.42, 0, 0.58, 1)\n};\nfunction easePercentage(bezier, percentage) {\n  if (typeof bezier === 'string') {\n    percentage = defaultBezier[bezier](percentage);\n  } else {\n    var _bezier = _slicedToArray(bezier, 4),\n        p1x = _bezier[0],\n        p1y = _bezier[1],\n        p2x = _bezier[2],\n        p2y = _bezier[3];\n\n    percentage = cubicBezier(p1x, p1y, p2x, p2y)(percentage);\n  }\n\n  return percentage;\n}\n;\n\n//# sourceURL=webpack://Trigger/./src/ease.ts?");

/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"decimalsLength\": () => (/* binding */ decimalsLength),\n/* harmony export */   \"getValueInRange\": () => (/* binding */ getValueInRange)\n/* harmony export */ });\n/**\n * Calculate the length of decimal places for a number\n * @param {number} number The number.\n * @returns {number} The caculated length.\n */\nfunction decimalsLength(number) {\n  if (Math.floor(number) === number) return 0;\n  return number.toString().split('.')[1].length || 0;\n}\n/**\n * Get the value. If it is greater than max, get max, otherwise get min.\n * @param {number} value \n * @param {number} min min value in the range\n * @param {number} max max value in the range\n * @returns number\n */\n\nfunction getValueInRange(value, min, max) {\n  return Math.min(Math.max(value, 0), 1);\n}\n\n//# sourceURL=webpack://Trigger/./src/helpers.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _trigger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trigger */ \"./src/trigger.ts\");\n // Simple, Start.\n\n_trigger__WEBPACK_IMPORTED_MODULE_0__[\"default\"].start();\n\n//# sourceURL=webpack://Trigger/./src/index.ts?");

/***/ }),

/***/ "./src/observer.ts":
/*!*************************!*\
  !*** ./src/observer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar options = {\n  root: null,\n  // document.body\n  rootMargin: '0px',\n  threshold: 0\n};\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cb) {\n  // Check if `IntersectionObserver` is available\n  if (typeof IntersectionObserver === 'undefined') {\n    console.warn(\"IntersectionObserver is not supported in this browser\");\n    return null;\n  }\n\n  return new IntersectionObserver(cb, options);\n}\n\n//# sourceURL=webpack://Trigger/./src/observer.ts?");

/***/ }),

/***/ "./src/parse.ts":
/*!**********************!*\
  !*** ./src/parse.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"parseAttributes\": () => (/* binding */ parseAttributes),\n/* harmony export */   \"parseValues\": () => (/* binding */ parseValues)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.ts\");\n/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directives */ \"./src/directives/index.ts\");\n/* harmony import */ var _prefix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prefix */ \"./src/prefix.ts\");\n/* harmony import */ var _ease__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ease */ \"./src/ease.ts\");\n\n\n\n\n/**\n * This function will be called in observe stage,\n * caching those values into an object for ease of use in scroll event.\n */\n\nfunction parseAttributes(element) {\n  var prefix = (0,_prefix__WEBPACK_IMPORTED_MODULE_2__.getPrefix)();\n  var follow = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(element, \"\".concat(prefix, \"follow\"));\n  var actualElement = follow || element;\n  var style = getComputedStyle(actualElement);\n  var top = +style.getPropertyValue(\"--\".concat(prefix, \"top\"));\n  var height = +style.getPropertyValue(\"--\".concat(prefix, \"height\"));\n  var name = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(element, \"\".concat(prefix, \"name\"));\n  var from = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat(prefix, \"from\"));\n  var to = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat(prefix, \"to\"));\n  var steps = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat(prefix, \"steps\"));\n  var step = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat(prefix, \"step\"));\n  var bezier = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat(prefix, \"bezier\"));\n  var filter = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(element, \"\".concat(prefix, \"filter\"));\n  var edge = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat(prefix, \"edge\"));\n  var range = Math.abs(to - from);\n  var increment = step === 0 ? range / steps : step;\n  var segments = steps ? steps : range / increment;\n  var decimals = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.decimalsLength)(increment);\n  var multiplier = from > to ? -1 : 1;\n  var mapping = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(element, \"\".concat(prefix, \"map\"), {\n    increment: increment,\n    decimals: decimals\n  });\n  return {\n    el: element,\n    top: top,\n    height: height,\n    name: name,\n    from: from,\n    to: to,\n    steps: steps,\n    step: step,\n    mapping: mapping,\n    filter: filter,\n    edge: edge,\n    range: range,\n    increment: increment,\n    segments: segments,\n    decimals: decimals,\n    multiplier: multiplier,\n    lastValue: null,\n    bezier: bezier\n  };\n}\n/**\n * Calculation happens here,\n * this function is called when scroll event happens.\n * So keep this as light as possible.\n */\n\nfunction parseValues(elements) {\n  var _document$documentEle = document.documentElement,\n      scrolled = _document$documentEle.scrollTop,\n      clientHeight = _document$documentEle.clientHeight;\n  elements.forEach(function (element) {\n    var el = element.el,\n        top = element.top,\n        height = element.height,\n        increment = element.increment,\n        segments = element.segments,\n        decimals = element.decimals,\n        multiplier = element.multiplier,\n        name = element.name,\n        from = element.from,\n        mapping = element.mapping,\n        filter = element.filter,\n        edge = element.edge,\n        lastValue = element.lastValue,\n        bezier = element.bezier; // If the name is equal to '_' (--_), skip\n\n    if (name === '--_') {\n      return;\n    } // edge is 'cover' by default\n\n\n    var percentage = edge === 'cover' ? (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getValueInRange)((scrolled + clientHeight - top) / (clientHeight + height), 0, 1) : (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getValueInRange)((scrolled - top) / (height - clientHeight), 0, 1); // Calculation result value of bezier\n\n    percentage = bezier ? (0,_ease__WEBPACK_IMPORTED_MODULE_3__.easePercentage)(bezier, percentage) : percentage;\n    var value;\n    var mappingValue = (from + Math.floor((segments + 1) * percentage) * increment * multiplier).toFixed(decimals);\n    value = +mappingValue;\n\n    if (filter.values.length > 0 && !filter.values.includes(value)) {\n      // If the mode is 'exact', remove the CSS property\n      // Setting the lastValue to null to ensure correct comparison below\n      if (filter.mode === 'exact') {\n        element.lastValue = null;\n        el.style.removeProperty(name);\n      }\n\n      return;\n    }\n\n    if (typeof mapping[value] !== 'undefined') {\n      value = mapping[value];\n    }\n\n    if (lastValue != value) {\n      el.style.setProperty(name, \"\".concat(value));\n      el.dispatchEvent(new CustomEvent('tg', {\n        // @ts-ignore\n        target: el,\n        detail: {\n          value: value\n        }\n      }));\n      element.lastValue = value;\n      console.log('value', element, value);\n    }\n  });\n}\n\n//# sourceURL=webpack://Trigger/./src/parse.ts?");

/***/ }),

/***/ "./src/prefix.ts":
/*!***********************!*\
  !*** ./src/prefix.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getPrefixSetting\": () => (/* binding */ getPrefixSetting),\n/* harmony export */   \"getPrefix\": () => (/* binding */ getPrefix)\n/* harmony export */ });\nvar prefix = \"tg\";\nfunction getPrefixSetting() {\n  var newPrefix = document.body && document.body.getAttribute('data-trigger-prefix');\n  newPrefix && setPrefix(newPrefix);\n}\n\nfunction setPrefix(str) {\n  if (typeof str !== 'string' || !(str = str.trim())) {\n    return;\n  }\n\n  prefix = str;\n}\n\nfunction getPrefix() {\n  return \"\".concat(prefix, \"-\");\n}\n\n//# sourceURL=webpack://Trigger/./src/prefix.ts?");

/***/ }),

/***/ "./src/trigger.ts":
/*!************************!*\
  !*** ./src/trigger.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prefix */ \"./src/prefix.ts\");\n/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse */ \"./src/parse.ts\");\n/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observer */ \"./src/observer.ts\");\n/* harmony import */ var _bind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bind */ \"./src/bind.ts\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n\nvar activeElements = []; // Store the elements observed by IntersectionObserver\n\nvar ob = null; // Store the observer instance\n\n(0,_prefix__WEBPACK_IMPORTED_MODULE_0__.getPrefixSetting)(); // Get the customised prefix setting if available\n\n/**\n * Observe all `HTMLElement`.\n *\n * @private\n */\n\nfunction observeElements() {\n  ob = (0,_observer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(function (entries) {\n    entries.forEach(function (entry) {\n      var target = entry.target;\n\n      if (entry.isIntersecting) {\n        activeElements.push((0,_parse__WEBPACK_IMPORTED_MODULE_1__.parseAttributes)(target));\n      } else {\n        // Remove element from array if not intersecting\n        activeElements = activeElements.filter(function (obj) {\n          return obj.el !== target;\n        });\n      }\n    });\n  });\n}\n/**\n * Add event listener for `DOMContentLoaded`, `resize`, `scroll` events of window.\n *\n * @private\n */\n\n\nfunction eventListeners() {\n  // Bind tg elements\n  window.addEventListener('DOMContentLoaded', function () {\n    // Find all [tg-name] elements\n    (0,_bind__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(ob);\n    setTimeout(function () {\n      // Run once on start, so that correct style will be set before scroll happens\n      var allElements = _toConsumableArray(document.querySelectorAll(\"[\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_0__.getPrefix)(), \"name]\"))).map(function (element) {\n        return (0,_parse__WEBPACK_IMPORTED_MODULE_1__.parseAttributes)(element);\n      });\n\n      (0,_parse__WEBPACK_IMPORTED_MODULE_1__.parseValues)(allElements);\n    });\n  }); // Re-bind if resize occurs\n\n  window.addEventListener('resize', function () {\n    (0,_bind__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(ob, {\n      before: function before() {\n        // Clean Up if necessary\n        activeElements.forEach(function (element) {\n          var _ob;\n\n          (_ob = ob) === null || _ob === void 0 ? void 0 : _ob.unobserve(element.el);\n        }); // Clean up activeElements\n\n        activeElements = [];\n      }\n    });\n  }); // Update the value of CSS variable for [tg-name] elements when scroll event happens\n\n  window.addEventListener('scroll', function (e) {\n    (0,_parse__WEBPACK_IMPORTED_MODULE_1__.parseValues)(activeElements);\n  });\n}\n\nvar Trigger = {\n  start: function start() {\n    if (!document.body) {\n      console.warn(\"Unable to initialise, document.body does not exist.\");\n      return;\n    }\n\n    observeElements();\n    eventListeners();\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trigger);\n\n//# sourceURL=webpack://Trigger/./src/trigger.ts?");

/***/ }),

/***/ "./src/directives sync tg-[\\S]+\\.ts$":
/*!*********************************************************!*\
  !*** ./src/directives/ sync nonrecursive tg-[\S]+\.ts$ ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./tg-bezier.ts\": \"./src/directives/tg-bezier.ts\",\n\t\"./tg-edge.ts\": \"./src/directives/tg-edge.ts\",\n\t\"./tg-filter.ts\": \"./src/directives/tg-filter.ts\",\n\t\"./tg-follow.ts\": \"./src/directives/tg-follow.ts\",\n\t\"./tg-from.ts\": \"./src/directives/tg-from.ts\",\n\t\"./tg-map.ts\": \"./src/directives/tg-map.ts\",\n\t\"./tg-name.ts\": \"./src/directives/tg-name.ts\",\n\t\"./tg-ref.ts\": \"./src/directives/tg-ref.ts\",\n\t\"./tg-step.ts\": \"./src/directives/tg-step.ts\",\n\t\"./tg-steps.ts\": \"./src/directives/tg-steps.ts\",\n\t\"./tg-to.ts\": \"./src/directives/tg-to.ts\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/directives sync tg-[\\\\S]+\\\\.ts$\";\n\n//# sourceURL=webpack://Trigger/./src/directives/_sync_nonrecursive_tg-%5B\\S%5D+\\.ts$?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	window.Trigger = __webpack_exports__;
/******/ 	
/******/ })()
;