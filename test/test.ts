import babelPolyfill from 'babel-polyfill'; // tslint:disable-line no-unused-variable
import ava from 'ava';
import * as mongoose from 'mongoose';
import gitReader from '../src/util/gitInfoReader';
import fileReader from '../src/util/fileReader';
import createProject from '../src/createProject';

const Schema = mongoose.Schema;

const project = new Schema({
  name: { type: String, require: true },
  token: { type: String, require: true },
  dateCreated: { type: Date, require: true },
  dateUpdated: { type: Date, require: true },
  isActive: { type: Boolean, require: true },
});

const Project = mongoose.model('Project', project);

let database;



ava.before(async () => {
  mongoose.Promise = global.Promise;

  // connect to db
  database = mongoose.connect('mongodb://localhost:27017/code-quality', {
    useMongoClient: true
  });

});

ava.after('after', async (t) => {
  database.close();
})


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
  const fileFound = await fileReader('./package.json');
  const file = JSON.parse(fileFound);

  t.is(file.name, 'code-quality-cli');
});


ava('createProject should return error if project already exist', async (t) => {
  const newProject = await createProject('dummyProject1');
  
  t.is(newProject.result, 'project_already_exist');
});


ava('should fail if name given to a project is invalid', async (t) => {
  const newProject = await createProject('334badName');

  t.is(newProject.statusCode, 404);
  t.is(newProject.error.result, 'error');
  t.is(newProject.error.error, 'invalid_valueRegex');
});

ava('createProject  project ', async (t) => {
  const newProjectName = 'avaProjectTest'
  const newProject = await createProject(newProjectName);

  const projects = await Project.find({});

  const verifyNewProject = projects.filter((p) => {
    return p.name === 'avaProjectTest';
  });

  t.is(verifyNewProject[0].name, newProjectName);
  t.is(newProject.result, 'saved');

  await Project.remove({ name: newProjectName });
});
