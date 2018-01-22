import * as getRepoInfo from 'git-repo-info';
import { GitInfo } from './indexTypes';

export interface GitReaderFun {
  (): GitInfo;
}

const gitReader: GitReaderFun = () => {
  const info = getRepoInfo();

  const gitInfo: GitInfo = {
    branch: info.branch,
    sha: info.sha,
    abbreviatedSha: info.abbreviatedSha,
    author: info.author,
  };
  console.log(gitInfo);
  console.log(info);
  return gitInfo;
};

export default gitReader;
