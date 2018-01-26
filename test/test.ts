import babelPolyfill from 'babel-polyfill'; // tslint:disable-line no-unused-variable
import ava from 'ava';
import index from '../src/index';
import gitInfoReader from '../src/util/gitInfoReader';
import fileReader from '../src/util/fileReader';
import envVariablesValidator from '../src/util/envVariablesValidator';
import { envVariables as E, ObjectStringsKeysAndValues } from '../src/types/indexTypes';


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


ava('envVariables validation should fail if URL not set', async (t) => {
  process.env.CODE_QUALITY_TOKEN = 'sillyToken';

  let errorFound: ObjectStringsKeysAndValues;
  let envVariables;
  try {
    envVariables = await envVariablesValidator();
  } catch (error) {
    errorFound = error;
  }

  t.is(errorFound.message, 'configuration error, CODE_QUALITY_SERVER_URL is missing');
  t.is(envVariables, undefined);

  delete process.env.CODE_QUALITY_TOKEN;
});


ava('envVariables validation should fail if TOKEN not set', async (t) => {
  process.env.CODE_QUALITY_SERVER_URL = 'https://codeQuality.com/api/v1/commit';

  let errorFound: ObjectStringsKeysAndValues;
  let envVariables;
  try {
    envVariables = await envVariablesValidator();
  } catch (error) {
    errorFound = error;
  }

  t.is(errorFound.message, 'configuration error, CODE_QUALITY_TOKEN is missing');
  t.is(envVariables, undefined);

  delete process.env.CODE_QUALITY_SERVER_URL;
});


ava('envVariables validation should fail if JSON-COVERAGE not found (wrongPath)', async (t) => {
  process.env.CODE_QUALITY_SERVER_URL = 'https://codeQuality.com/api/v1/commit';
  process.env.CODE_QUALITY_TOKEN = 'sillyToken';
  process.env.CODE_QUALITY_JSON_COVERAGE = '../coverage/coverage-summary.json';

  let errorFound: ObjectStringsKeysAndValues;
  let envVariables;
  try {
    envVariables = await envVariablesValidator();
  } catch (error) {
    errorFound = error;
  }

  t.is(errorFound.message, 'configuration error, CODE_COVERAGE JSON is missing');
  t.is(envVariables, undefined);

  delete process.env.CODE_QUALITY_SERVER_URL;
  delete process.env.CODE_QUALITY_TOKEN;
  delete process.env.CODE_QUALITY_JSON_COVERAGE;

});


ava('envVariables validation SUCCESS if variables are set properly', async (t) => {
  process.env.CODE_QUALITY_SERVER_URL = 'https://codeQuality.com/api/v1/commit';
  process.env.CODE_QUALITY_TOKEN = 'sillyToken';
  process.env.CODE_QUALITY_JSON_COVERAGE = './test/coverage-summary.json';

  let errorFound: undefined ;
  let envVariables: E.EnvVariables;
  try {
    envVariables = await envVariablesValidator();
  } catch (error) {
    errorFound = error;
  }

  const coverage = JSON.parse(envVariables.coverageJson);
  const { lines, statements, functions, branches } = coverage.total;

  t.truthy(lines);
  t.truthy(statements);
  t.truthy(functions);
  t.truthy(branches);
  t.is(errorFound, undefined);

  delete process.env.CODE_QUALITY_SERVER_URL;
  delete process.env.CODE_QUALITY_TOKEN;
  delete process.env.CODE_QUALITY_JSON_COVERAGE;
});



ava('should send Commit', async (t) => {
  process.env.CODE_QUALITY_SERVER_URL = 'https://codeQuality.com/api/v1/commit';
  process.env.CODE_QUALITY_TOKEN = 'sillyToken';
  process.env.CODE_QUALITY_JSON_COVERAGE = './test/coverage-summary.json';

  let res;
  let errorMessage;
  try {
    res = await index();
  } catch (error) {
    errorMessage = error
  }
  

  t.truthy(res.result);
  t.is(errorMessage, undefined)

  delete process.env.CODE_QUALITY_SERVER_URL;
  delete process.env.CODE_QUALITY_TOKEN;
  delete process.env.CODE_QUALITY_JSON_COVERAGE;
});


ava('index should catch error if envVariables are not set properly', async (t) => {
  process.env.CODE_QUALITY_TOKEN = 'sillyToken';
  process.env.CODE_QUALITY_JSON_COVERAGE = './test/coverage-summary.json';

  let res;
  let errorMessage;
  try {
    res = await index();
  } catch (error) {
    errorMessage = error
  }
  

  // index will console.log error but returns void;
  t.is(errorMessage, undefined);
  t.is(res, undefined);

  delete process.env.CODE_QUALITY_TOKEN;
  delete process.env.CODE_QUALITY_JSON_COVERAGE;
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
