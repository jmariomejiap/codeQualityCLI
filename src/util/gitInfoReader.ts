const gitReader = async (): Promise<any> => {
  return new Promise((resolve) => {
    require('simple-git')()
      .log((err, log) => {
        const { hash, message, author_name } = log.latest;
        console.log('log = ', log.latest);
        const regexFindBranch = /\>([^,]+)/g;
        const regexCleanUp = /[a-z]+\d/g;

        const sliceBranch = message.match(regexFindBranch)[0];
        const branch = sliceBranch.match(regexCleanUp)[0];

        const gitInfo = {
          branch,
          sha: hash,
          author: author_name,
        };
        return resolve(gitInfo);
      });
  });
};

export default gitReader;
