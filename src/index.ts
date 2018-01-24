import * as rp from 'request-promise';
import gitInfoReader from '../src/util/gitInfoReader';
import fileReader from '../src/util/fileReader';
import { index as T } from './util/types/indexTypes';


const index = async (): Promise<T.Result> => {

  let envVars: EnvVariables;
  try {
    envVars = getEnvVariblesFunc();
  } catch (error) {
    console.log(error.message);
  }
  const commitJson: string = await fileReader(location);

  if (!token || !commitJson) {
    return { result: 'error', error: 'CLI is missing needed arguments' };
  }

  const payload: T.Options = {
    uri,
    method: 'POST',
    body: <T.Body> {
      branch,
      author,
      commitHash,
      token,
      commitJson: JSON.parse(commitJson),
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

index();


export default index;
