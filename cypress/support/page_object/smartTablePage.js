export class SmartTable{


     updateAgeByFirstName(name, age){
        cy.get('tbody').contains('tr', name).then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age);
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').eq(6).should('contain', age);
        })
     }

     addNewRecordWithFirstNameAndLastName(firstName, lastName){
        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName);
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName);
            cy.wrap(tableRow).find('[placeholder="Username"]').type('SHaladkar');
            cy.wrap(tableRow).find('[placeholder="E-mail"]').type('sHaladkar@globant.com');
            cy.wrap(tableRow).find('[placeholder="Age"]').type('30');
            cy.wrap(tableRow).find('[placeholder="ID"]').type('2629');
            cy.wrap(tableRow).find('.nb-checkmark').click();
        });

        // cy.get('tbody tr').first().then
        cy.get('tbody').find('tr').eq(0).then(newlyAddedData => {

            cy.wrap(newlyAddedData).find('td').eq(2).should('contain', firstName);
            cy.wrap(newlyAddedData).find('td').eq(3).should('contain', lastName);

        })
     }

     deleteRowByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm',stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');

        })
     }
}

export const onSmartTablePage = new SmartTable();