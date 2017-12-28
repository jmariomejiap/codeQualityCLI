import * as rp from 'request-promise';
import gitReader from '../src/util/gitInfoReader';
import fileReader from '../src/util/fileReader';


const sendCommitToApi = async () => {
  const gitData = gitReader();
  const { branch, abbreviatedSha, author } = gitData.gitInfo;

  const projectCLI = await fileReader('./codeQualityCLI.json');
  const projectData = JSON.parse(projectCLI);

  const commitJson = await fileReader('./coverage/coverage-summary.json');


  if (!projectCLI) {
    console.error('you must have an active project');
    return { error: 'projectCLI_not_found' };
  }

  if (!commitJson) {
    console.error('code coverage must be available');
    return { error: 'coverage-summary.json_not_found' };
  }

  const options = {
    method: 'POST',
    uri: 'http://localhost:8000/api/v1/commit',
    body: {
      branch,
      author,
      commitJson: JSON.parse(commitJson),
      commitHash: abbreviatedSha,
      projectId: projectData.projectId,
    },
    json: true,
  };

  rp(options)
    .then((parsedBody) => {
      // POST succeeded...
      console.log('then.... ,', parsedBody);
      return { result: 'ok' };
    })
    .catch((err) => {
      // POST failed...
      console.log('catch.... error post.... long {} ', Object.keys(err));
      console.info('error = ', err.error); // internal_error
      return { result: 'error' };
    });
};


export default sendCommitToApi;
