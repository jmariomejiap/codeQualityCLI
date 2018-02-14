const simpleGit = require('simple-git')();
import { gitInfoReader as T } from '../types/indexTypes';


// helper function
const getAuthorAndHash: T.GetAuthorAndHash = () => {
  return new Promise((resolve, reject) => {
    simpleGit
      .log((err, log) => {
        /* istanbul ignore if */
        if (err) {
          return reject('Log promise rejected');
        }

        const logData: T.LogData = {
          hash: log.latest.hash,
          author: log.latest.author_name,
          message: log.latest.message,
          date: log.latest.date,
        };
        return resolve(logData);
      });
  });
};

// helper function
const getBranch: T.FuncReturnsPromiseString = () => {
  return new Promise((resolve, reject) => {
    simpleGit
      .branch((err, branchData) => {
        /* istanbul ignore if */
        if (err) {
          return reject('Branch promise rejected');
        }
        const branch: string = branchData.current;
        return resolve(branch);
      });
  });
};


// export function
const getGitData: T.GetGitData = async () => {
  let branch: string;
  let gitData;

  try {
    branch = await getBranch();
    gitData = await getAuthorAndHash();
  } catch (error) {
    /* istanbul ignore next */
    return error;
  }

  const result: T.Result = {
    branch,
    author: gitData.author,
    hash: gitData.hash,
    message: gitData.message,
    date: gitData.date,
  };

  return result;
};

export default getGitData;
