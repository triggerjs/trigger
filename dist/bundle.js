/*!
 * Trigger.js v1.0.6
 * Copyright (c) 2021 Steven Lei
 * Released under the MIT License.
<<<<<<< HEAD
*/(()=>{var t={234:(t,e,r)=>{"use strict";r.r(e),r.d(e,{get:()=>n});function n(t){return t&&["cover","inset"].includes(t)||(t="cover"),t}},921:(t,e,r)=>{"use strict";function n(t){var e={mode:"retain",values:[]};return"string"==typeof t&&""!==t.trim()&&("!"===t.substring(t.length-1)&&(e.mode="exact",t=t.substring(0,t.length-1)),t=t.replace(/!/g,""),e.values=t.split(",").map((function(t){return Number(t.trim())}))),e}r.r(e),r.d(e,{get:()=>n})},551:(t,e,r)=>{"use strict";r.r(e),r.d(e,{get:()=>o});var n=r(381);function o(t){if(!t)return null;var e=document.querySelector("[".concat((0,n.G)(),'ref="').concat(t,'"]'));return!e||e.hasAttribute("".concat((0,n.G)(),"follow"))?null:e}},705:(t,e,r)=>{"use strict";r.r(e),r.d(e,{get:()=>n});function n(t){return t?Number(t):0}},661:(t,e,r)=>{"use strict";function n(t){var e={};return"string"==typeof t&&""!==t.trim()&&t.split(";").forEach((function(t){var r=t.split(":");2===r.length&&(r[0].indexOf(",")>-1?r[0].split(",").forEach((function(t){e[t.trim()]=r[1].trim()})):e[r[0].trim()]=r[1].trim())})),e}r.r(e),r.d(e,{get:()=>n})},424:(t,e,r)=>{"use strict";r.r(e),r.d(e,{get:()=>o});var n=r(381);function o(t){return t||console.warn("".concat((0,n.G)(),"name is not set")),"--"===t.substring(0,2)?t:"--".concat(t)}},146:(t,e,r)=>{"use strict";function n(t){return t||null}r.r(e),r.d(e,{get:()=>n})},414:(t,e,r)=>{"use strict";r.r(e),r.d(e,{get:()=>n});function n(t){return t?Number(t):0}},158:(t,e,r)=>{"use strict";r.r(e),r.d(e,{get:()=>n});function n(t){var e=t?Number(t):100;return 0===e&&(e=100),e}},604:(t,e,r)=>{"use strict";r.r(e),r.d(e,{get:()=>n});function n(t){return t?Number(t):1}},381:(t,e,r)=>{"use strict";r.d(e,{P:()=>o,G:()=>i});var n="tg";function o(){if(void 0!==document.body&&document.body.hasAttribute("data-trigger-prefix")){var t=document.body.getAttribute("data-trigger-prefix");t&&function(t){if("string"!=typeof t||""===t.trim())return;t=t.trim(),n=t}(t)}}function i(){return"".concat(n,"-")}},523:(t,e,r)=>{var n={"./tg-edge.ts":234,"./tg-filter.ts":921,"./tg-follow.ts":551,"./tg-from.ts":705,"./tg-map.ts":661,"./tg-name.ts":424,"./tg-ref.ts":146,"./tg-step.ts":414,"./tg-steps.ts":158,"./tg-to.ts":604};function o(t){var e=i(t);return r(e)}function i(t){if(!r.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}o.keys=function(){return Object.keys(n)},o.resolve=i,t.exports=o,o.id=523}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};(()=>{"use strict";r.r(n);var t=r(381),e={root:null,rootMargin:"0px",threshold:0};function o(e,r){r&&"function"==typeof r.before&&r.before(),document.querySelectorAll("[".concat((0,t.G)(),"name]")).forEach((function(t){var r=t.getBoundingClientRect(),n=r.top,o=r.height;t.style.setProperty("--tg-top","".concat(n+window.scrollY)),t.style.setProperty("--tg-height","".concat(o)),null==e||e.observe(t)})),r&&"function"==typeof r.after&&r.after()}var i=["tg-follow","tg-ref"],u={},a=r(523);function c(e,r){var n=r;if("tg-"!==n.substring(0,3)){var o=(0,t.G)();n="tg-".concat(n.replace(o,""))}if(void 0===u[n])return null;var a=function(t,e,r){if(t.hasAttribute(e)||i.includes(r))return t;var n=t;for(;(n=n.parentElement)!==document.body;)if(n.hasAttribute(e))return n;return t}(e,r,n),c=a.hasAttribute(r)?a.getAttribute(r):null;return u[n].get(c)}function s(e){var r=c(e,"".concat((0,t.G)(),"follow")),n=e;null!==r&&(n=r);var o,i=getComputedStyle(n),u=Number(i.getPropertyValue("--tg-top")),a=Number(i.getPropertyValue("--tg-height")),s=c(e,"".concat((0,t.G)(),"name")),l=c(n,"".concat((0,t.G)(),"from")),f=c(n,"".concat((0,t.G)(),"to")),d=c(n,"".concat((0,t.G)(),"steps")),g=c(n,"".concat((0,t.G)(),"step")),m=c(e,"".concat((0,t.G)(),"map")),p=c(e,"".concat((0,t.G)(),"filter")),v=c(n,"".concat((0,t.G)(),"edge")),b=Math.abs(f-l),y=0===g?b/d:g;return{el:e,top:u,height:a,name:s,from:l,to:f,steps:d,step:g,mapping:m,filter:p,edge:v,range:b,increment:y,segments:b/y,decimals:(o=y,Math.floor(o.valueOf())===o.valueOf()?0:o.toString().split(".")[1].length||0),multiplier:l>f?-1:1,lastValue:null}}function l(t){var e=document.documentElement.scrollTop,r=document.documentElement.clientHeight;t.forEach((function(t){var n=t.el,o=t.top,i=t.height,u=t.increment,a=t.segments,c=t.decimals,s=t.multiplier,l=t.name,f=t.from,d=t.to,g=t.mapping,m=t.filter,p=t.edge,v=t.lastValue;if("--_"!==l){var b,y=(e-o+r)/(r+i);"inset"===p&&(y=(e-o)/r);var h=(f+Math.floor((a+1)*y)*u*s).toFixed(c);b=1===s?Math.min(Math.max(+h,f),d):Math.min(Math.max(+h,d),f),m.values.length>0&&!m.values.includes(b)?"exact"===m.mode&&(t.lastValue=null,n.style.removeProperty(l)):(void 0!==g[b]&&(b=g[b]),v!=b&&(n.style.setProperty(l,"".concat(b)),n.dispatchEvent(new CustomEvent("tg",{target:n,detail:{value:b}})),t.lastValue=b))}}))}function f(t){return function(t){if(Array.isArray(t))return d(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return d(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return d(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}a.keys().map((function(t){var e,r=null===(e=t.match(/tg-[^.]+/))||void 0===e?void 0:e[0];r&&(u[r]=a(t))}));var g=[],m=null;function p(){var t;t=function(t){t.forEach((function(t){var e=t.target;t.isIntersecting?g.push(s(e)):g=g.filter((function(t){return t.el!==e}))}))},m="undefined"==typeof IntersectionObserver?(console.warn("IntersectionObserver is not supported in this browser"),null):new IntersectionObserver(t,e)}(0,t.P)();({start:function(){document.body?(p(),window.addEventListener("DOMContentLoaded",(function(){o(m),setTimeout((function(){l(f(document.querySelectorAll("[".concat((0,t.G)(),"name]"))).map((function(t){return s(t)})))}))})),window.addEventListener("resize",(function(){o(m,{before:function(){g.forEach((function(t){var e;null===(e=m)||void 0===e||e.unobserve(t.el)})),g=[]}})})),window.addEventListener("scroll",(function(t){l(g)}))):console.warn("Unable to initialise, document.body does not exist.")}}).start()})(),window.Trigger=n})();
=======
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prefix */ \"./src/prefix.ts\");\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(observer, hook) {\n  // Before Hook\n  hook && typeof hook.before === 'function' && hook.before(); // Fetch all DOM elements with [tg-name] attribute and set the current top & left offset\n\n  document.querySelectorAll(\"[\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_0__.getPrefix)(), \"name]\")).forEach(function (element) {\n    var _element$getBoundingC = element.getBoundingClientRect(),\n        top = _element$getBoundingC.top,\n        height = _element$getBoundingC.height;\n\n    element.style.setProperty('--tg-top', \"\".concat(top + window.scrollY));\n    element.style.setProperty('--tg-height', \"\".concat(height));\n    observer === null || observer === void 0 ? void 0 : observer.observe(element);\n  }); // After Hook\n\n  hook && typeof hook.after === 'function' && hook.after();\n}\n\n//# sourceURL=webpack://Trigger/./src/bind.ts?");

/***/ }),

/***/ "./src/directives/index.ts":
/*!*********************************!*\
  !*** ./src/directives/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"extractValues\": () => (/* binding */ extractValues)\n/* harmony export */ });\n/* harmony import */ var _prefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prefix */ \"./src/prefix.ts\");\n\nvar SHOULD_NOT_INHERIT_DIRECTIVES = [\"tg-follow\", \"tg-ref\"]; // As we cannot get the latest value of getPrefix here\n// (require('...') run at webpack build time)\n// so we have to use tg- here as key first\n// and deal with custom prefix later\n// Declare Object directives\n\nvar directives = {}; // Load all the directives\n\nvar importDir = __webpack_require__(\"./src/directives sync tg-[\\\\S]+\\\\.ts$\");\n\nimportDir.keys().map(function (key) {\n  var _key$match;\n\n  var formatKey = (_key$match = key.match(/tg-[^.]+/)) === null || _key$match === void 0 ? void 0 : _key$match[0];\n\n  if (formatKey) {\n    directives[formatKey] = importDir(key);\n  }\n}); // Extract the value of tg element\n\nfunction extractValues(element, directive) {\n  // Check if the directive prefix is customised\n  // Replace custom prefix to tg- here if necessary\n  // in order to have the correct object key\n  // for getting the correct value from directives object\n  var directiveKey = directive;\n\n  if (directiveKey.substring(0, 3) !== 'tg-') {\n    var newPrefix = (0,_prefix__WEBPACK_IMPORTED_MODULE_0__.getPrefix)();\n    directiveKey = \"tg-\".concat(directiveKey.replace(newPrefix, ''));\n  }\n\n  if (typeof directives[directiveKey] === 'undefined') {\n    return null;\n  }\n\n  var targetElement = selfOrInheritFromParent(element, directive, directiveKey); // In order to know whether the attribute present or not\n\n  var value = targetElement.hasAttribute(directive) ? targetElement.getAttribute(directive) : null;\n  return directives[directiveKey].get(value);\n} // Find the target element to get the value, is it from self, or inherit from parents?\n\nfunction selfOrInheritFromParent(el, directive, directiveKey) {\n  // If the current element has already been set the directive\n  if (el.hasAttribute(directive) || SHOULD_NOT_INHERIT_DIRECTIVES.includes(directiveKey)) {\n    return el;\n  }\n\n  var currentEl = el; // Traverse parents\n\n  while (true) {\n    currentEl = currentEl.parentElement; // Already arrives to body, stop\n\n    if (currentEl === document.body) {\n      break;\n    }\n\n    if (currentEl.hasAttribute(directive)) {\n      return currentEl;\n    }\n  }\n\n  return el; // Return original (self) element, as no results from parents\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/index.ts?");

