"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Application methods
 */
const bootstrap_1 = __importDefault(require("./bootstrap"));
/**
 * Plugin server methods
 */
const config_1 = __importDefault(require("./config"));
const register_1 = __importDefault(require("./register"));
exports.default = {
    register: register_1.default,
    bootstrap: bootstrap_1.default,
    config: config_1.default,
};
