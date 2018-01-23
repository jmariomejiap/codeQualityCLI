const gitReader = async (): Promise<any> => {
  return new Promise((resolve) => {
    require('simple-git')()
      .log((err, log) => {
        const { hash, message, author_name } = log.latest;
        console.log('log = ', log.latest);
        // const regexFindBranch = /(?<=origin\/).[a-z, 0-9]+/g;
        
        let branch : 'hardCoded';
        try {
          // branch = message.match(regexFindBranch)[0];
        } catch (error) {
          console.error('internal_error');
        }

        console.log('sliced = ', branch);

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
