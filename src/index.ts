import * as rp from 'request-promise';
import gitInfoReader from '../src/util/gitInfoReader';
import fileReader from '../src/util/fileReader';
import { IndexTypesDefinition as T } from './util/indexTypes';


const index = async (): Promise<T.Result> => {
  const uri: string = process.env.URI || 'http://localhost:8000/api/v1/commit';
  const token: string  = process.env.TOKEN;
  const location: string = process.env.LOCATION || './coverage/coverage-summary.json';

  const gitData = await gitInfoReader();
  const commitHash: string = gitData.sha;
  const branch: string = process.env.GITBRANCH || gitData.branch;
  const author: string = process.env.GITAUTHOR || gitData.author;


  const commitJson: string = await fileReader(location);

  if (!token) {
    return { result: 'error', error: 'CLI_TOKEN is missing' };
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
