import { baseURL } from '../../../cypress';

describe('Add a price item', () => {
    it('Update an an item\'s price', () => {
        cy.request('POST', `${baseURL}`, {                 
            "price": 3.50,
            "location": {
                "lat": 35,
                "long": -115   
            },
            "location_name" : "Circle K",
            "date": (new Date()).toISOString()
        })
        .its('body')
        .should(($newprice) => { 
            expect($newprice, 'Item was added')
                .property('price').to.equal(3.50);
        });


    });
 
});