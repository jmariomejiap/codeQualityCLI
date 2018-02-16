import * as rp from 'request-promise';
import gitInfoReader from '../src/util/gitInfoReader';
import envVariablesValidator from './util/envVariablesValidator';
import { App as T, envVariables as E } from './types/appTypes';


const app = async (): Promise<T.AppResult> => {
  let envVars: E.EnvVariables;
  try {
    envVars = await envVariablesValidator();
  } catch (error) {
    console.log(`Error: ${error.message} `); // tslint:disable-line
    return;
  }


  let gitData;
  try {
    gitData = await gitInfoReader();
  } catch (error) {
    /* istanbul ignore next */
    console.log(`Error getting Git Data: ${error}`); // tslint:disable-line
    /* istanbul ignore next */
    return;
  }

  const { hash, author, branch, message, date } = gitData;

  const payload: T.Options = {
    uri: envVars.serverUrl,
    method: 'POST',
    body: <T.Body> {
      branch,
      author,
      message,
      date,
      commitHash: hash,
      token: envVars.token,
      commitJson: JSON.parse(envVars.coverageJson),
    },
    json: true,
  };


  let result: T.AppResult;
  try {
    console.log('this is the payload = ', payload);
    result = await rp(payload);
  } catch (err) {
    /* istanbul ignore next */
    console.log('error = ', err);
    return { result: 'error', error: 'server_denied' };
  }
  /* istanbul ignore next */
  console.log('result = ', result);
  return { result: result.result };

};




export default app;
