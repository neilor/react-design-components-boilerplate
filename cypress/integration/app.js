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
      .parent()
      .siblings()
      .should('have.length', 10);

    cy
      .contains('Top Rated')
      .parent()
      .siblings()
      .should('have.length', 10);

    cy.contains('Logout').click();
  });
});

const resultsAssert = open => {
  if (open) {
    cy
      .get('input')
      .siblings('div')
      .children()
      .should('have.length.above', 0);
  } else {
    cy
      .get('input')
      .siblings('div')
      .children()
      .should('have.length', 0);
  }
};

describe('home search', () => {
  after(() => {
    cy.contains('Logout').click();
  });

  it('should search for all', () => {
    doValidLogin();

    cy.get('input').type('jake');

    resultsAssert(true);
  });

  it('should clear result when selecting other type', () => {
    cy.get('select').select('Person');

    resultsAssert(false);
  });

  it('should return result when again clicking on input box', () => {
    cy.get('input').click();

    resultsAssert(true);
  });

  it('should clear results on clicking outside', () => {
    cy.get('body').click(400, 100);

    resultsAssert(false);
  });

  it('should clear result if clear all text', () => {
    cy.get('input').click();

    resultsAssert(true);

    cy.get('input').clear();

    resultsAssert(false);
  });
});

const verifyListLength = (heading = 'Top Rated', n = 1) => {
  cy
    .get('[data-test=movie-list]')
    .children()
    .should('have.length.above', n);
};

describe('top rated list', () => {
  before(() => {
    doValidLogin();
  });

  after(() => {
    cy.contains('Logout').click();
  });

  it('should display top rated list', () => {
    cy.contains('Top Rated').click();

    verifyListLength();
  });
});

describe('wishlist', () => {
  before(() => {
    doValidLogin();
  });

  after(() => {
    cy.contains('Logout').click();
  });

  it('should add to wishlist', () => {
    cy.contains('Top Rated').click();

    verifyListLength();

    cy
      .get('[data-test=movie-list]')
      .children()
      .first()
      .contains('Add to Watchlist')
      .click();
  });

  it('should open wishlist', () => {
    cy.contains('Wishlist').click();
  });
});
