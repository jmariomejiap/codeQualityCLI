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
    console.log(`project ${name} succesfully created`);
    return { result: 'saved' };
  }

  if (newProject.error === 'project_already_exist') {
    console.log(`project ${name} already exists`);
    return { result: 'project_already_exist' };
  }

  console.log(' internal error creating newProject = ', newProject);
  return newProject;
};

export default createProject;
