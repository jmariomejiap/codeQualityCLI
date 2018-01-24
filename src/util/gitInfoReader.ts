import { GitInfo, takeStringReturnStringFunc } from '../util/types/indexTypes';
const simpleGit = require('simple-git')();
const gitReader: takeStringReturnStringFunc = (stringValue) => {
  return new Promise((resolve) => {
    simpleGit
      .log((err, log) => {
        // simpleGit.branch...
        const { hash, message, author_name } = log.latest;

        const branch = message.slice(message.indexOf('origin/') + 7, message.length - 1);

        const gitInfo: GitInfo = {
          branch,
          sha: hash,
          author: author_name,
        };
        return resolve(gitInfo);
      });
  });
};

export default gitReader;
