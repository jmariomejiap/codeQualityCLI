import * as fs from 'fs';
import * as path from 'path';
import { FuncStringToPromiseString } from '../types/appTypes';

const fileReader: FuncStringToPromiseString = (filePath: string) => {
  console.log('path..... ', filePath);
  return new Promise((resolve, reject) => {
    return fs.readFile(path.resolve(filePath), 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      console.log('found file...', data);
      resolve(data);
    });
  });
};

export default fileReader;
