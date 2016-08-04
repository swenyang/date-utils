(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["date-utils"] = factory();
	else
		root["date-utils"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var mServerSeed = void 0;
	var mClientSeed = void 0;
	var mFormatList = ['SSS', // milliseconds with leading 0
	'S', // milliseconds without leading 0
	'ss', // seconds with leading 0
	's', // seconds without leading 0
	'mm', // minutes with leading 0
	'm', // minutes without leading 0
	'hh', // hours with leading 0 (12-hour time system)
	'h', // hours without leading 0 (12-hour time system)
	'HH', // hours with leading 0 (24-hour time system)
	'H', // hours without leading 0 (24-hour time system)
	'dd', // date with leading 0
	'd', // date without leading 0
	'MM', // month with leading 0
	'M', // month without leading 0
	'yyyy', // full year
	'yy'];

	var dateUtils = {
	    MILLISECOND: 'millisecond',
	    SECOND: 'second',
	    MINUTE: 'minute',
	    HOUR: 'hour',
	    DATE: 'date',
	    MONTH: 'month',
	    YEAR: 'year',

	    /**
	     * clone a date and return a new Date object
	     * if new Date(param) returns Invalid Date, this function returns null
	     * @param param
	     * @returns {Date | null}
	     */
	    clone: function clone(param) {
	        if (param instanceof Date) {
	            return new Date(param.getTime());
	        }
	        var date = new Date(param);
	        if (isNaN(date)) {
	            console.error('dateUtils: invalid date param provided');
	            return null;
	        }
	        return date;
	    },

	    /**
	     * store server time locally in case client modified system time
	     * @param seed
	     * @returns {Date | null}
	     */
	    seed: function seed(_seed) {
	        var date = dateUtils.clone(_seed);
	        if (date) {
	            mServerSeed = date;
	            mClientSeed = new Date();
	            return date;
	        }
	        return null;
	    },

	    /**
	     * reset stored server time
	     */
	    resetSeed: function resetSeed() {
	        mServerSeed = null;
	        mClientSeed = null;
	    },

	    /**
	     * creates a new Date according to the server time
	     * if seed not set, creates a new Date using system time
	     * @returns {Date}
	     */
	    now: function now() {
	        var date = new Date();
	        if (!mServerSeed) {
	            return date;
	        }
	        var diff = date.getTime() - mClientSeed.getTime();
	        // client can set system time forward but not backward
	        if (diff >= 0) {
	            // add the delta time to server time
	            date.setTime(mServerSeed.getTime() + diff);
	        } else {
	            date.setTime(mServerSeed.getTime());
	        }
	        return date;
	    },

	    /**
	     * clear some parts of given date to zero, modify date in place
	     * @param date
	     * @param type
	     * @returns {Date}
	     */
	    clear: function clear(date, type) {
	        switch (type) {
	            case dateUtils.YEAR:
	                date.setMonth(0);
	            // falls through
	            case dateUtils.MONTH:
	                date.setDate(1);
	            // falls through
	            case dateUtils.DATE:
	                date.setHours(0);
	            // falls through
	            case dateUtils.HOUR:
	                date.setMinutes(0);
	            // falls through
	            case dateUtils.MINUTE:
	                date.setSeconds(0);
	            // falls through
	            case dateUtils.SECOND:
	                date.setMilliseconds(0);
	            // falls through
	            case dateUtils.MILLISECOND:
	            default:
	                break;
	        }
	        return date;
	    },

	    /**
	     * return last date of given year and month
	     * @param year
	     * @param month
	     */
	    daysInMonth: function daysInMonth(year, month) {
	        return new Date(year, month, 0).getDate();
	    },

	    /**
	     * test if given year is a leap year
	     * @param year
	     */
	    isLeapYear: function isLeapYear(year) {
	        return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
	    },

	    /**
	     * add a certain period to given date
	     * @param date      start date
	     * @param num       period
	     * @param type      period type
	     * @param excludeEndDate    only useful for type=DATE/MONTH/YEAR && num > 0, excluding the last day
	     * @returns {Date}
	     */
	    add: function add(date, num, type) {
	        var excludeEndDate = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	        var ret = dateUtils.clone(date);
	        if (!ret) {
	            return date;
	        }
	        if (num === 0) {
	            return ret;
	        }
	        if (ret) {
	            switch (type) {
	                case dateUtils.YEAR:
	                    ret.setFullYear(ret.getFullYear() + num);
	                    if (excludeEndDate && num > 0) {
	                        ret.setDate(ret.getDate() - 1);
	                    }
	                    break;
	                case dateUtils.MONTH:
	                    {
	                        var shouldSub1Date = true;
	                        if (ret.getDate() > 28) {
	                            var temp = dateUtils.clone(ret);
	                            temp.setDate(1);
	                            temp.setMonth(temp.getMonth() + num);
	                            var min = Math.min(ret.getDate(), dateUtils.daysInMonth(temp.getFullYear(), temp.getMonth() + 1));
	                            if (min !== ret.getDate()) {
	                                shouldSub1Date = false;
	                            }
	                            ret.setDate(min);
	                        }
	                        ret.setMonth(ret.getMonth() + num);
	                        if (excludeEndDate && num > 0 && shouldSub1Date) {
	                            ret.setDate(ret.getDate() - 1);
	                        }
	                        break;
	                    }
	                case dateUtils.DATE:
	                    ret.setDate(ret.getDate() + num);
	                    if (excludeEndDate && num > 0) {
	                        ret.setDate(ret.getDate() - 1);
	                    }
	                    break;
	                case dateUtils.HOUR:
	                    ret.setHours(ret.getHours() + num);
	                    break;
	                case dateUtils.MINUTE:
	                    ret.setMinutes(ret.getMinutes() + num);
	                    break;
	                case dateUtils.SECOND:
	                    ret.setSeconds(ret.getSeconds() + num);
	                    break;
	                case dateUtils.MILLISECOND:
	                    ret.setMilliseconds(ret.getMilliseconds() + num);
	                    break;
	                default:
	                    break;
	            }
	        }
	        return ret;
	    },

	    /**
	     * calculate the age of given birthday
	     * @param date      birthday
	     * @param addAgeAfterBirthday       if age increase at birthday or the day after birthday
	     * @returns {number}
	     */
	    age: function age(date) {
	        var addAgeAfterBirthday = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	        var birthday = dateUtils.clone(date);
	        if (!birthday) {
	            return 0;
	        }
	        var now = dateUtils.now();
	        if (now.getTime() <= birthday.getTime()) {
	            return 0;
	        }

	        var yearDiff = now.getFullYear() - birthday.getFullYear();
	        if (yearDiff > 0) {
	            var monthDiff = now.getMonth() - birthday.getMonth();
	            if (monthDiff === 0) {
	                var dateDiff = now.getDate() - birthday.getDate();
	                if (!addAgeAfterBirthday && dateDiff < 0 || addAgeAfterBirthday && dateDiff <= 0) {
	                    return yearDiff - 1;
	                }
	                return yearDiff;
	            } else if (monthDiff < 0) {
	                return yearDiff - 1;
	            }
	            return yearDiff;
	        }
	        return 0;
	    },

	    /**
	     * pad a number to fixed length with zero
	     * @param val
	     * @param digits
	     * @returns {string}
	     */
	    padZero: function padZero(val) {
	        var digits = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

	        var ret = val.toString();
	        for (var i = ret.length; i < digits; i++) {
	            ret = '0' + ret;
	        }
	        return ret;
	    },

	    /**
	     * format given date to specified format in local timezone
	     * @param date
	     * @param format
	     * @returns {string}
	     */
	    format: function format(date, _format) {
	        var d = dateUtils.clone(date);
	        if (!d) {
	            return '';
	        }
	        var ret = '' + _format;
	        for (var i = 0, l = mFormatList.length; i < l; i++) {
	            switch (mFormatList[i]) {
	                case 'SSS':
	                    ret = ret.replace(/SSS/g, dateUtils.padZero(d.getMilliseconds(), 3));
	                    break;
	                case 'S':
	                    ret = ret.replace(/S/g, d.getMilliseconds());
	                    break;
	                case 'ss':
	                    ret = ret.replace(/ss/g, dateUtils.padZero(d.getSeconds(), 2));
	                    break;
	                case 's':
	                    ret = ret.replace(/s/g, d.getSeconds());
	                    break;
	                case 'mm':
	                    ret = ret.replace(/mm/g, dateUtils.padZero(d.getMinutes(), 2));
	                    break;
	                case 'm':
	                    ret = ret.replace(/m/g, d.getMinutes());
	                    break;
	                case 'hh':
	                    {
	                        var hour = d.getHours();
	                        if (hour > 12) {
	                            hour %= 12;
	                        }
	                        if (hour === 0) {
	                            hour = 12;
	                        }
	                        ret = ret.replace(/hh/g, dateUtils.padZero(hour, 2));
	                        break;
	                    }
	                case 'h':
	                    {
	                        var _hour = d.getHours();
	                        if (_hour > 12) {
	                            _hour %= 12;
	                        }
	                        if (_hour === 0) {
	                            _hour = 12;
	                        }
	                        ret = ret.replace(/h/g, _hour);
	                        break;
	                    }
	                case 'HH':
	                    ret = ret.replace(/HH/g, dateUtils.padZero(d.getHours(), 2));
	                    break;
	                case 'H':
	                    ret = ret.replace(/H/g, d.getHours());
	                    break;
	                case 'dd':
	                    ret = ret.replace(/dd/g, dateUtils.padZero(d.getDate(), 2));
	                    break;
	                case 'd':
	                    ret = ret.replace(/d/g, d.getDate());
	                    break;
	                case 'MM':
	                    ret = ret.replace(/MM/g, dateUtils.padZero(d.getMonth() + 1, 2));
	                    break;
	                case 'M':
	                    ret = ret.replace(/M/g, d.getMonth() + 1);
	                    break;
	                case 'yyyy':
	                    ret = ret.replace(/yyyy/g, d.getFullYear());
	                    break;
	                case 'yy':
	                    ret = ret.replace(/yy/g, dateUtils.padZero(d.getFullYear() % 100, 2));
	                    break;
	                default:
	                    break;
	            }
	        }
	        return ret;
	    }
	};

	exports.default = dateUtils;

/***/ }
/******/ ])
});
;