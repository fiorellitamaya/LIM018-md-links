const path = require('node:path');
const fs = require('fs');
const fetch = require('node-fetch');

// Comprobando que la ruta existe//
function pathExists(enteredRoute) {
  return fs.existsSync(enteredRoute);
}

// Obteniendo ruta absoluta//
function getAbsolutepath(enteredRoute) {
  return path.isAbsolute(enteredRoute) ? enteredRoute : path.resolve(enteredRoute);
}

// Comprobando si la ruta es un directorio//
function isADirectory(absoluteRoute) {
  return fs.statSync(absoluteRoute).isDirectory();
}
// Leyendo el directorio//
function readDirectory(absoluteRoute) {
  return fs.readdirSync(absoluteRoute);
}

// Comprobando que es un archivo MD//
function isMdFile(obtainedAbsolutePath) {
  const fileExtension = path.extname(obtainedAbsolutePath);
  return fileExtension === '.md';
}

// Extraer archivos Md del directorio //
function findFilesInDirectory(absoluteRoute) {
  let mdFiles = [];
  const directory = readDirectory(absoluteRoute);
  directory.forEach((file) => {
    const newRoute = path.join(absoluteRoute, file);
    if (isADirectory(newRoute)) {
      const readAgain = findFilesInDirectory(newRoute);
      mdFiles = mdFiles.concat(readAgain);
    } else if (isMdFile(newRoute)) {
      mdFiles.push(newRoute);
    }
  });
  return mdFiles;
}

// Leer archivo MD//
function readFile(mdfile) {
  return fs.readFileSync(mdfile, 'utf8');
}

// Extraer links//
function getLinks(readfile) {
  const regularExp = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  const links = readfile.match(regularExp);
  const regExpText = /\[[^\s]+(.+?)\]/gi;
  const regExpLink = /\((https?.+?)\)/gi;
  if (links === null) {
    return [];
  }
  return links.map((link) => { // Creando el array de objetos
    const linksObj = {
      href: link.match(regExpLink)[0].slice(1, -1),
      text: link.match(regExpText)[0].slice(1, -1),
      file: isMdFile(readFile),
    };
    return linksObj;
  });
}

// Ver el estado de los links con peticion HTTP//
function getLinksStatus(links) {
  const promisesArray = links.map((link) => fetch(link.href)
    .then((resolve) => {
      if (resolve.status >= 200 && resolve.status < 400) {
        return {
          ...link,
          status: resolve.status,
          message: resolve.statusText,
        };
      } return {
        ...link,
        status: resolve.status,
        message: 'fail',
      };
    })
    .catch((error) => ({
      ...link,
      status: error.errno,
      message: 'fail',
    })));
  return Promise.all(promisesArray);
}

function getStats(links) {
  const linksArray = links.map((link) => link.href);
  const totalLinks = linksArray.length;
  const uniqueLinks = [];
  linksArray.forEach((link) => {
    if (!uniqueLinks.includes(link)) {
      uniqueLinks.push(link);
    }
  });
  return { totalLinks, uniqueLinks: uniqueLinks.length };
}

function getBrokenLinks(validateLinks) {
  return validateLinks.filter((link) => link.message === 'fail').length;
}

module.exports = {
  pathExists,
  getAbsolutepath,
  isADirectory,
  readDirectory,
  isMdFile,
  findFilesInDirectory,
  readFile,
  getLinks,
  getLinksStatus,
  getStats,
  getBrokenLinks,

};
