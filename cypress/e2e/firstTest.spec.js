/// <reference types="cypress" />




describe('Our First Suite', () => {
    it("First Test", () => {

        cy.visit("/");
        cy.contains("Forms").click();
        cy.contains("Form Layouts").click();


        // By tag name
        cy.get("input")


        // By id
        cy.get("#inputEmail1")

        cy.get('[placeholder]')

        cy.get('[data-cy="imputEmail1"]');
    })

    it("Second Test", () => {
        cy.visit("/");
        cy.contains("Forms").click();
        cy.contains("Form Layouts").click();

        cy.get('[data-cy="signInButton"]');

        cy.contains('[status="warning"]', 'Sign in').click();

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

    })

    it("then and wrap methods", () => {
        cy.visit("/");
        cy.contains("Forms").click();
        cy.contains("Form Layouts").click();

        /*cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputEmail1"]')
            .should('contain', 'Email');

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputPassword2"]')
            .should('contain', 'Password');

        cy.contains('nb-card', 'Basic form')
            .find('[for="exampleInputEmail1"]')
            .should('contain', 'Email address');

        cy.contains('nb-card', 'Basic form')
            .find('[for="exampleInputPassword1"]')
            .should('contain', 'Password'); */

        cy.contains('nb-card', 'Using the Grid').then(firstform => {
            const emailLable = firstform.find('[for="inputEmail1"]').text();
            const passwordLabel = firstform.find('[for="inputPassword2"]').text();

            expect(emailLable).to.equal('Email');
            expect(passwordLabel).to.equal('Password');

            cy.contains('nb-card', 'Basic form').then(secondform => {
                const emailLableSecondForm = secondform.find('[for="exampleInputEmail1"]').text();
                const passwordLabelSecondForm = secondform.find('[for="exampleInputPassword1"]').text();

                // expect(emailLableSecondForm).to.equal(emailLable);
                expect(passwordLabelSecondForm).to.equal(passwordLabel);

                cy.wrap(secondform).find('[for="exampleInputPassword1"]').should('contain', 'Password');
            })
        })


    })

    it.only("Invoke Command", () => {
        cy.visit("/");
        cy.contains("Forms").click();
        cy.contains("Form Layouts").click();

        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
        .should('have.class','label').and('have.text','Email address');


        cy.get('[for="exampleInputEmail1"]').then(label=>{
            expect(label).to.have.class('label');
            expect(label).to.have.text('Email address');
        })

        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address');
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain','checked');
            .then(classValue => {
                expect(classValue).to.contain('checked');
            })
    })

    it("datepicker example assert property", () => {
        cy.visit("/");
        cy.contains("Forms").click();
        cy.contains("Datepicker").click();

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click();
            cy.get('nb-calendar-picker').contains('17').click();
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Sep 17, 2022');
        })

    })

    it("Radio Buttons", () => {
        cy.visit("/");
        cy.contains("Forms").click();
        cy.contains("Form Layouts").click();

        cy.contains('nb-card', 'Using the Grid')
            .find('[type="radio"]')
            .then(radioButtons => {
                cy.wrap(radioButtons)
                    .first()
                    .check({ force: true })
                    .should('be.checked');

                cy.wrap(radioButtons)
                    .eq(1)
                    .check({ force: true })

                cy.wrap(radioButtons)
                    .first()
                    .should('not.be.checked');

                cy.wrap(radioButtons)
                    .eq(2)
                    .should('be.disabled');
            })
    })

    it("Checkboxes", () => {
        cy.visit("/");
        cy.contains("Modal & Overlays").click();
        cy.contains("Toastr").click();

        cy.get('[type="checkbox"]').check({ force: true });  // Only check checkbox
        cy.get('[type="checkbox"]').eq(0).click({ force: true }); // Check uncheck checkbox

    })

    it("Lists and dropdowns", () => {
        cy.visit("/");

        // cy.get('nav nb-select').click();
        // cy.get('.options-list').contains('Dark').click();
        // cy.get('nav nb-select').should('contain', 'Dark');
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');

        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.options-list nb-option').each((listItem, index) => {

                const itemText = listItem.text().trim();

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)",
                }

                cy.wrap(listItem).click();
                cy.wrap(dropdown).should('contain', itemText);
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText]);

                if (index < 3) {
                    cy.wrap(dropdown).click();
                }
            })
        })
    })

    it("Web Tables", () => {
        cy.visit("/");
        cy.contains("Tables & Data").click();
        cy.contains("Smart Table").click();

        //1 
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25');
        })

        //2 

        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Sangram');
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Haladkar');
            cy.wrap(tableRow).find('[placeholder="Username"]').type('SHaladkar');
            cy.wrap(tableRow).find('[placeholder="E-mail"]').type('sHaladkar@globant.com');
            cy.wrap(tableRow).find('[placeholder="Age"]').type('30');
            cy.wrap(tableRow).find('[placeholder="ID"]').type('2629');
            cy.wrap(tableRow).find('.nb-checkmark').click();
        });

        // cy.get('tbody tr').first().then
        cy.get('tbody').find('tr').eq(0).then(newlyAddedData => {

            cy.wrap(newlyAddedData).find('td').eq(2).should('contain', 'Sangram');
            cy.wrap(newlyAddedData).find('td').eq(3).should('contain', 'Haladkar');

        })

        //3

        const age = [20, 30, 40, 200];
        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age);
            cy.wait(500);
            cy.get('tbody tr').each(tableRow => {
                if (age == 200) {
                    cy.wrap(tableRow).find('td').should('contain', 'No data found');
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age);
                }
            })
        });
    })

    it('Web Datepickers', () => {
        cy.visit("/");
        cy.contains("Forms").click();
        cy.contains("Datepicker").click();

        let date = new Date();
        date.setDate(date.getDate() + 2);
        let futureDay = date.getDay();
        let futureMonth = date.toLocaleString('default', { month: 'short' });

        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {

        });

    })


    it('Popups and overlays', () => {
        cy.visit("/");
        cy.contains("Modal & Overlays").click();
        cy.contains("Tooltip").click();

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click();

        cy.get('nb-tooltip').find('div').find('span').should('contain', 'This is a tooltip');
    })

    it('Dialogs', () => { 
        cy.visit("/");
        cy.contains("Tables & Data").click();
        cy.contains("Smart Table").click();

        //1
        // cy.get('tbody tr').first().find('.nb-trash').click();
        // cy.on('window:confirm',(confirm)=>{

        //     expect(confirm).to.equal('Are you sure you want to delete?');
        // })

        const stub = cy.stub()
        cy.on('window:confirm',stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');

        })
    })


})

