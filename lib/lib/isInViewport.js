"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getElementPosition_1 = __importDefault(require("./getElementPosition"));
var isHidden = function (element) { return element.offsetParent === null; };
function isInViewport(element, container, customOffset) {
    if (isHidden(element)) {
        return false;
    }
    var top;
    var bottom;
    var left;
    var right;
    if (typeof container === 'undefined') {
        top = window.pageYOffset;
        left = window.pageXOffset;
        bottom = top + window.innerHeight;
        right = left + window.innerWidth;
    }
    else {
        var containerPosition = getElementPosition_1.default(container);
        top = containerPosition.top;
        left = containerPosition.left;
        bottom = top + container.offsetHeight;
        right = left + container.offsetWidth;
    }
    var elementPosition = getElementPosition_1.default(element);
    return (top <= elementPosition.top + element.offsetHeight + customOffset.top &&
        bottom >= elementPosition.top - customOffset.bottom &&
        left <= elementPosition.left + element.offsetWidth + customOffset.left &&
        right >= elementPosition.left - customOffset.right);
}
exports.default = isInViewport;
//# sourceMappingURL=isInViewport.js.map