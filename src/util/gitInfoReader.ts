import { GitInfo } from './indexTypes';

const gitReader = async (): Promise<any> => {
  return new Promise((resolve) => {
    require('simple-git')()
      .log((err, log) => {       
        const { hash, message, author_name } = log.latest;
        const sliceBranch = message.slice(message.indexOf('>') + 2, message.indexOf(','));

        const gitInfo = {
          branch: sliceBranch,
          sha: hash,
          author: author_name,
        };
        return resolve(gitInfo);
      })

  }) 
};

export default gitReader;
