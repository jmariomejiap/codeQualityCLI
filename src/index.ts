import * as program from 'commander';
import { prompt } from 'inquirer';
import gitReader from '../src/util/gitInfoReader';
import createProject from '../src/createProject';
import sendCommitAPI from '../src/sendCommitAPI';
import fileReader from '../src/util/fileReader';


// createProject('CLIProject3');

const gitInfo = gitReader();
const commitJsonFile = fileReader('./coverage/coverage-summary.json');
const projectIdJson = fileReader('./XXcctoken.json');

// sendCommitAPI(gitInfo, commitJsonFile, projectIdJson);

const question = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Enter a name for your new project'
  },
];


program
  .version('1.0.0')
  .description('code quality cli');


program
  .command('create')
  .alias('c')
  .description('Command to create a new project')
  .action(() => {
    prompt(question)
      .then((answer) => {
        const newName = answer.projectName;
        createProject(newName);
      });
  });

program.parse(process.argv);




/*
const msg: string = 'Code Quality CLI';
console.log(msg);
*/

