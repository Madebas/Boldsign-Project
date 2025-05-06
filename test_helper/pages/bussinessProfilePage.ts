import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { baseUrl, businessProfileUrl } from '../urls';

export class BusinessProfilePage {
  constructor(private page: Page) { }


  async Navigatetobusinessprofile() {
    await this.page.goto(baseUrl + businessProfileUrl);
    await this.page.waitForLoadState('networkidle');
    const pagetitle = await this.page.title();
    await expect(pagetitle).toBe('Business Profile - Settings - BoldSign');
  }
  // Helper function to select dropdown options
  async selectDropdownOption(optionName: string) {
    await this.page.getByLabel('select', { exact: true }).click();
    await this.page.waitForLoadState('networkidle');
    await this.page.locator("//span[@aria-label='select']").click();
  }

  // Helper function to interact with pagination
  async interactWithPagination(title: string, times: number) {
    for (let i = 0; i < times; i++) {
      await this.page.getByTitle(title).click();
    }
  }

  // Helper function to select custom date range
  async selectDate() {
    await this.page.waitForLoadState('networkidle');
    await this.page.getByLabel('select', { exact: true }).click();
    await this.page.getByRole('option', { name: 'Last 30 days' }).click();
  }

  // Helper function to select categories
  async selectCategories(categories: string[]) {
    await this.page.locator("(//*[@class='e-multi-select-wrapper e-down-icon'])[2]").click();
    for (const category of categories) {
      await this.page.getByRole('option', { name: category }).locator('span').nth(1).click();
    }
  }

  async enterValidIPAddress() {
    await this.page.getByRole('textbox', { name: 'Enter Start IP address' }).clear();
    await this.page.getByRole('textbox', { name: 'Enter Start IP address' }).fill('223.178.85.185');
    await this.page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(this.page.getByText('Saved changes successfully')).toBeVisible();
  }

  async clearFields() {
    const profileDetails = [{ selector: '#companyName' }, { selector: '#streetAddress' }, { selector: '#city' },
    { selector: '#state' }, { selector: '#pinCode' }, { selector: '#country' }, { selector: '#phone' }];
    for (const field of profileDetails) {
      await this.Clearfield(field.selector);
    }
  }

