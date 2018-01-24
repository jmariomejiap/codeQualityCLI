import { GetEnvVariblesFunc, EnvVariables } from '../types/indexTypes';
import fileReader from '../util/fileReader';


const getEnvVariblesFunc: GetEnvVariblesFunc = async () => {
  const coverageLocation: string = process.env.CODE_QUALITY_JSON_COVERAGE
    || '../../coverage/coverage-summary.json';

  if (!process.env.CODE_QUALITY_SERVER_URL) {
    throw new Error('configuration error, CODE_QUALITY_SERVER_URL is missing');
  }

  if (!process.env.CODE_QUALITY_TOKEN) {
    throw new Error('configuration error, CODE_QUALITY_TOKEN is missing');
  }

  // find code coverage json file
  let coverageJson: string;
  try {
    coverageJson = await fileReader(coverageLocation);
  } catch (error) {
    throw new Error('configuration error, CODE_COVERAGE is missing');
  }

  // required variables to enable ClI
  const envVars: EnvVariables = {
    coverageJson,
    serverUrl: process.env.CODE_QUALITY_SERVER_URL,
    token: process.env.CODE_QUALITY_TOKEN,
  };

  return envVars;
};

export default getEnvVariblesFunc;
