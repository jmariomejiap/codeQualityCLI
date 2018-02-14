import * as rp from 'request-promise';
import gitInfoReader from '../src/util/gitInfoReader';
import envVariablesValidator from './util/envVariablesValidator';
import { index as T, envVariables as E } from './types/indexTypes';


const index = async (): Promise<T.IndexResult> => {
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

  const { hash, author, branch, message } = gitData;

  const payload: T.Options = {
    uri: envVars.serverUrl,
    method: 'POST',
    body: <T.Body> {
      branch,
      author,
      message,
      commitHash: hash,
      token: envVars.token,
      commitJson: JSON.parse(envVars.coverageJson),
    },
    json: true,
  };


  let result: T.IndexResult;
  try {
    result = await rp(payload);
  } catch (err) {
    /* istanbul ignore next */
    return { result: 'error', error: 'server_denied' };
  }
  /* istanbul ignore next */
  return { result: result.result };

};




export default index;
