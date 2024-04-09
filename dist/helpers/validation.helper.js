"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationHelper = void 0;
class ValidationHelper {
    static reformatError(original) {
        return original.map((validation) => validation.errors).flat();
    }
}
exports.ValidationHelper = ValidationHelper;
