"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_dom_1 = require("react-dom");
var eventlistener_1 = require("eventlistener");
var lodash_1 = require("lodash");
var getScrollParent_1 = __importDefault(require("./lib/getScrollParent"));
var isInViewport_1 = __importDefault(require("./lib/isInViewport"));
var LazyLoad = /** @class */ (function (_super) {
    __extends(LazyLoad, _super);
    function LazyLoad(props) {
        var _this = _super.call(this, props) || this;
        _this._mounted = false;
        _this.getEventNode = function () {
            if (_this.props.scrollContainer) {
                var allScrollDom = document.querySelectorAll(_this.props.scrollContainer);
                var scrollDom = allScrollDom.length > 0 && allScrollDom[allScrollDom.length - 1];
                return scrollDom || getScrollParent_1.default(react_dom_1.findDOMNode(_this));
            }
            return getScrollParent_1.default(react_dom_1.findDOMNode(_this));
        };
        _this.getOffset = function () {
            var _a = _this.props, offset = _a.offset, offsetVertical = _a.offsetVertical, offsetHorizontal = _a.offsetHorizontal, offsetTop = _a.offsetTop, offsetBottom = _a.offsetBottom, offsetLeft = _a.offsetLeft, offsetRight = _a.offsetRight, threshold = _a.threshold;
            var _offsetAll = threshold || offset;
            var _offsetVertical = offsetVertical || _offsetAll;
            var _offsetHorizontal = offsetHorizontal || _offsetAll;
            return {
                top: offsetTop || _offsetVertical,
                bottom: offsetBottom || _offsetVertical,
                left: offsetLeft || _offsetHorizontal,
                right: offsetRight || _offsetHorizontal,
            };
        };
        _this.lazyLoadHandler = function () {
            if (!_this._mounted) {
                return;
            }
            var offset = _this.getOffset();
            var node = react_dom_1.findDOMNode(_this);
            var eventNode = _this.getEventNode();
            if (isInViewport_1.default(node, eventNode, offset)) {
                var onContentVisible_1 = _this.props.onContentVisible;
                _this.setState({ visible: true }, function () {
                    if (onContentVisible_1) {
                        onContentVisible_1();
                    }
                });
                _this.detachListeners();
            }
        };
        _this.detachListeners = function () {
            var eventNode = _this.getEventNode();
            eventlistener_1.remove(window, 'resize', _this.lazyLoadHandler);
            eventlistener_1.remove(eventNode, 'scroll', _this.lazyLoadHandler);
        };
        _this.state = { visible: false };
        if (props.throttle > 0) {
            if (props.debounce) {
                _this.lazyLoadHandler = lodash_1.debounce(_this.lazyLoadHandler, props.throttle);
            }
            else {
                _this.lazyLoadHandler = lodash_1.throttle(_this.lazyLoadHandler, props.throttle);
            }
        }
        return _this;
    }
    LazyLoad.prototype.componentDidMount = function () {
        this._mounted = true;
        var eventNode = this.getEventNode();
        window.requestAnimationFrame(this.lazyLoadHandler);
        eventlistener_1.add(window, 'resize', this.lazyLoadHandler);
        eventlistener_1.add(eventNode, 'scroll', this.lazyLoadHandler);
    };
    LazyLoad.prototype.componentWillReceiveProps = function () {
        if (!this.state.visible) {
            this.lazyLoadHandler();
        }
    };
    LazyLoad.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return nextState.visible;
    };
    LazyLoad.prototype.componentWillUnmount = function () {
        this._mounted = false;
        this.detachListeners();
    };
    LazyLoad.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, height = _a.height, width = _a.width, fallbackUI = _a.fallbackUI;
        var visible = this.state.visible;
        var elStyles = { height: height, width: width };
        var elClasses = ('LazyLoad' +
            (visible ? ' is-visible' : '') +
            (className ? " " + className : ''));
        return react_1.default.createElement(this.props.elementType, {
            className: elClasses,
            style: elStyles,
        }, visible ? react_1.Children.only(children) : fallbackUI);
    };
    LazyLoad.defaultProps = {
        elementType: 'div',
        debounce: true,
        offset: 0,
        offsetBottom: 0,
        offsetHorizontal: 0,
        offsetLeft: 0,
        offsetRight: 0,
        offsetTop: 0,
        offsetVertical: 0,
        throttle: 250,
        scrollContainer: '',
        fallbackUI: null,
    };
    return LazyLoad;
}(react_1.Component));
exports.default = LazyLoad;
//# sourceMappingURL=index.js.map