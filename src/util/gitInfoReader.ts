import { GitInfo, takeStringReturnStringFunc } from '../util/types/indexTypes';

const gitReader: takeStringReturnStringFunc = (stringValue) => {
  return new Promise((resolve) => {
    require('simple-git')()
      .log((err, log) => {
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
