import { Log } from '../types/indexTypes';
const simpleGit = require('simple-git')();


const gitReader = () => {
  const log = new Promise((resolve) => {
    simpleGit
      .log((err, log) => {
        if (err) {
          throw new Error('Error getting Git Logs');
        }

        const { hash, author_name } = log.latest;

        const gitInfo: Log = {
          sha: hash,
          author: author_name,
        };

        return resolve(gitInfo);
      });
  });

  const branch = new Promise((resolve) => {
    simpleGit
      .branch((err, branchData) => {
        if (err) {
          throw new Error('Error getting Git Branch information');
        }
        const branch: string = branchData.current;
        return resolve(branch);
      });
  });

  return [log, branch];
};

export default gitReader;
