import { baseURL } from '../../../cypress';

describe('Get a specific price form the list', () => {

   beforeEach(() => {
       cy.request(`${baseURL}/1`).as('dieselprice');
   });


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

describe('Get all prices from the list', () => {
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