import * as rp from 'request-promise';



const sendCommitToApi = async (gitData, jsonFile, projectIdFile) => {
  const { branch, abbreviatedSha, author } = gitData.gitInfo;

  const resolveProject = await projectIdFile;
  const cqtoken = JSON.parse(resolveProject);

  const options = {
    method: 'POST',
    uri: 'http://localhost:8000/api/v1/commit',
    body: {
      branch,
      author,
      commitJson: await jsonFile,
      commitHash: abbreviatedSha,
      projectId: cqtoken.projectId,
    },
    json: true,
  };

  rp(options)
    .then((parsedBody) => {
      // POST succeeded...
      console.log('then.... ,', parsedBody);
    })
    .catch((err) => {
      // POST failed...
      console.log('catch.... error post.... long {} ');
    });
};


export default sendCommitToApi;
