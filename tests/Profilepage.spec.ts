import { test, expect, Page, BrowserContext } from '@playwright/test';
import { SignInPage } from '../test_helper/pages/signInPage';
import { ProfilePage } from '../test_helper/pages/ProfilePage';

let page: Page;
let profilepage: ProfilePage;
let signIn: SignInPage;

test.describe('my profile page', async () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    profilepage = new ProfilePage(page);
    signIn = new SignInPage(page);
    await signIn.login('dhilipkumarrajasekaran@syncfusion.com', 'Dhilip1!', 'Dhilip');
  });

  // Holding the Change email validation case due to not getting OTP in manual 

  test('Field validation', async () => {
    await profilepage.fieldValidation();
  });

  test('Update profile details', async () => {
    await profilepage.updateProfileDetails();
  });

  test('Authenticator app validation', async () => {
    await profilepage.authenticator_Validation();
  });

  test('Password change', async () => {
    await profilepage.passwordChange();
  });

  test('Invalid old password', async () => {
    await profilepage.invalidOldPassword();
  });

  test('Leave all the password fields', async () => {
    await profilepage.emptypasswords();
  });

  test('New password in old password field', async () => {
    await profilepage.newoldpassword();
  });

  test('Mismatch password', async () => {
    await profilepage.mismatchpassword();
  });

  test('Leave the email field', async () => {
    await profilepage.emptyemail();
  });

  test('Leave the phone field', async () => {
    await profilepage.emptyphone();
  });

  test('Enter the invalid phone number', async () => {
    await profilepage.invalidphone();
  });

  test('Edit the signature', async () => {
    await profilepage.editSignature();
  });

  test('Edit the Initials', async () => {
    await profilepage.editInitials();
  });

  test('Settings - verify settings page', async () => {
    await profilepage.verifySettings();
  });

  test('Notification - Verify disabling and enabling options', async () => {
    await profilepage.verifynotification();
  });

  test.afterAll(async () => {
    await page.close();
  });

});

