import * as getRepoInfo from 'git-repo-info';

interface GitInfo {
  branch: string;
  sha: string;
  abbreviatedSha: string;
  author: string;
}

const gitReader = () => {
  const info = getRepoInfo();

  const gitInfo: GitInfo = {
    branch: info.branch,
    sha: info.sha,
    abbreviatedSha: info.abbreviatedSha,
    author: info.author,
  };

  return gitInfo;
};

export default gitReader;
