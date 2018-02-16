import * as fs from 'fs';
import * as path from 'path';
import { FuncStringToPromiseString } from '../types/appTypes';

const fileReader: FuncStringToPromiseString = (filePath: string) => {
  fs.readdir(filePath, (err, files) => {
    files.forEach(file => {
      console.log(file); // tslint:disable-line
    });
  });

  return new Promise((resolve, reject) => {
    return fs.readFile(path.resolve(filePath), 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

export default fileReader;
