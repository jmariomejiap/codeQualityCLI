import babelPolyfill from 'babel-polyfill'; // tslint:disable-line no-unused-variable
import ava from 'ava';
import gitReader from '../src/util/gitInfoReader';
import fileReader from '../src/util/fileReader';
import createProject from '../src/createProject';

ava.before(async () => {
});



ava.serial('true should be true', (t) => {
  t.is(true, true);
});


ava('should retrive git information', async (t) => {
  const git = gitReader();
  // t.is() values depend on local user
  t.truthy(git.gitInfo.branch);
});

ava('should fail if path to file doesnt exist', async (t) => {
  const fileFound = await fileReader('./ccXtoken.json');

  t.is(fileFound, null);
});

ava('should return a file if path is right', async (t) => {
  const fileFound = await fileReader('./cctoken.json');
  const file = JSON.parse(fileFound);

  t.is(file.projectId, 'dfadfadfadfadfadfadadfadfadfadf');
});

ava('createProject should return error if project already exist', async (t) => {
  const newProject = await createProject('dummyProject1');

  // console.log('newProject = ', newProject);
  t.is(newProject.statusCode, 404);
  t.is(newProject.error.result, 'error');
  t.is(newProject.error.error, 'project_already_exist');
});


ava.skip('createProject  project ', async (t) => {
  const newProject = await createProject('dummyProject2');

  // console.log('newProject = ', newProject);

  console.log('newProject = ', newProject);
  t.is(true, true);
});
