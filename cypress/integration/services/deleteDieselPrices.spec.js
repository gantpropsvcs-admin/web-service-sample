import { baseURL } from '../../../cypress';

describe('Delete an price from the list', () => {
    it('Delete an item', () => {
        cy.request('DELETE', `${baseURL}/1`)
        .its('body')
        .should('equal', "Id=1 was deleted successfully.") 


    });
});