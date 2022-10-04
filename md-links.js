const functions = require('./index');

function mdLinks(path) {
  return new Promise((resolve, reject) => {
    if (functions.pathExists(path)) {
      functions.getAbsolutepath(path);
      if (functions.isADirectory(path)) {
        functions.readDirectory(path);
        resolve(functions.findFilesInDirectory(path));
      } else if (functions.isMdFile(path)) {
        functions.readFile(path);
        resolve(functions.getLinks(path));
      }
    }
    reject(new Error('La ruta no existe'));
  });
}

// const path = './pruebas';
const path = './pruebas/prueba1.md';

mdLinks(path).then((result) => console.log(result));
