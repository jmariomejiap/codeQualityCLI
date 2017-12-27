import * as rp from 'request-promise';
import fileWriter from '../src/util/fileWriter';

const sendProjectApi = async (projectName: string) => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:8000/api/v1/project',
    body: {
      projectName,
    },
    json: true,
  };

  let newProject;

  try {
    newProject = await rp(options);
  } catch (error) {
    newProject = error;

  }

  return newProject;
};


const createProject = async (name) => {
  const newProject = await sendProjectApi(name);

  if (newProject.result === 'ok') {
    const projectSaved = newProject.saved;
    const body = {
      projectId: projectSaved._id,
      token: projectSaved.token,
    };

    const data = JSON.stringify(body);

    fileWriter('projectCLI.json', data);
    return { result: 'saved' };
  }

  console.log(`project ${name} already exists`);
  return newProject;
};

export default createProject;
