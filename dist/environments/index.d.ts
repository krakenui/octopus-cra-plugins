/**
 * Override process env using dotenv syntax
 * Refer: https://github.com/motdotla/dotenv#readme
 *
 * @param {*} filePath env setting file path
 * @param {*} replace true - hard replace, false - soft merge
 */
declare const overrideProcessEnv: (workDir?: string, replace?: boolean) => (config: any) => void;
export default overrideProcessEnv;
