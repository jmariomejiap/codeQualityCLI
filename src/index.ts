import * as rp from 'request-promise';
import gitInfoReader from '../src/util/gitInfoReader';
import fileReader from '../src/util/fileReader';

interface Body {
  branch: string;
  author: string;
  commitHash: string;
  token: string;
  commitJson: any;
}

interface Options {
  uri: string;
  method: string;
  json: boolean;
  body: Body;
}

interface Result {
  result: string;
  error?: {};
}

const sendCommitToApi = async () => {
  const uri: string = process.env.URI || 'http://localhost:8000/api/v1/commit';
  const token: string  = process.env.TOKEN;
  const location: string = process.env.LOCATION || './coverage/coverage-summary.json';

  const gitData = gitInfoReader();
  const commitHash: string = gitData.abbreviatedSha;
  const branch: string = process.env.GITBRANCH || gitData.branch;
  const author: string = process.env.GITAUTHOR || gitData.author;


  const commitJson: string = await fileReader(location);

  const options: Options = {
    uri,
    method: 'POST',
    body: <Body> {
      branch,
      author,
      commitHash,
      token,
      commitJson: JSON.parse(commitJson),
    },
    json: true,
  };

  let result: Result;
  try {
    result = await rp(options);
  } catch (err) {
    return { result: 'error', error: err.error };
  }

  return { result: result.result };
};

sendCommitToApi();

export default sendCommitToApi;
