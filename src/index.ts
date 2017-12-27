import gitReader from '../src/util/gitInfoReader';
import createProject from '../src/createProject';
import sendCommitAPI from '../src/sendCommitAPI';
import fileReader from '../src/util/fileReader';


createProject('CLIProject3');

const gitInfo = gitReader();
const commitJsonFile = fileReader('./coverage/coverage-summary.json');
const projectIdJson = fileReader('./XXcctoken.json');

sendCommitAPI(gitInfo, commitJsonFile, projectIdJson);





/*
const msg: string = 'Code Quality CLI';
console.log(msg);
*/

