import { baseURL } from '../../../cypress';

describe('Get a specific price form the list', () => {
    // get a known item
   beforeEach(() => {
       cy.request(`${baseURL}/1`).as('dieselprice');
   });

   // should be status 200 for success
   it('Validate the status code', () => {
       cy.get('@dieselprice')
           .its('status')
           .should('equal', 200);
   });

   it('Validate the location\'s name', () => {
       cy.get('@dieselprice')
           .its('body')
           .should('include', { location_name: 'Shell' });
   });
});


describe('Get error if id is not a found', () => {
    // pass a non-existent id
    beforeEach(() => {
        cy.request({ url: `${baseURL}/15`,  failOnStatusCode: false }).as('dieselprice');
    }); 
    
    // status should be 400
    it('Validate the status code is 400', () => {
        cy.get('@dieselprice')
            .its('status')
            .should('equal', 400);
    });
});

describe('Get all prices from the list', () => {
    // get all prices
    beforeEach(() => {
        cy.request(`${baseURL}`).as('dieselprices');
    });

    
    it('Validate the status code', () => {
        cy.get('@dieselprices')
            .its('status')
            .should('equal', 200);
    });
    
    it('Validate more than one item was returned', () => {
        cy.get('@dieselprices')
            .its('body')
            .should(($prices) => {
                expect($prices).to.have.length(3);
            });
    });
});
