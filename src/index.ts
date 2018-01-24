import * as rp from 'request-promise';
import gitInfoReader from '../src/util/gitInfoReader';
import envVarioablesValidator from './util/envVarioablesValidator';
import { index as T, EnvVariables } from './types/indexTypes';


const index = async (): Promise<T.Result> => {
  let envVars: EnvVariables;
  try {
    envVars = await envVarioablesValidator();
  } catch (error) {
    console.log(error); // tslint:disable-line
    return;
  }


  let gitData;
  try {
    gitData = await Promise.all(gitInfoReader());
  } catch (error) {
    console.log(error); // tslint:disable-line
  }


  const { sha, author } = gitData[0];
  const branch = gitData[1];


  const payload: T.Options = {
    uri: envVars.serverUrl,
    method: 'POST',
    body: <T.Body> {
      branch,
      author,
      commitHash: sha,
      token: envVars.token,
      commitJson: JSON.parse(envVars.coverageJson),
    },
    json: true,
  };


  let result: T.Result;
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
