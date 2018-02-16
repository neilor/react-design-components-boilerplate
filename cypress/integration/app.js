describe('login tests', () => {
  it('should login for valid user and password', () => {
    cy.visit('/');

    cy
      .get('input[placeholder=id]')
      .clear()
      .type('foo');
    cy
      .get('input[placeholder=password]')
      .clear()
      .type('1234');

    cy
      .get('button')
      .contains('Login')
      .click();

    cy.contains('Now Playing');
  });

  it('should show error on invalid user and password', () => {
    cy.visit('/');

    cy
      .get('input[placeholder=id]')
      .clear()
      .type('foo');
    cy
      .get('input[placeholder=password]')
      .clear()
      .type('12'); // wrong password

    cy
      .get('button')
      .contains('Login')
      .click();

    cy.contains('wrong id or password');
  });
});
