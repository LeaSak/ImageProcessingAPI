"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var path_1 = __importDefault(require("path"));
var fileUtilities_1 = require("./utilities/fileUtilities");
var config_1 = require("./config/config");
var app = (0, express_1.default)();
var port = config_1.config.port;
app.use('/api', index_1.default);
app.listen(port, function () {
    var fullDirName = path_1.default.join(__dirname, '..', config_1.config.paths.full);
    var thumbDirName = path_1.default.join(__dirname, '..', config_1.config.paths.thumb);
    (0, fileUtilities_1.buildDirectories)(fullDirName);
    (0, fileUtilities_1.buildDirectories)(thumbDirName);
    console.log("server started at localhost:".concat(port));
});
exports.default = app;