/***/ }),

/***/ "./src/directives/tg-bezier.ts":
/*!*************************************!*\
  !*** ./src/directives/tg-bezier.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\n/* harmony import */ var _ease__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ease */ \"./src/ease.ts\");\n\nfunction get(value) {\n  if (typeof value === 'string') {\n    if (value.indexOf(',') > -1) {\n      var arr = value.split(',');\n\n      if (arr.length !== 4) {\n        throw new Error(\"Bezier function expected 4 arguments, but got\".concat(arr.length, \".\"));\n      }\n\n      return arr;\n    } else if (!_ease__WEBPACK_IMPORTED_MODULE_0__.defaultBezier.hasOwnProperty(value)) {\n      throw new Error('The default value of the bazier function does not exist！');\n    }\n\n    return value;\n  }\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-bezier.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get\": () => (/* binding */ get)\n/* harmony export */ });\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction get(value) {\n  var items = {};\n\n  if (typeof value === 'string' && value.trim() !== '') {\n    value.split(';').forEach(function (pair) {\n      var arr = pair.split(':');\n\n      if (arr.length === 2) {\n        if (arr[0].indexOf(',') > -1) {\n          // Multiple Values\n          arr[0].split(',').forEach(function (key) {\n            items[key.trim()] = arr[1].trim();\n          });\n        } else if (arr[0].indexOf('-') > -1) {\n          var _arr$0$split$map$sort = arr[0].split('-').map(function (val) {\n            return +val;\n          }).sort(function (a, b) {\n            return a - b;\n          }),\n              _arr$0$split$map$sort2 = _slicedToArray(_arr$0$split$map$sort, 2),\n              from = _arr$0$split$map$sort2[0],\n              to = _arr$0$split$map$sort2[1];\n\n          for (var i = from; i <= to; i++) {\n            items[i] = arr[1].trim();\n          }\n        } else {\n          items[arr[0].trim()] = arr[1].trim();\n        }\n      }\n    });\n  }\n\n  return items;\n}\n\n//# sourceURL=webpack://Trigger/./src/directives/tg-map.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cubicBezier\": () => (/* binding */ cubicBezier),\n/* harmony export */   \"ease\": () => (/* binding */ ease),\n/* harmony export */   \"easeIn\": () => (/* binding */ easeIn),\n/* harmony export */   \"easeOut\": () => (/* binding */ easeOut),\n/* harmony export */   \"easeInOut\": () => (/* binding */ easeInOut),\n/* harmony export */   \"defaultBezier\": () => (/* binding */ defaultBezier)\n/* harmony export */ });\nfunction cubicBezier(p1x, p1y, p2x, p2y) {\n  var ZERO_LIMIT = 1e-6; // Calculate the polynomial coefficients,\n  // implicit first and last control points are (0,0) and (1,1).\n\n  var ax = 3 * p1x - 3 * p2x + 1;\n  var bx = 3 * p2x - 6 * p1x;\n  var cx = 3 * p1x;\n  var ay = 3 * p1y - 3 * p2y + 1;\n  var by = 3 * p2y - 6 * p1y;\n  var cy = 3 * p1y;\n\n  function sampleCurveDerivativeX(t) {\n    // `ax t^3 + bx t^2 + cx t` expanded using Horner's rule\n    return (3 * ax * t + 2 * bx) * t + cx;\n  }\n\n  function sampleCurveX(t) {\n    return ((ax * t + bx) * t + cx) * t;\n  }\n\n  function sampleCurveY(t) {\n    return ((ay * t + by) * t + cy) * t;\n  } // Given an x value, find a parametric value it came from.\n\n\n  function solveCurveX(x) {\n    var t2 = x;\n    var derivative;\n    var x2; // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation\n    // first try a few iterations of Newton's method -- normally very fast.\n    // http://en.wikipedia.org/wikiNewton's_method\n\n    for (var i = 0; i < 8; i++) {\n      // f(t) - x = 0\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      derivative = sampleCurveDerivativeX(t2); // == 0, failure\n\n      /* istanbul ignore if */\n\n      if (Math.abs(derivative) < ZERO_LIMIT) {\n        break;\n      }\n\n      t2 -= x2 / derivative;\n    } // Fall back to the bisection method for reliability.\n    // bisection\n    // http://en.wikipedia.org/wiki/Bisection_method\n\n\n    var t1 = 1;\n    /* istanbul ignore next */\n\n    var t0 = 0;\n    /* istanbul ignore next */\n\n    t2 = x;\n    /* istanbul ignore next */\n\n    while (t1 > t0) {\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      if (x2 > 0) {\n        t1 = t2;\n      } else {\n        t0 = t2;\n      }\n\n      t2 = (t1 + t0) / 2;\n    } // Failure\n\n\n    return t2;\n  }\n\n  function solve(x) {\n    return sampleCurveY(solveCurveX(x));\n  }\n\n  return solve;\n}\nvar ease = cubicBezier(0.25, 0.1, 0.25, 1);\nvar easeIn = cubicBezier(0.42, 0, 1, 1);\nvar easeOut = cubicBezier(0, 0, 0.58, 1);\nvar easeInOut = cubicBezier(0.42, 0, 0.58, 1); //内置默认的贝塞尔曲线\n\nvar defaultBezier = {\n  ease: cubicBezier(0.25, 0.1, 0.25, 1),\n  easeIn: cubicBezier(0.42, 0, 1, 1),\n  easeOut: cubicBezier(0, 0, 0.58, 1),\n  easeInOut: cubicBezier(0.42, 0, 0.58, 1)\n};\n\n//# sourceURL=webpack://Trigger/./src/ease.ts?");

