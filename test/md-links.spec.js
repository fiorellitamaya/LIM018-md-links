const { pathExist } = require('../index');

describe('pathExist', () => {
  it('should be a function', () => {
    expect(typeof pathExist).toBe('function');
  });
  it('should check if the path exist', () => {
    const enteredRoute = 'C:/Users/fiore/Desktop/Laboratoria/LIM018-md-links/pruebas/prueba1.md';
    expect(pathExist(enteredRoute)).toBeTruthy();
  });
});
