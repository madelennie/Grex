'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getISOLocalDateTime = exports.getHoursMinutesSeconds = exports.getISOLocalDate = exports.convert24to12 = exports.convert12to24 = exports.getHoursMinutes = exports.getSeconds = exports.getMinutes = exports.getHours = exports.getDay = exports.getMonth = exports.getYear = undefined;

var _dates = require('react-calendar/dist/shared/dates');

Object.defineProperty(exports, 'getYear', {
  enumerable: true,
  get: function get() {
    return _dates.getYear;
  }
});
Object.defineProperty(exports, 'getMonth', {
  enumerable: true,
  get: function get() {
    return _dates.getMonth;
  }
});
Object.defineProperty(exports, 'getDay', {
  enumerable: true,
  get: function get() {
    return _dates.getDay;
  }
});

var _dates2 = require('react-clock/dist/shared/dates');

Object.defineProperty(exports, 'getHours', {
  enumerable: true,
  get: function get() {
    return _dates2.getHours;
  }
});
Object.defineProperty(exports, 'getMinutes', {
  enumerable: true,
  get: function get() {
    return _dates2.getMinutes;
  }
});
Object.defineProperty(exports, 'getSeconds', {
  enumerable: true,
  get: function get() {
    return _dates2.getSeconds;
  }
});

var _dates3 = require('react-time-picker/dist/shared/dates');

Object.defineProperty(exports, 'getHoursMinutes', {
  enumerable: true,
  get: function get() {
    return _dates3.getHoursMinutes;
  }
});
Object.defineProperty(exports, 'convert12to24', {
  enumerable: true,
  get: function get() {
    return _dates3.convert12to24;
  }
});
Object.defineProperty(exports, 'convert24to12', {
  enumerable: true,
  get: function get() {
    return _dates3.convert24to12;
  }
});
exports.getISOLocalDate = _dates.getISOLocalDate;
exports.getHoursMinutesSeconds = _dates3.getHoursMinutesSeconds;

// eslint-disable-next-line import/prefer-default-export

var getISOLocalDateTime = exports.getISOLocalDateTime = function getISOLocalDateTime(value) {
  if (!value) {
    return value;
  }

  var date = new Date(value);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date: ' + value);
  }

  return (0, _dates.getISOLocalDate)(date) + 'T' + (0, _dates3.getHoursMinutesSeconds)(date);
};