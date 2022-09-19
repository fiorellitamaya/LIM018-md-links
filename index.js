const path = require('node:path');
const fs = require('fs');

const route = './pruebas/prueba1.md';
// const route = './thumb.png';

// Comprobando que la ruta existe//
function pathExist(enteredRoute) {
  const pathResult = fs.existsSync(enteredRoute);
  if (!pathResult) {
    console.log('La ruta no existe');
  } else console.log('La ruta es correcta');
}
pathExist(route);

// Obteniendo ruta absoluta//
function getAbsolutepath(enteredRoute) {
  return path.isAbsolute(enteredRoute) ? enteredRoute : path.resolve(enteredRoute);
}
const absolutePath = getAbsolutepath(route);
console.log(absolutePath);

// Comprobando que es un archivo MD//
function mdFile(obtainedAbsolutePath) {
  const fileExtension = path.extname(obtainedAbsolutePath);
  if (fileExtension === '.md') {
    return obtainedAbsolutePath;
  } else console.log('No es un archivo md');
}
mdFile(absolutePath);

// Leer archivo MD//
function readFile(mdfile) {
  return fs.readFileSync(mdfile, 'utf8');
}
readFile(mdFile(absolutePath));
console.log(readFile(mdFile(absolutePath)));

// Extraer links//
function getLinks()

module.exports = {
  pathExist,
  getAbsolutepath,
  mdFile,
  readFile,
};
