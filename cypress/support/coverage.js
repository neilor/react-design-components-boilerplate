/* global after, cy */
/* eslint-disable no-underscore-dangle */

after(() => {
  cy.window().then(win => {
    if (win.__coverage__) {
      cy.writeFile('.nyc_output/out.json', JSON.stringify(win.__coverage__));
      cy.exec('nyc report --reporter=html');
    }
  });
});
