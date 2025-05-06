import { test, expect, Page, BrowserContext, selectors } from '@playwright/test';
import { SignInPage } from '../test_helper/pages/signInPage';
import { BusinessProfilePage } from '../test_helper/pages/bussinessProfilePage';

let context: BrowserContext;
let page: Page;
let businessProfile: BusinessProfilePage;
let signIn: SignInPage;


test.describe('verify settings page', () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    businessProfile = new BusinessProfilePage(page);
    signIn = new SignInPage(page);
    await signIn.login('dhilipkumarrajasekaran@syncfusion.com', 'Dhilip1!', 'Dhilip');
  });

  test('Settings tab - verify setting page', async () => {
    await page.waitForLoadState('networkidle');
    await businessProfile.Navigatetobusinessprofile();
  });

  test('Settings tab - Verify Date and Time Settings', async () => {
    await businessProfile.selectFromListbox(page, 'Date format', 'dd MMM, yyyy');
    await page.locator('div:nth-child(3) > .dateAndTime-format > .e-input-group > .e-input-group-icon').first().click();
    await businessProfile.selectSpecificListboxItem(page, 'Time format', 'hh:mm tt', 0); // Use specific index to avoid ambiguity
    await businessProfile.selectFromListbox(page, 'Timezone', '(UTC+02:00) Eastern European Time ( Africa/Cairo )');
  });

  test('Settings tab - Verify Custom Domain settings validations', async () => {
    const fromNameField = page.getByPlaceholder('notification');
    const domainNameField = page.getByPlaceholder('mail.cubeflakes.com');
    const requiredFieldError = "//div[text()='This field is required.']";
    const invalidNameError = "//div[text()='Invalid from name.']";
    const invalidDomainError = "//div[text()='Invalid domain']";
    // Step 1: Validate required field error messages
    await fromNameField.clear();
    await domainNameField.clear();
    await expect(page.locator(requiredFieldError)).toHaveCount(2);
    await fromNameField.fill('!#!$!$');
    await domainNameField.fill('name');
    await expect(page.locator(invalidNameError)).toContainText('Invalid from name.');
    await expect(page.locator(invalidDomainError)).toContainText('Invalid domain');
    await fromNameField.fill('notification');
    await domainNameField.fill('mail.syncfusion.com');
  });


  test('Settings tab - Verify Signature Settings', async () => {
    await page.locator('#signatureType div').filter({ hasText: 'Select All' }).click();
    await page.locator('div').filter({ hasText: /^Text$/ }).click();
    await businessProfile.selectFromListbox(page, 'Signature type', 'Draw');
    await businessProfile.toggleSwitch(page, '//*[@id="signatureType"]/div[6]/div/div/div[1]/div/span[2]', 'on');
    // Verify Disabling Signature Settings
    await page.locator('li').filter({ hasText: 'Text' }).locator('div').click();
    await businessProfile.toggleSwitch(page, '#signatureType >div.bs-field-header>.bs-expire-option-container >.e-switch-wrapper >.e-switch-handle', 'off');
    await expect(page.getByText('Signature Settings Signature')).toBeVisible();
  });


  test('Settings tab - Date Field and User Settings Verification', async () => {
    await businessProfile.selectSpecificListboxItem(page, 'Time format', 'hh:mm tt', 0);

    // User Settings Verification
    await page.locator('#settings_tabview div').filter({ hasText: 'User Settings Restrict users' }).locator('span').nth(3).click();
    await page.getByRole('button', { name: 'Add IP Range' }).click();
    await page.locator('#ipCloseIcon').first().click();

    // Enter Invalid IP address
    await businessProfile.fillPlaceholder(page, 'Enter Start IP address', '1234');
    await businessProfile.fillPlaceholder(page, 'Enter End IP address (', '1234');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText('Invalid IP address')).toBeVisible();

     // Enter Valid IP address
     await businessProfile.enterValidIPAddress();

    // Edit with not allowed IP address
    await page.getByRole('button', { name: 'Edit IP Range' }).click();
    await page.getByRole('textbox', { name: 'Enter Start IP address' }).fill('223.178.86.228');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Settings cannot be saved because your current IP address is not in the allowed list.')).toBeVisible();
    await page.locator('#ipCloseIcon').first().click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    
  });

  test('Settings tab - Document Settings Verification', async () => {
    // Enable or toggle switches
    await businessProfile.documenttoggleswitch();
    // Select values from dropdown lists
    await businessProfile.selectvalues();
    // Verify the visibility of Document Settings
    await expect(page.getByText('Document Settings')).toBeVisible();
    // Adjust increment and decrement values
    await businessProfile.incrementdecrement();
    await page.getByRole('button', { name: 'Save Changes' }).click();
  });

  test('Profile details tab - Verify Profile Details Page', async () => {
    await page.waitForLoadState('networkidle');
    await page.getByText('Profile Details', { exact: true }).click();
    // Profile details to be filled
    await businessProfile.fillProfileDetails();
    await businessProfile.VerifyProfileDetails();
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await businessProfile.clearFields();
    await page.getByRole('button', { name: 'Save Changes' }).click();
  });

  test('Activity Log - Verify pagination', async () => {
    await page.getByText('Activity Log', { exact: true }).click();
    await businessProfile.interactWithPagination('Next Page', 13);
    await businessProfile.interactWithPagination('Previous Page', 13);
    await expect(page.locator('#user_activity_grid')).toBeVisible();
  });


  test('Activity Log - Verify Selecting Date Ranges', async () => {
    const dateRanges = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days'];
    for (const range of dateRanges) {
      await businessProfile.selectDropdownOption(range);
    }
    await expect(page.locator('#user_activity_grid')).toBeVisible();
  });

  test('Activity Log -View the detail content ', async () => {
    await page.locator("(//div[text()='View'])[3]").click();
    await page.getByRole('button', { name: 'Close' }).click();
  });

  test('Activity Log -View Custom Range selection ', async () => {
    await businessProfile.selectDate();
    await expect(page.locator('#tab-element div').filter({ hasText: 'Date and Time Settings Date' }).first()).toBeVisible();
  })

  test('Activity Log - Selecting and exporting categories', async () => {
    await businessProfile.selectCategories([
      'Account', 'API Key', 'Branding', 'Bulk Links', 'Business Profile', 'Contacts',
      'Custom Permissions', 'Documents', 'OAuth Apps', 'Sender Identities', 'Teams',
      'Templates', 'Users', 'Webhooks'
    ]);
  });

  test('Activity Log - Select actions and users', async () => {
    await page.getByText('Business Profile Cancel Save').click();
    // Select users
    await businessProfile.selectUsers([
      'Dhilip Raj dhilipkumar.rajasekaran+1@syncfusion.com', 'Dhilip Kumar  dhilipkumarrajasekaran@syncfusion.com']);
      await businessProfile.exportToCSV();
      await businessProfile.selectActions([
        'Authentication Added', 'Authentication Failed', 'Authentication Removed', 'Completed',
        'Declined', 'Deleted', 'Downloaded', 'Expired', 'Modified', 'Reassigned', 'Restored',
        'Revoked', 'Sent', 'Created', 'Shared', 'Activated', 'Deactivated',
        'Exported to CSV', 'Cancelled Account Deletion', 'Initiated Account Deletion',
        'Added', 'Cancelled', 'Resent', 'Login', 'Two Factor Authentication Added',
        'Two Factor Authentication Modified', 'Two Factor Authentication Removed', 'Re-requested'
      ]);
  });

  test('Notification tab - Verify Notification Page', async () => {
    await page.getByText('Notifications', { exact: true }).click();
    // Define all notification pairs to toggle
    await businessProfile.notifications();
    await expect(page.getByText('Recipient Notifications As a')).toBeVisible();
  });

  test.afterAll(async () => {
    await context.close();
  });
});
