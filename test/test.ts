import babelPolyfill from 'babel-polyfill'; // tslint:disable-line no-unused-variable
import ava from 'ava';
// import index from '../src/index';
import gitInfoReader from '../src/util/gitInfoReader';
import fileReader from '../src/util/fileReader';
// import envVariablesValidator from '../src/util/envVariablesValidator';


ava.serial('true should be true', (t) => {
  t.is(true, true);
});


ava('should return a file if path is right', async (t) => {
  let fileFound: string;
  let errorMessage: string;

  try {
    fileFound = await fileReader('./package.json');
  } catch (error) {
    errorMessage = 'error';
  }

  const file = JSON.parse(fileFound);

  t.is(file.name, 'code-quality-cli');
  t.is(errorMessage, undefined);
});


ava('should fail if file doesnt exist', async (t) => {
  let fileFound: string;
  let errorMessage: string;

  try {
    fileFound = await fileReader('./ccXtoken.json');
  } catch (error) {
    errorMessage = 'error';
  }

  t.is(fileFound, undefined);
  t.is(errorMessage, 'error');
});


ava('function should retrieve git information', async (t) => {
  let gitData;
  let errorMessage: string;

  try {
    gitData = await gitInfoReader();
  } catch (error) {
    console.log('catching error in test'); // tslint:disable-line
    errorMessage = 'error';
  }
  // console.log('gitData in test = ', gitData);

  // t.is() values depend on local user
  t.truthy(gitData.author);
  t.truthy(gitData.hash);
  t.truthy(gitData.branch);
  t.is(errorMessage, undefined);
});


ava.skip('envVariables validation should fail if URL not give', async (t) => {
  process.env.CODE_QUALITY_SERVER_URL = 'http://localhost:8000/api/v1/commit';

  // const envVariables = await index();

  // t.is(res.result, 'error');
  // t.is(res.error, 'CLI is missing needed arguments');

  delete process.env.CODE_QUALITY_TOKEN;
  delete process.env.CQ_JSON_LOCATION;
});

/*
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
