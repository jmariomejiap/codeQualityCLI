const gitReader = async (): Promise<any> => {
  return new Promise((resolve) => {
    require('simple-git')()
      .status((err, status) => console.log('status = ', status))
      .log((err, log) => {
        const { hash, message, author_name } = log.latest;
        console.log('log = ', log.latest);
        // const regexFindBranch = /\>([^,]+)/g;
        // const regexFindBranch = /[^/]*[a-z, 0-9]/g;
        const regexFindBranch = /origin\/([a-z, 0-9]*)/g;
        const regexCleanUp = /[a-z]+\d/g;

        const sliceBranch = message.match(regexFindBranch)[0];
        console.log('sliced = ', sliceBranch);
        const branch = 'sliceBranch.match(regexCleanUp)[0]';

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
