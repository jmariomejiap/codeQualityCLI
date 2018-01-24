import babelPolyfill from 'babel-polyfill'; // tslint:disable-line no-unused-variable
import ava from 'ava';
// import index from '../src/index';
// import gitInfoReader from '../src/util/gitInfoReader';
import fileReader from '../src/util/fileReader';


ava.serial('true should be true', (t) => {
  t.is(true, true);
});


ava('should return a file if path is right', async (t) => {
  const fileFound = await fileReader('./package.json');
  const file = JSON.parse(fileFound);

  t.is(file.name, 'code-quality-cli');
});


ava.skip('should return null if file doesnt exist', async (t) => {
  const fileFound = await fileReader('./ccXtoken.json');

  t.is(fileFound, null);
});

/*
ava('should retrieve git information', async (t) => {
  const git = await gitInfoReader();

  // t.is() values depend on local user
  t.truthy(git.author);
  t.truthy(git.sha);
});


ava.skip('should fail if No token assigned ', async (t) => {
  const res = await index();

  t.is(res.result, 'error');
  t.is(res.error, 'CLI is missing needed arguments');
});

ava.skip('should fail if no JSON coverage found', async (t) => {
  process.env.CODE_QUALITY_TOKEN = '824ceaeXXXX0-e80c-11e7-affc-43f976dbdae1';
  process.env.CQ_JSON_LOCATION = './coverage/Bad-coverage-summary.json';

  const res = await index();

  t.is(res.result, 'error');
  t.is(res.error, 'CLI is missing needed arguments');

  delete process.env.CODE_QUALITY_TOKEN;
  delete process.env.CQ_JSON_LOCATION;
});


ava.skip('should send Commit', async (t) => {
  process.env.CODE_QUALITY_TOKEN = '824ceaeXXXX0-e80c-11e7-affc-43f976dbdae1';

  const res = await index();

  t.is(res.result, 'error');

  delete process.env.CODE_QUALITY_TOKEN;
});
*/
