"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var dotenv_1 = __importDefault(require("dotenv"));
var appendProcessEnv = function (config, filePath, replace) {
    if (fs_1.default.existsSync(filePath)) {
        // read settings from file
        var envSettingsStr = fs_1.default.readFileSync(filePath);
        var envSettings = dotenv_1.default.parse(envSettingsStr);
        // find element in current settings
        var replacementsIndex = config.plugins.findIndex(function (p) { return p.replacements != null; });
        var definitionsIndex = config.plugins.findIndex(function (p) { return p.definitions != null; });
        // update replacements
        if (replacementsIndex >= 0) {
            var replacementsObj = replace ? {} : config.plugins[replacementsIndex].replacements;
            config.plugins[replacementsIndex].replacements = Object.assign(replacementsObj, envSettings);
        }
        // update definitions
        if (definitionsIndex >= 0) {
            var envDefinitions = Object.assign(envSettings, {});
            for (var i in envDefinitions) {
                envDefinitions[i] = "\"" + envDefinitions[i] + "\"";
            }
            var definitionsObj = replace ? {} : config.plugins[definitionsIndex].definitions["process.env"];
            config.plugins[definitionsIndex].definitions["process.env"] = Object.assign(definitionsObj, envDefinitions);
        }
        return 0;
    }
    console.warn("Environment setting file at " + filePath + " not exist");
};
var getScriptEnv = function (script) {
    var brackets = script.split(" ").filter(function (s) { return s != null && s.trim().length > 0; });
    var envIndex = brackets.findIndex(function (b) { return "--cra-env" === b; });
    if (envIndex < 0 || envIndex >= brackets.length - 1) {
        return null;
    }
    return brackets[envIndex + 1];
};
/**
 * Override process env using dotenv syntax
 * Refer: https://github.com/motdotla/dotenv#readme
 *
 * @param {*} filePath env setting file path
 * @param {*} replace true - hard replace, false - soft merge
 */
var overrideProcessEnv = function (workDir, replace) {
    if (workDir === void 0) { workDir = null; }
    if (replace === void 0) { replace = false; }
    return function (config) {
        if (process.env.npm_lifecycle_event != null) {
            var scriptEvent = process.env.npm_lifecycle_event.replace(/(:|\s)/g, "_");
            var script = process.env["npm_package_scripts_" + scriptEvent];
            if (/--cra-env/g.test(script)) {
                var env = getScriptEnv(script);
                if (workDir == null) {
                    workDir = process.cwd();
                }
                var envFile = path_1.default.join(workDir, ".env." + env);
                appendProcessEnv(config, envFile, replace);
            }
        }
    };
};
exports.default = overrideProcessEnv;
//# sourceMappingURL=index.js.map