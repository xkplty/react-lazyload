"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getElementPosition(element) {
    var rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
    };
}
exports.default = getElementPosition;
//# sourceMappingURL=getElementPosition.js.map