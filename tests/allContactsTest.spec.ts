import { test, Page, BrowserContext } from '@playwright/test';
import { SignInPage } from '../test_helper/pages/signInPage.ts';
import { baseUrl } from '../test_helper/urls.ts';
import { AllContactsHelper } from '../test_helper/pages/allContactsHelper.ts';

test.describe('All Contacts Page Test', () => {
    let context: BrowserContext;
    let page: Page;
    let signInPage: SignInPage;
    let allContactsHelper: AllContactsHelper;  
 
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext({});
        page = await context.newPage();
        signInPage = new SignInPage(page);
        allContactsHelper = new AllContactsHelper(page);
        await signInPage.login('sosimomanyio@syncfusion.com', 'Sosiokari.1996', 'Sosi'); 
   });

   test.afterAll(async () => {
    await page.close();
});

   test('Verify copy contact id', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle'); 
    await allContactsHelper.copyContactId();
});

test('Verify delete contacts', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle'); 
    await allContactsHelper.deleteContact();
});

test('Verify search contacts', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle'); 
    await allContactsHelper.searchContacts();
});

test('Verify copy contact id for contacts group', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await allContactsHelper.copyContactIdContactGroups();
});

test('Verify delete contacts group', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await allContactsHelper.deleteContactGroups();
});

test('Verify delete multiple contact', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await allContactsHelper.deleteMultipleContacts();
});

});
