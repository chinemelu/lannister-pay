import * as fs from 'fs'


// write to a new file named 2pac.txt

export const writeFile = (fileName, fileContent ) => {
  return new Promise((resolve, reject) => {

    fs.writeFile(fileName, fileContent, (err) => {
      if (err) reject (err)
      resolve('File saved successfully')
    })
  })
}

export const readFile = (fileName) => {
  return new Promise(
    (resolve, reject) => {
      fs.readFile(fileName, 'UTF-8', (err, fileContent) => {
        if (err) reject(err);
        resolve(fileContent);
      });
    }
  );
}