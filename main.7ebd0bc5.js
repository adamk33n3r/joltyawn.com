// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/jolty.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function createImage() {
  var img = new Image();
  img.src = 'https://static-cdn.jtvnw.net/emoticons/v1/300356/3.0';
  return img;
}

var baseImg = createImage();

var Jolty =
/** @class */
function () {
  function Jolty(width, height) {
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.flipped = false;
    this.init();
  }

  Jolty.prototype.update = function (width, height) {
    this.width = width;
    this.height = height;
    this.y += this.speed;

    if (this.y > this.height) {
      this.init();
    }
  };

  Jolty.prototype.draw = function (ctx) {
    if (this.flipped) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(baseImg, -this.x, this.y, -baseImg.width, baseImg.height);
      ctx.restore();
    } else {
      ctx.drawImage(baseImg, this.x, this.y);
    }
  };

  Jolty.prototype.init = function () {
    this.x = Math.random() * (this.width + baseImg.width) - baseImg.width;
    this.y = -baseImg.height;
    this.speed = Math.random() * 5 + 5;
    this.flipped = Math.random() >= 0.5;
  };

  return Jolty;
}();

exports.Jolty = Jolty;
},{}],"js/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var jolty_1 = require("./jolty");

var canvas, ctx;
var joltyCount = 150;
var joltyArray = [];

function spawnImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (joltyArray.length < joltyCount) {
    joltyArray.push(new jolty_1.Jolty(canvas.width, canvas.height));
  }

  joltyArray.forEach(function (jolty) {
    jolty.update(canvas.width, canvas.height);
    jolty.draw(ctx);
  });
  requestAnimationFrame(spawnImage);
}

$(function () {
  console.log('Welcome, Joltyawn fans!');
  canvas = document.getElementById('canvas');
  resizeCanvas();
  ctx = canvas.getContext('2d');
  requestAnimationFrame(spawnImage);
});

function resizeCanvas() {
  // canvas.width = canvas.height * 
  //     (canvas.clientWidth / canvas.clientHeight);
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

$(window).on('resize', resizeCanvas);
},{"./jolty":"js/jolty.ts"}]},{},["js/main.ts"], null)
//# sourceMappingURL=/main.7ebd0bc5.map