/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"decimalsLength\": () => (/* binding */ decimalsLength)\n/* harmony export */ });\n/**\r\n * Calculate the length of decimal places for a number\r\n * @param {number} number The number.\r\n * @returns {number} The caculated length.\r\n */\nfunction decimalsLength(number) {\n  if (Math.floor(number.valueOf()) === number.valueOf()) return 0;\n  return number.toString().split('.')[1].length || 0;\n}\n\n//# sourceURL=webpack://Trigger/./src/helpers.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"parseAttributes\": () => (/* binding */ parseAttributes),\n/* harmony export */   \"parseValues\": () => (/* binding */ parseValues)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.ts\");\n/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directives */ \"./src/directives/index.ts\");\n/* harmony import */ var _prefix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prefix */ \"./src/prefix.ts\");\n/* harmony import */ var _ease__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ease */ \"./src/ease.ts\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n // This function will be called in observe stage, caching those values into an object for ease of use in scroll event.\n\nfunction parseAttributes(element) {\n  var follow = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(element, \"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_2__.getPrefix)(), \"follow\"));\n  var actualElement = element;\n\n  if (follow !== null) {\n    actualElement = follow;\n  }\n\n  var style = getComputedStyle(actualElement);\n  var top = Number(style.getPropertyValue('--tg-top'));\n  var height = Number(style.getPropertyValue('--tg-height'));\n  var name = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(element, \"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_2__.getPrefix)(), \"name\"));\n  var from = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_2__.getPrefix)(), \"from\"));\n  var to = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_2__.getPrefix)(), \"to\"));\n  var steps = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_2__.getPrefix)(), \"steps\"));\n  var step = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_2__.getPrefix)(), \"step\"));\n  var bezier = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_2__.getPrefix)(), \"bezier\"));\n  var mapping = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(element, \"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_2__.getPrefix)(), \"map\"));\n  var filter = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(element, \"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_2__.getPrefix)(), \"filter\"));\n  var edge = (0,_directives__WEBPACK_IMPORTED_MODULE_1__.extractValues)(actualElement, \"\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_2__.getPrefix)(), \"edge\"));\n  var range = Math.abs(to - from);\n  var increment = step === 0 ? range / steps : step;\n  var segments = range / increment;\n  var decimals = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.decimalsLength)(increment);\n  var multiplier = from > to ? -1 : 1;\n  return {\n    el: element,\n    top: top,\n    height: height,\n    name: name,\n    from: from,\n    to: to,\n    steps: steps,\n    step: step,\n    mapping: mapping,\n    filter: filter,\n    edge: edge,\n    range: range,\n    increment: increment,\n    segments: segments,\n    decimals: decimals,\n    multiplier: multiplier,\n    lastValue: null,\n    bezier: bezier\n  };\n} // Calculation happens here, this function is called when scroll event happens. So keep this as light as possible.\n\nfunction parseValues(elements) {\n  var scrolled = document.documentElement.scrollTop;\n  var clientHeight = document.documentElement.clientHeight;\n  elements.forEach(function (element) {\n    var el = element.el,\n        top = element.top,\n        height = element.height,\n        increment = element.increment,\n        segments = element.segments,\n        decimals = element.decimals,\n        multiplier = element.multiplier,\n        name = element.name,\n        from = element.from,\n        to = element.to,\n        mapping = element.mapping,\n        filter = element.filter,\n        edge = element.edge,\n        lastValue = element.lastValue,\n        bezier = element.bezier; // If the name is equal to '_' (--_), skip\n\n    if (name === '--_') {\n      return;\n    } // edge = cover by default\n\n\n    var percentage = edge === 'cover' ? Math.min(Math.max((scrolled + clientHeight - top) / (clientHeight + height), 0), 1) : Math.min(Math.max((scrolled - top) / (height - clientHeight), 0), 1); // Calculation result value of bezier\n\n    percentage = bezier ? ease(bezier, percentage) : percentage;\n    var value;\n    var mappingValue = (from + Math.floor((segments + 1) * percentage) * increment * multiplier).toFixed(decimals);\n    value = +mappingValue; // 在percentage做限制，这里去掉\n    // if (multiplier === 1) {\n    //   value = Math.min(Math.max(+mappingValue, from), to);\n    // } else {\n    //   value = Math.min(Math.max(+mappingValue, to), from);\n    // }\n\n    if (filter.values.length > 0 && !filter.values.includes(value)) {\n      // If the mode is 'exact', remove the CSS property\n      // Setting the lastValue to null to ensure correct comparison below\n      if (filter.mode === 'exact') {\n        element.lastValue = null;\n        el.style.removeProperty(name);\n      }\n\n      return;\n    }\n\n    if (typeof mapping[value] !== 'undefined') {\n      value = mapping[value];\n    }\n\n    if (lastValue != value) {\n      el.style.setProperty(name, \"\".concat(value));\n      el.dispatchEvent(new CustomEvent('tg', {\n        // @ts-ignore\n        target: el,\n        detail: {\n          value: value\n        }\n      }));\n      element.lastValue = value;\n      console.log('value', element, value);\n    }\n  });\n}\n\nfunction ease(bezier, percentage) {\n  if (typeof bezier === 'string') {\n    percentage = _ease__WEBPACK_IMPORTED_MODULE_3__.defaultBezier[bezier](percentage);\n  } else {\n    var _ref = bezier,\n        _ref2 = _slicedToArray(_ref, 4),\n        p1x = _ref2[0],\n        p1y = _ref2[1],\n        p2x = _ref2[2],\n        p2y = _ref2[3];\n\n    percentage = (0,_ease__WEBPACK_IMPORTED_MODULE_3__.cubicBezier)(p1x, p1y, p2x, p2y)(percentage);\n  }\n\n  return percentage;\n}\n\n//# sourceURL=webpack://Trigger/./src/parse.ts?");

