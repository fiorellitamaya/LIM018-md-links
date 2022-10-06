const functions = require('./index');

function mdLinks(path, options) {
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
          console.log(linksArray.flat(2));
        });
        if (options.validate) {
          functions.getLinksStatus(linksArray).then((result) => resolve(result));
        }
      } else if (functions.isMdFile(path)) {
        const mdFileContent = functions.readFile(path);
        const objectsArray = functions.getLinks(mdFileContent);
        if (objectsArray.length > 0) {
          resolve(objectsArray);
          if (options.validate) {
            functions.getLinksStatus(objectsArray).then((result) => resolve(result));
          }
        } else {
          console.log('El archivo no contiene links');
        }
      }
    } else {
      reject('La ruta no existe, por favor ingresa una nueva ruta');
    }
  });
}

// const path = '../pruebas';
const path = '../pruebas/prueba1.md';

mdLinks(path, { validate: true }).then((result) => console.log(result));
