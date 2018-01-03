import * as getRepoInfo from 'git-repo-info';
import { GitInfo as G } from './indexTypes';


const gitReader = () => {
  const info = getRepoInfo();

  const gitInfo: G = {
    branch: info.branch,
    sha: info.sha,
    abbreviatedSha: info.abbreviatedSha,
    author: info.author,
  };

  return gitInfo;
};

export default gitReader;
