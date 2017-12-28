import * as program from 'commander';
import { prompt } from 'inquirer';
import createProject from '../src/createProject';
import sendCommitAPI from '../src/sendCommitAPI';


const createQuestion = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Enter a name for your new project',
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
    prompt(createQuestion)
      .then((answer) => {
        const newName = answer.projectName;
        createProject(newName);
      });
  });

program
  .command('submitcoverage')
  .alias('sc')
  .description('Command to submit commits to code-quality-server API')
  .action(() => {
    sendCommitAPI();
  });

program.parse(process.argv);




/*
const msg: string = 'Code Quality CLI';
console.log(msg);
*/

