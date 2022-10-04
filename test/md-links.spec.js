const index = require('../index');

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
    const absolutePath = 'C:/Users/fiore/Desktop/Laboratoria/LIM018-md-links/pruebas/prueba1.md';
    expect(index.getAbsolutepath(enteredRoute)).toBe(absolutePath);
  });
});
