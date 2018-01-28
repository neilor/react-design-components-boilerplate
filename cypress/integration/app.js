before(() => {
  cy.visit('/');
});

const doValidLogin = () => {
  cy
    .get('input[placeholder=id]')
    .clear()
    .type('foo');
  cy
    .get('input[placeholder=password]')
    .clear()
    .type('1234');
  cy.get('button[type=submit]').click();

  cy.contains('Home');
};

describe('login', () => {
  it('should login with valid credentials', () => {
    doValidLogin();

    cy.contains('Home');
    cy.contains('Wishlist');
    cy.contains('Logout');
    cy.contains('Now Playing');
    cy.contains('Top Rated');

    cy.contains('Logout').click();
  });

  it('should not login with invalid credentials', () => {
    cy
      .get('input[placeholder=id]')
      .clear()
      .type('foo');
    cy
      .get('input[placeholder=password]')
      .clear()
      .type('12345');
    cy.get('button[type=submit]').click();

    cy.contains('wrong id or password');
  });
});

describe('home movie lists', () => {
  it('should show top rated and now playing movie lists', () => {
    doValidLogin();

    cy
      .contains('Now Playing')
      .siblings()
      .should('have.length', 10);

    cy
      .contains('Top Rated')
      .siblings()
      .should('have.length', 10);

    cy.contains('Logout').click();
  });
});

describe('home search', () => {
  it.only('should search for all', () => {
    doValidLogin();

    cy.get('input').type('jake');

    cy
      .get('input')
      .siblings('div')
      .children()
      .should('have.length.above', 0);
  });
});