/***/ }),

/***/ "./src/prefix.ts":
/*!***********************!*\
  !*** ./src/prefix.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getPrefixSetting\": () => (/* binding */ getPrefixSetting),\n/* harmony export */   \"getPrefix\": () => (/* binding */ getPrefix)\n/* harmony export */ });\nvar prefix = \"tg\";\nfunction getPrefixSetting() {\n  if (typeof document.body === 'undefined' || !document.body.hasAttribute('data-trigger-prefix')) {\n    return;\n  }\n\n  var newPrefix = document.body.getAttribute('data-trigger-prefix');\n  newPrefix && setPrefix(newPrefix);\n}\n\nfunction setPrefix(str) {\n  if (typeof str !== 'string' || str.trim() === '') {\n    return;\n  }\n\n  str = str.trim();\n  prefix = str;\n}\n\nfunction getPrefix() {\n  return \"\".concat(prefix, \"-\");\n}\n\n//# sourceURL=webpack://Trigger/./src/prefix.ts?");

/***/ }),

/***/ "./src/trigger.ts":
/*!************************!*\
  !*** ./src/trigger.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prefix */ \"./src/prefix.ts\");\n/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse */ \"./src/parse.ts\");\n/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observer */ \"./src/observer.ts\");\n/* harmony import */ var _bind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bind */ \"./src/bind.ts\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n\nvar activeElements = []; // Store the elements observed by IntersectionObserver\n\nvar ob = null; // Store the observer instance\n\n(0,_prefix__WEBPACK_IMPORTED_MODULE_0__.getPrefixSetting)(); // Get the customised prefix setting if available\n\n/**\r\n * Observe all `HTMLElement`.\r\n *\r\n * @private\r\n */\n\nfunction observeElements() {\n  ob = (0,_observer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(function (entries) {\n    entries.forEach(function (entry) {\n      var target = entry.target;\n\n      if (entry.isIntersecting) {\n        activeElements.push((0,_parse__WEBPACK_IMPORTED_MODULE_1__.parseAttributes)(target));\n      } else {\n        // Remove element from array if not intersecting\n        activeElements = activeElements.filter(function (obj) {\n          return obj.el !== target;\n        });\n      }\n    });\n  });\n}\n/**\r\n * Add event listener for `DOMContentLoaded`, `resize`, `scroll` events of window.\r\n *\r\n * @private\r\n */\n\n\nfunction eventListeners() {\n  // Bind tg elements\n  window.addEventListener('DOMContentLoaded', function () {\n    // Find all [tg-name] elements\n    (0,_bind__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(ob);\n    setTimeout(function () {\n      // Run once on start, so that correct style will be set before scroll happens\n      var allElements = _toConsumableArray(document.querySelectorAll(\"[\".concat((0,_prefix__WEBPACK_IMPORTED_MODULE_0__.getPrefix)(), \"name]\"))).map(function (element) {\n        return (0,_parse__WEBPACK_IMPORTED_MODULE_1__.parseAttributes)(element);\n      });\n\n      (0,_parse__WEBPACK_IMPORTED_MODULE_1__.parseValues)(allElements);\n    });\n  }); // Re-bind if resize occurs\n\n  window.addEventListener('resize', function () {\n    (0,_bind__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(ob, {\n      before: function before() {\n        // Clean Up if necessary\n        activeElements.forEach(function (element) {\n          var _ob;\n\n          (_ob = ob) === null || _ob === void 0 ? void 0 : _ob.unobserve(element.el);\n        }); // Clean up activeElements\n\n        activeElements = [];\n      }\n    });\n  }); // Update the value of CSS variable for [tg-name] elements when scroll event happens\n\n  window.addEventListener('scroll', function (e) {\n    (0,_parse__WEBPACK_IMPORTED_MODULE_1__.parseValues)(activeElements);\n  });\n}\n\nvar Trigger = {\n  start: function start() {\n    if (!document.body) {\n      console.warn(\"Unable to initialise, document.body does not exist.\");\n      return;\n    }\n\n    observeElements();\n    eventListeners();\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trigger);\n\n//# sourceURL=webpack://Trigger/./src/trigger.ts?");

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
>>>>>>> 2bfeb3c (add bezier fun)
