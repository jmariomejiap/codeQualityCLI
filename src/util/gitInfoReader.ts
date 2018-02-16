const simpleGit = require('simple-git')();
import { gitInfoReader as T } from '../types/appTypes';
/*
const example = {
  detached: true,
  current: '2a95d5c',
  all: 
   [ '2a95d5c',
     'master',
     'remotes/origin/adding-cli',
     'remotes/origin/enable-frontend',
     'remotes/origin/feedback-fix',
     'remotes/origin/issue32',
     'remotes/origin/issue38-welcomechallenge',
     'remotes/origin/issue39-passingprops',
     'remotes/origin/issue40-dashboard',
     'remotes/origin/issue43-deployheroku',
     'remotes/origin/master',
     'remotes/origin/new-plugin',
     'remotes/origin/new/run-prod-and-dev' ],
  branches: { 
    '2a95d5c': 
      { current: true,
        name: '2a95d5c',
        commit: '2a95d5c',
        label: 'adding a commit'
      },
    master: 
      { current: false,
        name: 'master',
        commit: '0165e13',
        label: 'removing cookies at the end of the challenge.adding redirecting when needed'
      },
    'remotes/origin/adding-cli': 
      { current: false,
        name: 'remotes/origin/adding-cli',
        commit: '2a95d5c',
        label: 'adding a commit'
      },
    'remotes/origin/enable-frontend': 
      { current: false,
        name: 'remotes/origin/enable-frontend',
        commit: '1aedca7',
        label: 'wrapping up login page, css is working'
      },
    },
}
*/

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
        // console.log('branchData = ', branchData)
        if (branchData.detached) {
          const commitName = branchData.current;          
          for (let branchObj in branchData.branches) {
            for (let prop in branchData.branches[branchObj]) {
              if (branchData.branches[branchObj][prop] === commitName && branchData.branches[branchObj].name !== commitName) {
                const rawBranch: string = branchData.branches[branchObj].name;
                const branch: string = rawBranch.slice(rawBranch.lastIndexOf('/') + 1);
                console.log('parse branch = ', branch);
                return resolve(branch);
              }
            }
          }
        };

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
