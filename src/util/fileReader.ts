import * as fs from 'fs';
import * as path from 'path';


const readPromise = (file: string) => {
  return new Promise((resolve, reject) => {
    return fs.readFile(path.resolve(file), 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};


const fileReader = async (file: string) => {
  const pathToFile = file;
  let result;

  try {
    result = await readPromise(pathToFile);
  } catch (error) {
    result = null;
  }

  return result;
};


export default fileReader;