  // Helper function to export activity log to CSV
  async exportToCSV() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('button', { name: ' Export To CSV' }).click();
    const download = await downloadPromise;
    await expect(this.page.getByText('The CSV has been downloaded successfully.')).toBeVisible();
    await this.page.waitForLoadState('networkidle');
  }

  // Helper function to select actions
  async selectActions(actions: string[]) {
    await this.page.waitForSelector('(//div[@class="e-multi-select-wrapper e-down-icon"])[3]');
    const select = await this.page.locator("(//div[@class='e-multi-select-wrapper e-down-icon'])[3]");
    await select.waitFor({ state: 'visible' });
    await select.click();
      for (const action of actions) {
        await this.page.getByRole('option', { name: action, exact: true }).locator('span').nth(1).click();
      }
  }

  // Helper function to select users
  async selectUsers(users: string[]) {
    await this.page.locator("(//*[@class='e-multi-select-wrapper e-down-icon'])[4]").click();
    await this.page.locator("(//span[@class='e-frame e-icons'])[2]").click();
    await this.page.locator("(//*[@class='e-multi-select-wrapper e-down-icon'])[4]").click();
  }
  async fillProfileDetails() {
    const profileDetails = [{ selector: '#companyName', value: 'Syncfusion' }, { selector: '#streetAddress', value: '456 Elm Street' }, { selector: '#city', value: 'San Francisco' },
    { selector: '#state', value: 'California' }, { selector: '#pinCode', value: '94103' }, { selector: '#country', value: 'United States' }, { selector: '#phone', value: '+1 (415) 555-1234' }];
    for (const field of profileDetails) { await this.fillInputField(field.selector, field.value); }
  }

  async VerifyProfileDetails() {
    const profileDetails = [{ selector: '#companyName', value: 'Syncfusion' }, { selector: '#streetAddress', value: '456 Elm Street' }, { selector: '#city', value: 'San Francisco' },
    { selector: '#state', value: 'California' }, { selector: '#pinCode', value: '94103' }, { selector: '#country', value: 'United States' }, { selector: '#phone', value: '+1 (415) 555-1234' }];
    for (const field of profileDetails) { await this.verifyFieldValue(field.selector, field.value); }
  }
  async documenttoggleswitch() {
    const toggleSwitches = [
      'div:nth-child(2) > .bs-expire-option-container > .e-switch-wrapper > .e-switch-handle',
      'div:nth-child(15) > .bs-expire-option-container > .e-switch-wrapper > .e-switch-handle',
      'div:nth-child(16) > .bs-expire-option-container > .e-switch-wrapper > .e-switch-handle',
      'div:nth-child(11) > .bs-expire-option-container > .e-switch-wrapper > .e-switch-handle',
      'div:nth-child(17) > .bs-expire-option-container > .e-switch-wrapper > .e-switch-handle',
      'div:nth-child(18) > .bs-expire-option-container > .e-switch-wrapper > .e-switch-handle'];
    for (const toggle of toggleSwitches) {
      await this.toggleSwitch(this.page, toggle, 'on');
    }
  }

  async selectvalues() {
    const dropdownSelections = [
      { label: 'Document watermark', value: 'The consent dialog will not' },
      { label: 'Document type', value: 'Individual' },
      { label: 'Expiry duration', value: 'Hours' },
      { label: 'Reminder frequency', value: 'Specific Date and Time' },
    ];
    for (const { label, value } of dropdownSelections) {
      await this.selectFromListbox(this.page, label, value);
    }
  }

  async incrementdecrement() {
    const incrementDecrementActions = [
      { selector: "(//span[@title='Increment value'])[5]", action: 'increment' },
      { selector: "(//span[@title='Decrement value'])[5]", action: 'decrement' },
      { selector: "(//span[@title='Increment value'])[6]", action: 'increment' },
      { selector: "(//span[@title='Decrement value'])[6]", action: 'decrement' },
      { selector: "(//span[@title='Increment value'])[1]", action: 'increment' },
      { selector: "(//span[@title='Decrement value'])[1]", action: 'decrement' },
    ];
    for (const { selector, action } of incrementDecrementActions) {
      await this.page.locator(selector).click();
    }
  }
  // Helper method to handle repeated actions for notification checkboxes
  static async toggleNotification(page: Page, notificationText: string, checkboxText: string) {
    // Locate the notification section more precisely
    const notificationSection = page.locator('div.notification-section'); // Adjust this selector as needed
    const notificationItem = notificationSection.locator('div').filter({ hasText: notificationText });//+
    const checkbox = page.getByRole('checkbox', { name: checkboxText }).first();
  };

  async notifications() {
    const notificationPairs = [
      ['Receive a document to sign or approve', 'Sender revokes the document'],
      ['A recipient declines to sign or approve the document', 'Document has been completed'],
      ['A recipient reassigns the document', 'Document has expired'],
      ['A recipient has signed the document', 'Sender deleted the document'],
      ['Reminders of the document', 'Document has been edited'],
      ['Changing the recipient', 'Document has expired'],
      ['New signing request has been sent out', 'Document has been edited'],
      ['Recipient declines to sign or approve the document', 'Document has expired'],
      ['Recipient reassigns the document', 'Sender deleted the document'],
      ['Recipient signs a document', 'Document has been completed'],
    ];
    // Toggle notifications using the helper method
    for (const [notification1, notification2] of notificationPairs) {
      await BusinessProfilePage.toggleNotification(this.page, notification1, notification2);
    }
  }
  // Helper function to fill an input field
  async fillInputField(selector: string, value: string) {
    await this.page.locator(selector).click();
    await this.page.locator(selector).fill(value);
  }

  async Clearfield(selector: string) {
    await this.page.locator(selector).click();
    await this.page.locator(selector).clear();
  }

  // Helper function to verify the value of an input field
  async verifyFieldValue(selector: string, expectedValue: string) {
    await expect(this.page.locator(selector)).toHaveValue(expectedValue);
  }

  // Reusable method to select an option from a listbox with a unique identifier
  async selectFromListbox(page: Page, listboxName: string, optionName: string, exact: boolean = false) {
    const listbox = page.locator(`role=listbox[name="${listboxName}"]`).first();
  }

  // Method to click on a specific listbox item when there are multiple matches
  async selectSpecificListboxItem(page: Page, listboxName: string, optionName: string, itemIndex: number) {
    const listbox = page.locator(`role=listbox[name="${listboxName}"]`).first();
    const options = listbox.locator('role=option');
  }

  // Reusable method to toggle a switch
  async toggleSwitch(page: Page, selector: string, state: 'on' | 'off') {
    const switchHandle = page.locator(selector).first();
    const isOn = await switchHandle.evaluate(el => el.classList.contains('e-switch-handle'));

    if ((state === 'on' && !isOn) || (state === 'off' && isOn)) {
    }
  }

  // Reusable method to set text in a placeholder input
  async fillPlaceholder(page: Page, placeholder: string, text: string) {
  }

  async businessprofile() {
    await this.page.goto(baseUrl + businessProfileUrl);
  }
}