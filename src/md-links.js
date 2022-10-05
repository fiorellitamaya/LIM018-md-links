const functions = require('./index');

function mdLinks(path) {
  return new Promise((resolve, reject) => {
    if (functions.pathExists(path)) {
      functions.getAbsolutepath(path);
      if (functions.isADirectory(path)) {
        const linksArray = [];
        const mdFiles = functions.findFilesInDirectory(path);
        mdFiles.forEach((file) => {
          const absoluteFile = functions.getAbsolutepath(file);
          const fileContent = functions.readFile(absoluteFile);
          const objectsArray = functions.getLinks(fileContent);
          linksArray.push(objectsArray);
          resolve(linksArray.flat(2));
        });
      } else if (functions.isMdFile(path)) {
        const mdFileContent = functions.readFile(path);
        resolve(functions.getLinks(mdFileContent));
      }
    } else {
      reject('La ruta no existe');
    }
  });
}

// const path = './pruebas';
const path = '../pruebas/prueba1.md';

mdLinks(path).then((result) => console.log(result));
