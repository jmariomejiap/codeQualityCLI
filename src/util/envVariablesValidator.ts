import { envVariables as T } from '../types/appTypes';
import fileReader from '../util/fileReader';


const getEnvVariblesFunc: T.GetEnvVariblesFunc = async () => {
  if (!process.env.CODE_QUALITY_SERVER_URL) {
    throw new Error('configuration error, CODE_QUALITY_SERVER_URL is missing');
  }

  if (!process.env.CODE_QUALITY_TOKEN) {
    throw new Error('configuration error, CODE_QUALITY_TOKEN is missing');
  }

  // find code coverage json file
  /* istanbul ignore next */
  const coverageLocation: string = process.env.CODE_QUALITY_JSON_COVERAGE
    || '../../coverage/coverage-summary.json';

  console.log('path for coverage = ', coverageLocation); // tslint:disable-line

  let coverageJson: string;
  try {
    coverageJson = await fileReader(coverageLocation);
  } catch (error) {
    throw new Error('configuration error, CODE_COVERAGE_JSON is missing');
  }

  // required variables to enable ClI
  const envVars: T.EnvVariables = {
    coverageJson,
    serverUrl: process.env.CODE_QUALITY_SERVER_URL,
    token: process.env.CODE_QUALITY_TOKEN,
  };

  return envVars;
};

export default getEnvVariblesFunc;
