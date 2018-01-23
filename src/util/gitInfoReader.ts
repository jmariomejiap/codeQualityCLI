const gitReader = async (): Promise<any> => {
  return new Promise((resolve) => {
    require('simple-git')()
      .log((err, log) => {
        const { hash, message, author_name } = log.latest;
        console.log('log = ', log.latest);
        
        const branch = message.slice(message.indexOf('origin/') + 7, message.length - 1);

        console.log('branch =', branch)
      
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
