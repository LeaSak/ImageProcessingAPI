"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fileUtilities_1 = require("../utilities/fileUtilities");
var ImageResizer_1 = __importDefault(require("./ImageResizer"));
var config_1 = require("../config/config");
/**
 * searches thumbnail image in file system
 * by name and dimensions.
 */
var ImageFinder = /** @class */ (function () {
    function ImageFinder() {
    }
    ImageFinder.getImageByNameWidthAndHeight = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var baseImagePath, thumbImagePath, thumbAccess, _a, baseImageAccess, resizedImagePath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        baseImagePath = this.getBaseImagePath(obj);
                        thumbImagePath = this.getThumbImagePath(obj);
                        if (!(thumbImagePath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkImageAccessByPath(thumbImagePath)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = '';
                        _b.label = 3;
                    case 3:
                        thumbAccess = _a;
                        if (thumbAccess) {
                            return [2 /*return*/, thumbImagePath];
                        }
                        return [4 /*yield*/, this.checkImageAccessByPath(baseImagePath)];
                    case 4:
                        baseImageAccess = _b.sent();
                        if (!baseImageAccess) {
                            return [2 /*return*/, ""];
                        }
                        return [4 /*yield*/, ImageResizer_1.default.resizeImage(obj, baseImagePath, thumbImagePath)];
                    case 5:
                        resizedImagePath = _b.sent();
                        return [2 /*return*/, resizedImagePath];
                }
            });
        });
    };
    ImageFinder.getBaseImagePath = function (obj) {
        return this.buildPath(config_1.config.paths.full, this.byNameOnly(obj));
    };
    ImageFinder.getThumbImagePath = function (obj) {
        return this.buildPath(config_1.config.paths.thumb, this.byNameAndDimensions(obj));
    };
    ImageFinder.checkImageAccessByPath = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var hasAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fileUtilities_1.checkFileAccess)(path).catch(function (e) { return console.error(e); })];
                    case 1:
                        hasAccess = _a.sent();
                        return [2 /*return*/, hasAccess ? path : ''];
                }
            });
        });
    };
    ImageFinder.buildPath = function (basePath, fileName) {
        return basePath && fileName ? path_1.default.resolve(__dirname, "../..", basePath, fileName) : '';
    };
    ImageFinder.getImageDimensions = function (obj) {
        return Boolean(obj.width && obj.height);
    };
    ImageFinder.byNameAndDimensions = function (obj) {
        return this.getImageDimensions(obj)
            ? "".concat(obj.filename, "-").concat(obj.width, "x").concat(obj.height, ".jpg")
            : '';
    };
    ImageFinder.byNameOnly = function (obj) {
        return "".concat(obj.filename, ".jpg");
    };
    return ImageFinder;
}());
exports.default = ImageFinder;
