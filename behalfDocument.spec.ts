import { test, expect, Page, BrowserContext } from '@playwright/test';
import { SignInPage } from '../../test_helper/pages/signInPage';
import { baseUrl, documentUrl } from '../../test_helper/urls';
import { BehalfDocumentHelper } from '../../test_helper/pages/behalfDocumentHelper';
import { TeamsDocumentHelper } from '../../test_helper/pages/TeamsDocumentHelper';
import { ConfigureFieldsPage } from "../../test_helper/pages/configureFieldsPage";
import { MethodsPage } from "../../test_helper/pages/methodsPage";
import { NavigatetoCreateDocumentPage } from "../../test_helper/pages/navigatetocreateNewDocumentPage";


test.describe('Behalf Document module', () => {
    let methodsPage: MethodsPage;
    let configureFieldsPage: ConfigureFieldsPage;
    let context: BrowserContext;
    let page: Page;
    let signInPage: SignInPage;
    let teamsDocumentHelper: TeamsDocumentHelper;
    let behalfDocumentHelper: BehalfDocumentHelper;
    let createDocument: NavigatetoCreateDocumentPage;
    let upload: string;

test.beforeAll(async ({ browser }) => {
    upload = documentUrl;
    context = await browser.newContext();
    page = await context.newPage();
    signInPage = new SignInPage(page);
    methodsPage = new MethodsPage(page);
    configureFieldsPage = new ConfigureFieldsPage(page);
    teamsDocumentHelper = new TeamsDocumentHelper(page);
    behalfDocumentHelper = new BehalfDocumentHelper(page);
    await signInPage.login(
        'simonmadebao+1@syncfusion.com', 'FranceParis@#123', 'Simon');
    await page.waitForLoadState('networkidle');
        createDocument = new NavigatetoCreateDocumentPage(page);
});

test.afterAll(async () => {
    await page.close();
});

test.beforeEach(async () => {
    await behalfDocumentHelper.navigateToBehalfDocument();
    test.info().annotations
    .push({ type: 'Website link', description: baseUrl });
});

test(' Verify Search Behalf Document', async () =>{
    await behalfDocumentHelper.SearchBehalfDocument();
});

test(
    'Verify Pin To Dashboard Without Entering Widget Name'
    , async () => {
    await behalfDocumentHelper
    .PinToDashboardWithoutEnteringWidgetName();
});

test('Verify Pin To Dashboard', async () => {
    await behalfDocumentHelper.PinToDashboard();
});

test('Verify Delete Pin To Dashboard', async () => {
    await behalfDocumentHelper.DeletePinToDashboard();
});

test('Verify On Behalf Of Button', async () => {
    await behalfDocumentHelper.OnBehalfOfButton();
});

test('Verify All filter button', async () => {
    await behalfDocumentHelper.Allfilter();
});

test('Verify Waiting For Me filter button', async () => {
    await behalfDocumentHelper.WaitingForMe();
});

      
test('Verify Waiting For Others filter', async () => {
    await behalfDocumentHelper.WaitingForOthers();
});

test('Verify Need Attention filter', async () => {
    await behalfDocumentHelper.NeedAttentionFilter();
});

test('Verify Completed filter', async () => {
    await behalfDocumentHelper.CompletedFilter();
});

test('Verify Declined filter', async () => {
    await behalfDocumentHelper.DeclinedFilter();
});

test('Expired filter', async () => {
    await behalfDocumentHelper.ExpiredFilter();
});

test('Verify Revoked filter', async () => {
    await behalfDocumentHelper.RevokedFilter();
});

test('Verify Waiting for me Sign Document', async () => {
    await behalfDocumentHelper.SignDocument();
});

test('Verify Copy Document ID to Clipboard', async () => {
    await behalfDocumentHelper.CopyDocumentID();
});

test ('Verify Add Tags', async () => {
    await behalfDocumentHelper.AddTags();
});

test('Verify Manage Tags', async () => {
    await behalfDocumentHelper.ManageTags();
});

test ('Verify Edit Expiry date', async () => {
    await behalfDocumentHelper.EditExpiryDate();
});

test('Verify Remind now', async () => {
    await behalfDocumentHelper.Remindnow();
});

test('Verify Send reminder button', async () => {
    await behalfDocumentHelper.Sendreminderbutton();
});

test('Verify Document History', async () => {
    await behalfDocumentHelper.DocumentHistory();
});

test('Verify View Document', async () => {
    await behalfDocumentHelper.ViewDocument();
});

test('Verify Re-Assign With Empty Dialogue', async () => {
    await behalfDocumentHelper.ReassignWithEmptyDialogue();
});

test('Verify Re-Assign', async () => {
    await behalfDocumentHelper.Reassign();
});

test('Verify Decline with Empty Dialogue', async () => {
    await behalfDocumentHelper.DeclinewithEmptyDialogue();
});

test('Verify Decline button', async () => {
    await behalfDocumentHelper.Decline();
});

test('Verify Revoke with Empty Dialogue', async () => {
    await behalfDocumentHelper.RevokewithEmptyDialogue();
});

test('Verify Revoke button', async () => {
    await behalfDocumentHelper.Revoke();
});

test('Verify Download document', async () => {
    await behalfDocumentHelper.Downloaddocument();
  });

test('Verify Export form data', async () => {
    await behalfDocumentHelper.Exportformdata();
});

test('Verify Send reminder', async () => {
    await behalfDocumentHelper.Sendreminder();
});

test('Verify Edit recipient', async () => {
    await behalfDocumentHelper.EditRecipient();
});

test('Verify Add Authentication Access Code', async () => {
    await behalfDocumentHelper.AccessCode();
});

test('Verify Autogenerate Authentication Code', async () => {
    await behalfDocumentHelper.AutogenerateAuthentication();
});

test('Verify Change Manually Authentication Code', async () => {
    await behalfDocumentHelper.ChangeManuallyAuthentication();
});

test('Verify Email access code', async () => {
    await behalfDocumentHelper.Emailaccesscode();
});

test('Verify Remove Authentication', async () => {
    await behalfDocumentHelper.RemoveAuthentication();
});

test('Verify Email verification', async () => {
    await behalfDocumentHelper.Emailverification();
});

test('Verify Remove Email OTP', async () => {
    await behalfDocumentHelper.RemoveEmailOTP();
});

test('Verify SMS OTP', async () => {
    await behalfDocumentHelper.SMSOTP();
});

test('Verify Edit phone number', async () => {
    await behalfDocumentHelper.Editphonenumber();
});

test('Verify Remove SMS OTP', async () => {
    await behalfDocumentHelper.RemoveSMSOTP();
});
});