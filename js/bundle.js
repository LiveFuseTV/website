/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _lodash = __webpack_require__(1);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// import '../functions/optimizedScroll';
	var AtailScroll = function () {
	    function AtailScroll(boxWithScroll) {
	        _classCallCheck(this, AtailScroll);
	
	        if (!boxWithScroll || !boxWithScroll.nodeType) {
	            return false;
	        }
	        this.box = boxWithScroll;
	        this.parent = boxWithScroll.parentNode;
	        this.boxWithScroll = boxWithScroll;
	        this.hasScroll = false;
	        this.isProjectPreview = false;
	        this.isAjaxProject = false;
	        this.isAjaxProjectTableWrapper = false;
	        // main-scroll
	        this.isMainScroll = false;
	        // all-atail-projects
	        this.isAllProjects = false;
	        if (this.box.classList.contains('all-atail-projects')) {
	            this.isAllProjects = true;
	            var scrollTmp = this.parent.querySelector('.atail-scroll');
	            if (scrollTmp) {
	                return false;
	            }
	        } else if (this.box.classList.contains('main-scroll')) {
	            this.isMainScroll = true;
	            var _scrollTmp = this.parent.querySelector('.atail-scroll');
	            if (_scrollTmp) {
	                return false;
	            }
	        } else if (this.box.classList.contains('project-preview')) {
	            this.isProjectPreview = true;
	            var _scrollTmp2 = this.parent.querySelector('.atail-scroll');
	            if (_scrollTmp2) {
	                return false;
	            }
	        } else if (this.box.classList.contains('post-slider-item-scroll')) {
	            this.isAjaxProject = true;
	            var _scrollTmp3 = this.parent.querySelector('.atail-scroll');
	            if (_scrollTmp3) {
	                return false;
	            }
	        } else if (this.box.classList.contains('post-content-table-wrapper')) {
	            this.isAjaxProjectTableWrapper = true;
	            var _scrollTmp4 = this.parent.querySelector('.atail-scroll');
	            if (_scrollTmp4) {
	                return false;
	            }
	        } else {
	            var _scrollTmp5 = document.body.querySelector('.atail-scroll');
	            if (_scrollTmp5) {
	                return false;
	            }
	        }
	        // this.isIos = false;
	        // if ( ( navigator.userAgent.match( /iPhone/i ) ) || ( navigator.userAgent.match( /iPod/i ) ) ) {
	        //   this.isIos = true;
	        //   alert( 'wtf' );
	        // }
	        this.isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	        this.scrollIsInit = false;
	    }
	
	    _createClass(AtailScroll, [{
	        key: 'init',
	        value: function init() {
	            this.scrollIsInit = true;
	            this.createScroll();
	            this.onScroll();
	            var scrollTop = this.box.scrollTop;
	            this.parallax(scrollTop);
	            this.onParallax(scrollTop);
	            this.showItem(scrollTop);
	            this.onShowItem(scrollTop);
	        }
	    }, {
	        key: 'createScroll',
	        value: function createScroll() {
	            var _this = this;
	
	            if (!this.scrollIsInit) {
	                return false;
	            }
	            //=================================================
	            this.currentTop = 0;
	            var scroll = this.scroll = document.createElement('DIV');
	            scroll.className = 'atail-scroll';
	            var scrollLine = this.scrollLine = document.createElement('SPAN');
	            scrollLine.className = 'atail-scroll-line';
	            scroll.appendChild(scrollLine);
	            if (this.isMainScroll || this.isAllProjects) {
	                document.body.appendChild(scroll);
	            } else {
	                if (this.parent) {
	                    this.parent.appendChild(scroll);
	                }
	            }
	            var isMouseDown = false,
	                startY,
	                endY,
	                result,
	                mouseMove = false;
	            var onMouseEnter = function onMouseEnter() {
	                scroll.classList.add('hovered');
	            };
	            var onMouseDown = function onMouseDown(event) {
	                isMouseDown = true;
	                event.preventDefault();
	                startY = event.clientY;
	                _this.currentScrollTop = _this.box.scrollTop;
	                _this.scrollLine.style.transition = 'top 0s ease, height .3s ease, border-right-width .2s ease, opacity .3s ease';
	                _this.scrollLine.style.WebkitTransition = 'top 0s ease, height .3s ease, border-right-width .2s ease, opacity .3s ease';
	            };
	            var onMouseMove = function onMouseMove(event) {
	                if (!isMouseDown) {
	                    return false;
	                }
	                mouseMove = true;
	                endY = event.clientY;
	                result = endY - startY;
	                _this.box.scrollTop = _this.currentScrollTop + result / _this.precent;
	                document.addEventListener('mouseup', onMouseUp);
	            };
	            var onMouseUp = function onMouseUp() {
	                isMouseDown = false;
	                mouseMove = false;
	                _this.scrollLine.style.transition = '';
	                _this.scrollLine.style.WebkitTransition = '';
	                document.removeEventListener('mouseup', onMouseUp);
	            };
	            var onScrollClick = function onScrollClick(event) {
	                event.preventDefault();
	                event.stopPropagation();
	                if (!mouseMove) {
	                    _this.box.scrollTop = event.clientY / _this.precent;
	                    mouseMove = false;
	                }
	            };
	            var onLineClick = function onLineClick(event) {
	                event.preventDefault();
	                event.stopPropagation();
	                isMouseDown = false;
	                _this.scrollLine.style.transition = '';
	                _this.scrollLine.style.WebkitTransition = '';
	                document.removeEventListener('mouseup', onMouseUp);
	            };
	            var onMouseLeave = function onMouseLeave() {
	                scroll.classList.remove('hovered');
	            };
	            scroll.addEventListener('mouseenter', onMouseEnter);
	            scroll.addEventListener('mouseleave', onMouseLeave);
	            scroll.addEventListener('click', onScrollClick);
	            scrollLine.addEventListener('click', onLineClick);
	            scrollLine.addEventListener('mousedown', onMouseDown);
	            document.addEventListener('mousemove', onMouseMove);
	            setScrollWidth();
	            this.setBoxWidth();
	            this.setScrollSize();
	            this.animateScroll();
	        }
	    }, {
	        key: 'setBoxWidth',
	        value: function setBoxWidth() {}
	    }, {
	        key: 'setScrollWidth',
	        value: function setScrollWidth() {
	            var outer = document.createElement('div');
	            outer.style.visibility = 'hidden';
	            outer.style.width = '100px';
	            outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
	            document.body.appendChild(outer);
	            var widthNoScroll = outer.offsetWidth;
	            // force scrollbars
	            outer.style.overflow = 'scroll';
	            // add innerdiv
	            var inner = document.createElement('div');
	            inner.style.width = '100%';
	            outer.appendChild(inner);
	            var widthWithScroll = inner.offsetWidth;
	            // remove divs
	            outer.parentNode.removeChild(outer);
	            this.scrollWidth = widthNoScroll - widthWithScroll;
	        }
	    }, {
	        key: 'setScrollSize',
	        value: function setScrollSize() {
	            // if ( !( navigator.userAgent.match( /iPhone/i ) ) || !( navigator.userAgent.match( /iPod/i ) ) ) {
	            //   return false;
	            // }
	            if (this.isIos) {
	                return false;
	            }
	            if (!this.scrollIsInit) {
	                return false;
	            }
	            // let style = getComputedStyle(this.box);
	            // let minTop = this.minTop = parseInt( style.paddingTop.replace( 'px', '' ), 10 ) || 0;
	            // let minRight = this.minRight = parseInt( style.paddingRight.replace( 'px', '' ), 10 ) || 0;
	            var minTop = this.minTop = 0;
	            var visibleHeight = this.offsetHeight = this.box.offsetHeight,
	                fullHeight = this.fullHeight = this.box.scrollHeight;
	            var n = 0;
	            if (!this.isProjectPreview) {
	                var windowW = document.body.offsetHeight;
	                n = this.n = windowW - visibleHeight;
	            }
	            visibleHeight = this.offsetHeight = visibleHeight;
	            fullHeight = this.fullHeight = fullHeight;
	            // let maxScrollHeight = this.maxScrollHeight = fullHeight - visibleHeight;
	            if (visibleHeight + 1 < fullHeight) {
	                this.hasScroll = true;
	            } else {
	                this.hasScroll = false;
	            }
	            // if( this.hasScroll && this.scrollWidth ) {
	            if (this.hasScroll) {
	                this.scroll.style.display = '';
	                if (window.innerWidth < 992) {
	                    this.scrollLine.style.height = 0;
	                    this.box.style.width = '';
	                } else {
	                    var height = this.box.clientHeight - minTop,
	                        fullheight = this.box.scrollHeight - minTop;
	                    this.precent = height / fullheight;
	                    this.lineHeight = height * this.precent + n;
	                    this.scrollLine.style.height = this.lineHeight + 'px';
	                    this.scrollLine.style.top = this.minTop + 'px';
	                    this.box.style.width = this.scrollWidth + this.parent.clientWidth + 'px';
	                }
	            } else {
	                this.scrollLine.style.height = 0;
	                this.scroll.style.display = 'none';
	                if (window.innerWidth >= 992) {
	                    if (this.scrollWidth) {}
	                } else {
	                    this.box.style.width = '';
	                }
	            }
	        }
	    }, {
	        key: 'animateScroll',
	        value: function animateScroll() {
	            var _this2 = this;
	
	            clearTimeout(this.removeScrollShow);
	            // if( window.innerWidth < 992 || ! this.scrollWidth ) {
	            if (window.innerWidth < 992) {
	                return false;
	            }
	            var top = this.box.scrollTop * this.precent + this.minTop;
	            if (top < 0) {
	                top = this.minTop;
	            } else if (top > this.box.clientHeight + this.n - this.lineHeight) {
	                top = this.box.clientHeight + this.n - this.lineHeight;
	            }
	            this.currentTop = top;
	            this.scrollLine.style.top = top + 'px';
	            this.removeScrollShow = setTimeout(function () {
	                _this2.scroll.classList.remove('atail-scroll-show');
	            }, 500);
	        }
	    }, {
	        key: 'onScroll',
	        value: function onScroll() {
	            var _this3 = this;
	
	            if (!this.scrollIsInit) {
	                return false;
	            }
	            this.removeScrollShow = null;
	            var prevPos = this.box.scrollTop;
	            var isSmooth = false;
	            var scrollTop = 0;
	            var update = function update() {
	                _this3.scroll.classList.add('atail-scroll-show');
	                if (isSmooth) {
	                    _this3.alphablendNav(prevPos < scrollTop, scrollTop);
	                    prevPos = scrollTop;
	                }
	                _this3.onParallax(scrollTop);
	                _this3.onShowItem(scrollTop);
	                if (_this3.isIos) {
	                    return false;
	                }
	                var self = _this3;
	                self.animateScroll();
	            };
	            var html = document.documentElement;
	            var body = document.body;
	            var docScrollUpdate = function docScrollUpdate() {
	                var scrollTop = html.scrollTop || body && body.scrollTop || 0;
	                _this3.onParallax(scrollTop);
	                _this3.onShowItem(scrollTop);
	            };
	            var docScroll = (0, _lodash2.default)(docScrollUpdate, 16);
	            this.box.addEventListener('scroll', function (event) {
	                scrollTop = event.target.scrollTop;
	                update();
	            });
	            // this.box.addEventListener('scroll', scrollUpdate);
	            document.addEventListener('scroll', docScroll);
	        }
	    }, {
	        key: 'minimizeNav',
	        value: function minimizeNav(scrollTop) {
	            /*eslint-disable*/
	            var menuHeight = this.menuHeight ? this.menuHeight : 0;
	        }
	        /**
	         * Paralax elements
	         */
	
	    }, {
	        key: 'parallax',
	        value: function parallax(scrollTop) {
	            var paralaxItems = this.paralaxItems = this.box.querySelectorAll('.atail-parallax');
	            this.isParalaxItems = paralaxItems.length > 0 ? true : false;
	            this.seParalaxPos(scrollTop);
	        }
	    }, {
	        key: 'seParalaxPos',
	        value: function seParalaxPos(scrollTop) {
	            var paralaxItems = this.paralaxItems;
	            var parallaxItemsPos = this.parallaxItemsPos = [];
	            parallaxItemsPos.top = [];
	            parallaxItemsPos.bot = [];
	            parallaxItemsPos.height = [];
	            if (!paralaxItems) {
	                return false;
	            }
	            [].forEach.call(paralaxItems, function (item) {
	                var pos = item.parentNode.getBoundingClientRect();
	                // console.log( pos );
	                // console.log( this.box.scrollTop );
	                parallaxItemsPos.top.push(scrollTop + pos.top);
	                parallaxItemsPos.bot.push(scrollTop + pos.bottom);
	                parallaxItemsPos.height.push(item.parentNode.clientHeight);
	            });
	        }
	    }, {
	        key: 'onParallax',
	        value: function onParallax(scrollTop) {
	            var height = scrollTop + window.innerHeight,
	                length = this.paralaxItems.length,
	                info = this.parallaxItemsPos;
	            for (var i = 0; i < length; i++) {
	                // console.log( info.top[ i ], height, info.bot[ i ], scrollTop );
	                if (info.top[i] < height) {
	                    if (info.bot[i] >= scrollTop) {
	                        var step = info.top[i] - window.innerHeight - scrollTop;
	                        step = info.height[i] < window.innerWidth / 2 ? step / 20 : step / 10;
	                        this.paralaxItems[i].style.transform = 'translate3d(0,' + -step + 'px ,0)';
	                        this.paralaxItems[i].style.WebkitTransform = 'translate3d(0,' + -step + 'px ,0)';
	                    }
	                }
	            }
	        }
	        /**
	         * Show items on scroll
	         */
	
	    }, {
	        key: 'showItem',
	        value: function showItem(scrollTop) {
	            var showItems = this.showItems = this.box.querySelectorAll('.atail-animate-box');
	            this.isshowItems = showItems.length > 0 ? true : false;
	            this.setShowItemPos(scrollTop);
	        }
	    }, {
	        key: 'setShowItemPos',
	        value: function setShowItemPos(scrollTop) {
	            var showItems = this.showItems;
	            var showItemsPos = this.showItemsPos = [];
	            showItemsPos.top = [];
	            showItemsPos.bot = [];
	            showItemsPos.height = [];
	            if (!showItems) {
	                return false;
	            }
	            [].forEach.call(showItems, function (item) {
	                var pos = item.getBoundingClientRect();
	                showItemsPos.top.push(scrollTop + pos.top);
	                showItemsPos.bot.push(scrollTop + pos.bottom);
	                showItemsPos.height.push(item.clientHeight);
	                item.classList.add('atail-animate-box-init');
	            });
	        }
	    }, {
	        key: 'onShowItem',
	        value: function onShowItem(scrollTop) {
	            var height = scrollTop + window.innerHeight * .85,
	                length = this.showItems.length,
	                info = this.showItemsPos;
	            for (var i = 0; i < length; i++) {
	                if (info.top[i] < height) {
	                    // if ( info.bot[ i ] >= scrollTop ) {
	                    this.showItems[i].classList.remove('atail-animate-box-init');
	                }
	            }
	        }
	        /**
	         * minimize Nav with opacity
	         * { minimize } type boolean ( true if pre scrollTop < current scrollTop )
	         */
	
	    }, {
	        key: 'alphablendNav',
	        value: function alphablendNav(minimize, scrollTop) {
	            var menuHeight = this.menuHeight ? this.menuHeight : 0;
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            if (this.scroll && this.scroll.parentNode) {
	                this.scroll.parentNode.removeChild(this.scroll);
	            }
	        }
	    }, {
	        key: 'resize',
	        value: function resize() {
	            var scrollTop = this.box.scrollTop;
	            this.seParalaxPos(scrollTop);
	            this.setShowItemPos(scrollTop);
	            if (!this.scrollIsInit) {
	                return false;
	            }
	            this.setBoxWidth();
	            this.setScrollSize();
	        }
	    }]);
	
	    return AtailScroll;
	}();
	
	window.AtailScroll = AtailScroll;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	
	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }
	
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	
	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	
	  function trailingEdge(time) {
	    timerId = undefined;
	
	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	
	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }
	
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = throttle;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map