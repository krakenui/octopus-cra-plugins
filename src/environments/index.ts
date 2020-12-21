import path from "path";
import fs from "fs";
import dotenv from "dotenv";

const appendProcessEnv = (config: any, filePath: string, replace: boolean) => {
  if (fs.existsSync(filePath)) {
    // read settings from file
    const envSettingsStr = fs.readFileSync(filePath);
    const envSettings = dotenv.parse(envSettingsStr);

    // find element in current settings
    const replacementsIndex = config.plugins.findIndex((p) => p.replacements != null);
    const definitionsIndex = config.plugins.findIndex((p) => p.definitions != null);

    // update replacements
    if (replacementsIndex >= 0) {
      const replacementsObj = replace ? {} : config.plugins[replacementsIndex].replacements;
      config.plugins[replacementsIndex].replacements = Object.assign(replacementsObj, envSettings);
    }

    // update definitions
    if (definitionsIndex >= 0) {
      const envDefinitions = Object.assign(envSettings, {});
      for (let i in envDefinitions) {
        envDefinitions[i] = `\"${envDefinitions[i]}\"`;
      }
      const definitionsObj = replace ? {} : config.plugins[definitionsIndex].definitions["process.env"];
      config.plugins[definitionsIndex].definitions["process.env"] = Object.assign(definitionsObj, envDefinitions);
    }
  } else {
    console.warn(`Environment setting file at ${filePath} not exist`);
  }
};

const getScriptEnv = (script: string) => {
  const brackets = script.split(" ").filter((s) => s != null && s.trim().length > 0);
  const envIndex = brackets.findIndex((b) => "--cra-env" === b);

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
const overrideProcessEnv = (workDir: string = null, replace: boolean = false) => (config: any) => {
  if (process.env.npm_lifecycle_event != null) {
    const scriptEvent = process.env.npm_lifecycle_event.replace(/(:|\s)/g, "_");
    const script = process.env["npm_package_scripts_" + scriptEvent];

    if (/--cra-env/g.test(script)) {
      const env = getScriptEnv(script);
      if (workDir == null) {
        workDir = process.cwd();
      }

      const envFile = path.join(workDir, `.env.${env}`);
      appendProcessEnv(config, envFile, replace);
    }
  }

  return config;
};

export default overrideProcessEnv;
