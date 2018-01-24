


export getEnvVariblesFunc: GetEnvVariblesFunc = () => {



  if (!process.env.CODE_QUALITY_SERVER_URL) {
    throw new Error('.....');
  }
  const uri: string =
  const token: string  = process.env.CODE_QUALITY_TOKEN;
  const location: string = process.env.CQ_JSON_LOCATION
    || './coverage/coverage-summary.json';

  const gitData = await gitInfoReader();
  const commitHash: string = gitData.sha;
  const branch: string = process.env.GITBRANCH || gitData.branch;
  const author: string = process.env.GITAUTHOR || gitData.author;

  const envVars: EnvVariables = {
    serverUrl: process.env.CODE_QUALITY_SERVER_URL
  };

  return envVars;
};
