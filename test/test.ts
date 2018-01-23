import babelPolyfill from 'babel-polyfill'; // tslint:disable-line no-unused-variable
import ava from 'ava';
import index from '../src/index';
// import gitInfoReader from '../src/util/gitInfoReader';
// import fileReader from '../src/util/fileReader';



ava.serial('true should be true', (t) => {
  index()
  t.is(true, true);
});





/*

ava('should retrieve git information', async (t) => {
  const git = gitInfoReader();

  // t.is() values depend on local user
  t.truthy(git.branch);
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


ava('should fail if commit sent has bad token', async (t) => {
  process.env.TOKEN = '824ceaeXXXX0-e80c-11e7-affc-43f976dbdae1';
  process.env.GITAUTHOR = 'dummyUserTest testemail@email.com';
  process.env.GITBRANCH =  'dummyTestBranch';
  const res = await index();

  t.is(res.result, 'error');
  delete process.env.TOKEN;
  delete process.env.GITAUTHOR;
  delete process.env.GITBRANCH;

  await ProjectCommits.remove({ author: 'dummyUserTest testemail@email.com' });
  await Branches.remove({ name: 'dummyTestBranch' });
});


ava('should succesfully send a commit', async (t) => {
  process.env.TOKEN = '824ceae0-e80c-11e7-affc-43f976dbdae1';
  process.env.GITAUTHOR = 'dummyUserTest testemail@email.com';
  process.env.GITBRANCH =  'dummyTestBranch';
  const res = await index();

  t.is(res.result, 'ok');
  delete process.env.TOKEN;
  delete process.env.GITAUTHOR;
  delete process.env.GITBRANCH;

  await ProjectCommits.remove({ author: 'dummyUserTest testemail@email.com' });
  await Branches.remove({ name: 'dummyTestBranch' });
});
*/
