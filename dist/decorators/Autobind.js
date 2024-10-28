"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoBind = void 0;
var autoBind = function (_target, _methodName, descriptor) {
    var orginalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        get: function () {
            var boundFn = orginalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
};
exports.autoBind = autoBind;
//# sourceMappingURL=Autobind.js.map