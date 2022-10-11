
describe("Visual Testing demo", () => {
    it("firstTest Visual Testing", () => {
        cy.visit("/");
        cy.contains("Forms").click();
        cy.contains("Form Layouts").click();

        cy.contains('nb-card', 'Using the Grid').then(form => {

            cy.wait(1000);
            cy.percySnapshot('FormLayout');
        });
    });
})