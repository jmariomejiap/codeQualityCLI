import * as fs from 'fs';

const fileWriter = (fileName, data) => {
  return fs.writeFile(fileName, data, (err) => {
    if (err) console.error('error writing file,', err);
  });
};

export default fileWriter;
