import { onFormLayoutsPage } from "../support/page_object/formsLayoutPage";
import { navigateTo } from "../support/page_object/navigatioPage";
import { onSmartTablePage } from "../support/page_object/smartTablePage";

describe("Test with Page objects", () => {


    beforeEach('Open application', () => {
        cy.visit("/");
    });


    it("Verify Navigation", { browser: '!chrome' }, () => {
        navigateTo.formLayoutsPage();
        navigateTo.datePickerPage();
        navigateTo.smartTablePage();
        navigateTo.toasterPage();
        navigateTo.tooltipPage();
    });

    it('Should submit Inline and Basic form and select tomorrow date in the calender', () => {

        navigateTo.formLayoutsPage();
        onFormLayoutsPage.submitOnlineFormWithNameAndEmail("test", "test@gmail.com");
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@gmail.com', 'password');

        navigateTo.datePickerPage();

        navigateTo.smartTablePage();
        onSmartTablePage.updateAgeByFirstName('Larry', 27);
        onSmartTablePage.addNewRecordWithFirstNameAndLastName('Sangram', 'Haladkar');
        onSmartTablePage.deleteRowByIndex(0);
    })

})