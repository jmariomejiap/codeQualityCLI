import * as getRepoInfo from 'git-repo-info';

const gitReader = () => {
  const info = getRepoInfo();

  const gitInfo = {
    gitInfo: {
      branch: info.branch,
      sha: info.sha,
      abbreviatedSha: info.abbreviatedSha,
      author: info.author,
    },
  };

  return gitInfo;
};

export default gitReader;
