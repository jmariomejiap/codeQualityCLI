import * as fs from 'fs';
import * as path from 'path';

const readPromise = (file: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    return fs.readFile(path.resolve(file), 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};


const fileReader = async (file: string): Promise<string | null> => {
  const pathToFile = file;
  let result: string | null;

  try {
    result = await readPromise(pathToFile);
  } catch (error) {
    result = null;
  }

  return result;
};


export default fileReader;
