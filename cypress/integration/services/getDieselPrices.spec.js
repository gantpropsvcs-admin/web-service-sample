import { baseURL } from '../../../cypress';

describe('API Testing with Cypress', () => {

   beforeEach(() => {
       cy.request(${baseURL}/1).as('dieselprice');
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