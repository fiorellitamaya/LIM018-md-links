const fetch = require('node-fetch');
const index = require('../src/index');

jest.mock('node-fetch');

describe('pathExists', () => {
  it('should check if the path exist', () => {
    const enteredRoute = './pruebas/prueba1.md';
    expect(index.pathExists(enteredRoute)).toBe(true);
  });

  it('should check if the path does not exist', () => {
    const enteredRoute = 'index.md';
    expect(index.pathExists(enteredRoute)).toBe(false);
  });

  it('should return an absolute path', () => {
    const enteredRoute = './pruebas/prueba1.md';
    const absolutePath = 'C:\\Users\\fiore\\Desktop\\Laboratoria\\LIM018-md-links\\pruebas\\prueba1.md';
    expect(index.getAbsolutepath(enteredRoute)).toBe(absolutePath);
  });

  it('should return an absolute path for an absolute path', () => {
    const absolutePath = 'C:\\Users\\fiore\\Desktop\\Laboratoria\\LIM018-md-links\\pruebas\\prueba1.md';
    expect(index.getAbsolutepath(absolutePath)).toBe(absolutePath);
  });
});

describe('type of extension', () => {
  it('should return the type of extension', () => {
    const enteredRoute = './pruebas/prueba1.md';
    expect(index.isMdFile(enteredRoute)).toBe(true);
  });
});

describe('read a directory', () => {
  it('should read a directory', () => {
    const enteredRoute = './pruebas';
    const result = ['carpeta pruebas', 'prueba1.md'];
    expect(index.readDirectory(enteredRoute)).toEqual(result);
  });
});

describe('find files in a directory', () => {
  it('should return all .md files from a directory', () => {
    const enteredRoute = './pruebas';
    const result = ['pruebas\\carpeta pruebas\\prueba2.md', 'pruebas\\carpeta pruebas\\prueba4.md', 'pruebas\\prueba1.md'];
    expect(index.findFilesInDirectory(enteredRoute)).toEqual(result);
  });
});

describe('read a file', () => {
  it('should read a file', () => {
    const enteredRoute = './pruebas/carpeta pruebas/prueba4.md';
    const result = 'Texto sin links :P';
    expect(index.readFile(enteredRoute)).toEqual(result);
  });
});

describe('get links ', () => {
  it('should return an objects array with the links', () => {
    const enteredRoute = './pruebas/carpeta pruebas/prueba2.md';
    const fileContent = `Dentro de cada **_milestone_** se crearán y asignarán los **_issues_** que cada quien
    considere necesarios. 
    ![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)`;
    const result = [
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: './pruebas/carpeta pruebas/prueba2.md',
      }];
    expect(index.getLinks(fileContent, enteredRoute)).toEqual(result);
  });
});

describe('Check links status', () => {
  it('should return the link status and the status message', () => {
    const linkObject = [
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: './pruebas/carpeta pruebas/prueba2.md',
      }];
    const result = [
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: './pruebas/carpeta pruebas/prueba2.md',
        status: '200',
        message: 'OK',
      }];
    fetch.mockResolvedValueOnce({ status: '200', statusText: 'OK' });
    index.getLinksStatus(linkObject).then((res) => expect(res).toEqual(result));
  });
});

describe('get stats', () => {
  it('should return an object with total and unique links', () => {
    const linkObject = [
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: './pruebas/carpeta pruebas/prueba2.md',
      }];
    const result = { totalLinks: 1, uniqueLinks: 1 };
    expect(index.getStats(linkObject)).toEqual(result);
  });
});

describe('get broken links', () => {
  it('should return the number of broken links', () => {
    const linkObject = [
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: './pruebas/carpeta pruebas/prueba2.md',
      }];
    expect(index.getBrokenLinks(linkObject)).toEqual(0);
  });
});
