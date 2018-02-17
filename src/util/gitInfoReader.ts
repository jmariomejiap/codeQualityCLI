const simpleGit = require('simple-git')();
import { gitInfoReader as T } from '../types/appTypes';

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

        // cli behaves differently when run on CI vs. local.
        // branchData will be detached in CI.
        /* istanbul ignore if */
        if (branchData.detached) {
          const commitName = branchData.current;
          for (const branchObj in branchData.branches) {
            for (const prop in branchData.branches[branchObj]) {
              if (branchData.branches[branchObj][prop] === commitName &&
                branchData.branches[branchObj].name !== commitName) {
                const rawBranch: string = branchData.branches[branchObj].name;
                const branch: string = rawBranch.slice(rawBranch.lastIndexOf('/') + 1);
                return resolve(branch);
              }
            }
          }
        }

        // hit when run locally.
        /* istanbul ignore if */
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
