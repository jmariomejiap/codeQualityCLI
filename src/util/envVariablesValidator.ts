import { envVariables as T } from "../types/appTypes";
import fileReader from "../util/fileReader";

const getEnvVariblesFunc: T.GetEnvVariblesFunc = async () => {
  if (!process.env.CODE_QUALITY_SERVER_URL) {
    throw new Error("configuration error, CODE_QUALITY_SERVER_URL is missing");
  }

  if (!process.env.CODE_QUALITY_TOKEN) {
    throw new Error("configuration error, CODE_QUALITY_TOKEN is missing");
  }

  // find code coverage json file
  // the expected path is "../../coverage/coverage-summary.json";
  const coverageLocation: string = process.env.CODE_QUALITY_JSON_COVERAGE;

  let coverageJson: string;
  try {
    coverageJson = await fileReader(coverageLocation);
  } catch (error) {
    if (!process.env.CODE_QUALITY_JSON_COVERAGE) {
      throw new Error(
        "configuration error, CODE_QUALITY_JSON_COVERAGE env variable is missing"
      );
    }

    throw new Error(
      "configuration error, coverage output couldn't be found, check your configuration."
    );
  }

  // required variables to enable ClI
  const envVars: T.EnvVariables = {
    coverageJson,
    serverUrl: process.env.CODE_QUALITY_SERVER_URL,
    token: process.env.CODE_QUALITY_TOKEN
  };

  return envVars;
};

export default getEnvVariblesFunc;
