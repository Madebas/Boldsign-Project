import { test, Page, BrowserContext } from '@playwright/test';
import { SignInPage } from '../test_helper/pages/signInPage.ts';
import { baseUrl } from '../test_helper/urls.ts';
import { ContactsHelper } from '../test_helper/pages/myContactsHelper.ts';

test.describe('My Contacts Page Test', () => {
    let context: BrowserContext;
    let page: Page;
    let signInPage: SignInPage;
    let contactsHelper: ContactsHelper;  
 
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({});
        page = await context.newPage();
        signInPage = new SignInPage(page);
        contactsHelper = new ContactsHelper(page);
        await signInPage.login('sosimomanyio@syncfusion.com', 'Sosiokari.1996', 'Sosi'); 
   });

test('Verify the create new contact', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle'); 
    await contactsHelper.createNewContact();
});

test('Verify delete contact option', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.deleteContact();
});

test('Verify empty contact name when adding new contact', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle'); 
    await contactsHelper.emptyContactName();
});

test('Verify empty email address when adding new contact', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.emptyEmail();
}); 

test('Verify adding new contact with invalid phone number', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.invalidPhoneNumber();
});

test('Verify adding contact with already existing email', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.contactWithExistingEmail();
});

test('Verify invalid email when adding new contact', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.invalidEmail();
});

test('Verify download sample CSV file', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle'); 
    await contactsHelper.downloadSampleCSVFile();
});

test('Verify import from CSV', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle'); 
    await contactsHelper.importFromCSV();
});

test('Verify edit contact', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle'); 
    await contactsHelper.editContact();
});

test('Verify edit contact with invalid phone number', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle'); 
    await contactsHelper.editInvalidPhone();
});

test('Verify edit contact with invalid Email', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle'); 
    await contactsHelper.editInvalidEmail();
});

test('Verify copy contact ID', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.copyContactId();
});

test('Verify add new contact group', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.addNewContactGroup();
});

test('Verify deleting contact group', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.deleteContactGroup();
});

test('Verify edit contact group', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.editContactGroup();
});

test('Verify copy contact id for contact group', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.copyContactIdforContactGroup();
});

test('Verify adding new contact group with empty name', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.emptyContactGroupName();
});

test('Verify adding contact group with existing group name', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.contactGroupWithExistingGroupName();
});

test('Verify searching contacts', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.searchContact();
});

test('Verify import from CSV for add new contact group', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.importFromCSVGroupContact();
});

test('Verify adding users to contact groups', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.addUsersToContactGroup();
});

test('Verify downloading sample CSV for contact groups', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.downloadSampleCSVContactGroup();
});

test('Verify empty name for contact groups', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.emptyNameForContactGroup();
});

test('Verify empty email for contact groups', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.emptyEmailForContactGroup();
});

test('Verify delete multiple contacts', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await contactsHelper.deleteMultipleContacts();
});

test.afterAll(async () => {
    await page.close();
});

});





























