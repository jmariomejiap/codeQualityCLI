import * as fs from 'fs';
import * as path from 'path';
import * as getRepoInfo from 'git-repo-info';


const pathToFile: string = './coverageData/coverage-summary.json'

const fileReader = (file: string) => {
  return new Promise((resolve, reject) => {
    return fs.readFile(path.resolve(file), (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data);
    });
  })
};


const gitReader = () => {
  const info = getRepoInfo();

  const gitInfo = {
    gitInfo: {
      branch: info.branch,
      sha: info.sha,
      abbreviatedSha: info.abbreviatedSha,
      author: info.author,
    }
  };

  return gitInfo;   
};


const fetchJsonCoverage = async () => {
  let result;
  try {
    result = await fileReader(pathToFile);
  } catch (error) {
    console.error('catching error = ', error);
  }

  return result;
};





const msg: string = 'Code Quality CLI';
console.log(msg);

console.log('******');
console.log(fetchJsonCoverage());