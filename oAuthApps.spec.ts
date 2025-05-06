import { test, expect, Page, BrowserContext } from '@playwright/test';
import { SignInPage } from '../../test_helper/pages/signInPage';
import { baseUrl, documentUrl } from '../../test_helper/urls';
import { OAuthAppsHelper } from '../../test_helper/pages/oAuthAppsHelper';

test.describe('OAuthApps module', () => {
    let OAuthApps: OAuthAppsHelper;
    let context: BrowserContext;
    let page: Page;
    let signInPage: SignInPage;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    signInPage = new SignInPage(page);
    OAuthApps = new OAuthAppsHelper(page);

    await signInPage.login(
        'simonmadebao+1@syncfusion.com', 'FranceParis@#123', 'Simon');
    await page.waitForLoadState('networkidle');
});

test.afterAll(async () => {
    await page.close();
});

test.beforeEach(async () => {
    await OAuthApps.navigateToOAuthApps();
    test.info().annotations.push({ 
        type: 'Website link', 
        description: baseUrl 
    });
});

test('Verify Create Your First App', async () => {
    await OAuthApps.CreateYourFirstApp();
});

test('Verify Create App With Special Case Initials', async () => {
    await OAuthApps.CreateAppWithNoName();
});
    
test('Verify Create OAuth App', async () => {
    await OAuthApps.CreateOAuthApp();
});

test('Verify View App Details', async () => {
    await OAuthApps.ViewAppDetails();
});

test('Verify Delete App', async () => {
    await OAuthApps.DeleteApp();
});

test('Verify Edit Application', async () => {
    await OAuthApps.EditApplication();
});

test('Verify Add Description to App Details', async () => {
    await OAuthApps.AddDescription();
});

test('Verify Add Invalid URL to App Details', async () => {
    await OAuthApps.AddInvalidURL();
});

test('Verify Add Valid URL to App Details', async () => {
    await OAuthApps.AddValidURL();
});

test('Verify Open the URL In App Details', async () => {
    await OAuthApps.OpentheURLInAppDetails();
});

test('Verify Add more than one Valid URL to App Details', async () => {
    await OAuthApps.AddmorethanoneValidURL();
});

test('Verify Delete Added URL', async () => {
    await OAuthApps.DeleteAddedURL();
});

test('Verify Refresh Token Expiration Mode to sliding', async () => {
    await OAuthApps.RefreshTokenExpirationModeSliding();
});

test('Verify Refresh Token Expiration Mode to Absolute', async () => {
    await OAuthApps.RefreshTokenExpirationModeAbsolute();
});

test('Verify Copy Client ID', async () => {
    await OAuthApps.CopyClientID();
});

test('Verify create New Client Secret With Special Cases', async () => {
    await OAuthApps.NewClientSecretWithSpecialCases();
});

test('Verify create New Client Secret', async () => {
    await OAuthApps.NewClientSecret();
});

test('Verify Enable Client Secret Validity', async () => {
    await OAuthApps.EnableClientSecretValidity();
});

test('Verify Delete Client Screat Key', async () => {
    await OAuthApps.DeleteClientScreatKey();
});

test('Verify Create App and Enable Implicit Flow', async () => {
    await OAuthApps.CreateAppAndEnableImplicitFlow();
});

test('Verify Create an App with Client Secret Validity', async () => {
    await OAuthApps.CreateAppWithClientSecretValidity();
});

test('Verify Create App and change Billing Options to Charge my Account', async () => {
    await OAuthApps.ChangeBillingOptionsToChargeMyAccount();
});
});
