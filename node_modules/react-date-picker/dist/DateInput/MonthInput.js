"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mergeClassNames = _interopRequireDefault(require("merge-class-names"));

var _dates = require("../shared/dates");

var _propTypes2 = require("../shared/propTypes");

var _utils = require("../shared/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var select = function select(element) {
  return element && element.select();
};

var MonthInput =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MonthInput, _PureComponent);

  function MonthInput() {
    _classCallCheck(this, MonthInput);

    return _possibleConstructorReturn(this, _getPrototypeOf(MonthInput).apply(this, arguments));
  }

  _createClass(MonthInput, [{
    key: "render",
    value: function render() {
      var maxMonth = this.maxMonth,
          minMonth = this.minMonth;
      var _this$props = this.props,
          className = _this$props.className,
          disabled = _this$props.disabled,
          itemRef = _this$props.itemRef,
          value = _this$props.value,
          onChange = _this$props.onChange,
          onKeyDown = _this$props.onKeyDown,
          required = _this$props.required,
          showLeadingZeros = _this$props.showLeadingZeros;
      var name = 'month';
      var hasLeadingZero = showLeadingZeros && value !== null && value < 10;
      return [hasLeadingZero && _react.default.createElement("span", {
        key: "leadingZero",
        className: "".concat(className, "__leadingZero")
      }, "0"), _react.default.createElement("input", {
        key: "month",
        autoComplete: "off",
        className: (0, _mergeClassNames.default)("".concat(className, "__input"), "".concat(className, "__month"), hasLeadingZero && "".concat(className, "__input--hasLeadingZero")),
        disabled: disabled,
        name: name,
        max: maxMonth,
        min: minMonth,
        onChange: onChange,
        onFocus: function onFocus(event) {
          return select(event.target);
        },
        onKeyDown: onKeyDown,
        onKeyUp: function onKeyUp(event) {
          return (0, _utils.updateInputWidth)(event.target);
        },
        placeholder: "--",
        ref: function ref(_ref) {
          if (_ref) {
            (0, _utils.updateInputWidth)(_ref);
          }

          if (itemRef) {
            itemRef(_ref, name);
          }
        },
        type: "number",
        required: required,
        value: value !== null ? value : ''
      })];
    }
  }, {
    key: "maxMonth",
    get: function get() {
      var _this$props2 = this.props,
          maxDate = _this$props2.maxDate,
          year = _this$props2.year;
      return (0, _utils.min)(12, maxDate && year === (0, _dates.getYear)(maxDate) && (0, _dates.getMonth)(maxDate));
    }
  }, {
    key: "minMonth",
    get: function get() {
      var _this$props3 = this.props,
          minDate = _this$props3.minDate,
          year = _this$props3.year;
      return (0, _utils.max)(1, minDate && year === (0, _dates.getYear)(minDate) && (0, _dates.getMonth)(minDate));
    }
  }]);

  return MonthInput;
}(_react.PureComponent);

exports.default = MonthInput;
MonthInput.propTypes = {
  className: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool,
  itemRef: _propTypes.default.func,
  maxDate: _propTypes2.isMaxDate,
  minDate: _propTypes2.isMinDate,
  onChange: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  required: _propTypes.default.bool,
  showLeadingZeros: _propTypes.default.bool,
  value: _propTypes.default.number,
  year: _propTypes.default.number
};