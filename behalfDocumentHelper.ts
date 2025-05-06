import { expect, Page } from '@playwright/test';
import { baseUrl, behalfDocumentUrl, documentUrl, dashboardUrl} from '../urls';

export class BehalfDocumentHelper {
    constructor(public page: Page) {}

async navigateToBehalfDocument() {
    await this.page.goto(baseUrl+behalfDocumentUrl);
}

async SearchBehalfDocument() {
    await this.page.locator("(//*[@id='document-search'])").fill('Behalf document');
    await this.page.locator('.bs_document_search-icon-input').click();
    await expect(this.page.locator(
        "(//*[@class='document-search-result'])"
            ).filter({ hasText: '10 result(s) found' })).toBeVisible();
}

async PinToDashboardWithoutEnteringWidgetName() {
    await this.page.locator("(//*[@id='document-search'])").fill('Behalf document');
    await this.page.locator('.bs_document_search-icon-input').click();
    await this.page.locator('#pin_filter span').click();
    await this.page.getByRole('button', { name: 'Save & Pin' }).click();
    await expect(this.page.getByText('This field is required', { exact: true }))
        .toBeVisible();
}

async PinToDashboard() {
    await this.page.locator("(//*[@id='document-search'])").fill('Behalf document');
    await this.page.locator('.bs_document_search-icon-input').click();
    await this.page.locator('#pin_filter span').click();
    await this.page.getByRole('textbox', { name: 'Enter a name for the saved' }).fill('Behalf document');
    await this.page.getByRole('button', { name: 'Save & Pin' }).click();
    const toaster = await this.page.getByText('Successfully pinned the filter to the dashboard');
    await expect(toaster).toContainText('Successfully pinned the filter to the dashboard');
}

async DeletePinToDashboard() {
    await this.page.goto(baseUrl+dashboardUrl);
    await this.page.locator('.bs-link-menu-items').click();
    await this.page.getByRole('menuitem', { name: ' Delete filter' }).click();
    await this.page.getByRole('button', { name: 'Yes, delete' }).click();
    const toaster = await this.page.getByText('The selected filter has been deleted successfully');
    await expect(toaster).toContainText('The selected filter has been deleted successfully');
}

async OnBehalfOfButton() {
    await this.page.locator("(//*[@class='e-multi-select-wrapper e-down-icon'])[1]").first().click();
    await this.page.locator('.e-multi-select-wrapper').first().click();
    await this.page.getByText('Behalf-User selvarani.s+sdk2@').click();
    await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
}

async Allfilter() {
    await this.page.getByText('All', { exact: true }).click();
    await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
}

async WaitingForMe() {
    await this.page.getByRole('option', { name: 'Waiting for me' }).click();
    await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
}

async WaitingForMeButton() {
    await this.page.getByRole('option', { name: 'Waiting for me' }).click();
    await this.page.locator("(//*[@class='doc-title'])[1]").click();
}

async WaitingForOthers() {
    await this.page.getByRole('option', { name: 'Waiting for others' }).click();
    await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
}

async WaitingForOthersButton() {
    await this.page.getByRole('option', { name: 'Waiting for others' }).click();
    await this.page.locator("(//*[@class='doc-title'])[1]").click();
}

async NeedAttentionFilter() {
    await this.page.getByLabel('Needs attention', { exact: true }).getByText('Needs attention').click();
    await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
}

async NeedAttentionButton() {
    await this.page.getByLabel('Needs attention', { exact: true }).getByText('Needs attention').click();
    await this.page.locator("(//*[@class='doc-title'])[1]").click();
}

async CompletedFilter() {
    await this.page.getByLabel('Completed', { exact: true }).getByText('Completed').click();
    await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
}

async CompletedButton() {
    await this.page.getByLabel('Completed', { exact: true }).getByText('Completed').click();
    await this.page.locator("(//*[@class='doc-title'])[1]").click();
}

async DeclinedFilter() {
    await this.page.getByLabel('Declined', { exact: true }).getByText('Declined').click();
    await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
}

async DeclinedButton() {
    await this.page.getByLabel('Declined', { exact: true }).getByText('Declined').click();
    await this.page.locator("(//*[@class='doc-title'])[1]").click();
}

async ExpiredFilter() {
    await this.page.getByLabel('Expired', { exact: true }).getByText('Expired').click();
    await expect(this.page.locator('.document-head1')).toBeVisible();
}

async RevokedFilter() {
    await this.page.getByLabel('Revoked', { exact: true }).getByText('Revoked').click();
    await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
}

async SignDocument() {
    await this.WaitingForMeButton();
    await this.page.locator("(//*[@id='Sign document'])").click();  
}

async CopyDocumentID() {
    await this.WaitingForMeButton();
    await this.page.locator("//*[@data-id='overview-document-id']").first().hover();
    await this.page.locator("//*[@title='Copy to clipboard']").first().waitFor({ state: 'visible' });
    await this.page.locator('.bs-copy-icons').first().click();
    await this.page.locator("//*[@title='Copied']").isVisible();
}    

async AddTags() {
    await this.WaitingForMeButton();
    await this.page.getByText('Add Tag').click();
    await this.page.locator('tags').click();
    await this.page.locator('tags').getByRole('textbox').fill('Development,');
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Tag(s) updated successfully');
    await expect(toaster).toContainText('Tag(s) updated successfully');
}

async ManageTags() {
    await this.WaitingForMeButton();
    await this.page.getByText('Manage tags').click();
    await this.page.getByRole('button', { name: 'remove tag' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Tag(s) updated successfully');
    await expect(toaster).toContainText('Tag(s) updated successfully'); 
}

async EditExpiryDate() { 
    await this.WaitingForMeButton();
    await this.page.waitForLoadState('networkidle'); 
    await this.page.getByText('Edit', { exact: true }).click();
    await this.page.locator("(//*[@class='e-control e-datepicker e-lib e-input e-keyboard'])[1]").click();
    const existingDateValue = await this.page.locator(
     "(//*[@class='e-control e-datepicker e-lib e-input e-keyboard'])[1]").inputValue();
    const existingDate = new Date(existingDateValue);
    existingDate.setDate(existingDate.getDate() + 1);
    const formattedDate = (`0${existingDate.getMonth() + 1}`).slice(-2) + '-' + 
                          (`0${existingDate.getDate()}`).slice(-2) + '-' + 
                          existingDate.getFullYear();
    await this.page.locator("(//*[@class='e-control e-datepicker e-lib e-input e-keyboard'])[1]").fill(formattedDate);
    await this.page.locator("(//*[@class='e-control e-btn e-primary ml-2 w-24'])[1]").click();
    const toaster = await this.page.getByText('Successfully extended expiry date');
    await expect(toaster).toContainText('Successfully extended expiry date'); 
} 

async Remindnow() {
    await this.WaitingForOthersButton();
    const remindNowButton = await this.page.locator("(//*[@class='edit-button text-xs flex'])[1]");
    const isRemindNowVisible = await remindNowButton.isVisible();

    if (!isRemindNowVisible) {
        console.log("Remind Now option is not available, skipping this test case.");
        return;
    }
    await remindNowButton.click();
    await this.page.getByRole('button', { name: 'Remind now' }).click();
    const toaster = await this.page.getByText('Reminder sent', { exact: true });
    await expect(toaster).toContainText('Reminder sent');
}

async Sendreminderbutton() {
    await this.WaitingForOthersButton();
    const Sendreminder = await this.page.locator("(//*[@id='Send reminder'])");
    const isSendreminderVisible = await Sendreminder.isVisible();
    if (!isSendreminderVisible) {
        console.log("Remind Now option is not available, skipping this test case.");
        return;
    }
    await Sendreminder.click();
    await this.page.getByRole('button', { name: 'Remind now' }).click();
    const toaster = await this.page.getByText('Reminder sent', { exact: true });
    await expect(toaster).toContainText('Reminder sent');
}

async DocumentHistory() {
    await this.WaitingForMeButton();
    await this.page.getByText('Document History').click();
    const userActivityLocator = this.page.locator("(//*[@class='e-headertext'])[8]");
    await expect(userActivityLocator).toBeVisible();
    await expect(userActivityLocator).toHaveText('User Activity');
}

async ViewDocument() {
    await this.WaitingForOthersButton();
    await this.page.locator("(//*[@id='actiondropdown'])").click();
    await this.page.locator("(//*[@id='view'])").click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.page.locator("(//*[@id='documentName'])")).toBeVisible();
    const pagetitle = await this.page.title();
    await expect(pagetitle).toBe('Behalf document-10 - View Document - BoldSign');
}

async ReassignWithEmptyDialogue() {
    await this.WaitingForMeButton();
    await this.page.locator("(//*[@id='actiondropdown'])").click();
    await this.page.locator("(//*[@id='reassign'])").click();
    await this.page.getByRole('button', { name: 'Send' }).click();
    await expect(this.page.locator(
        "(//*[@class='bs-validation-text show'])[1]"
            ).locator('text="This field is required."')).toBeVisible();
    await expect(this.page.locator(
        "(//*[@class='bs-validation-text show'])[2]"
            ).locator('text="Please enter a valid email"')).toBeVisible();
    await expect(this.page.locator(
        "(//*[@class='bs-validation-text show'])[3]"
            ).locator('text="Reason required."')).toBeVisible();
}

async Reassign() {
    await this.WaitingForMeButton();
    await this.page.locator("(//*[@id='actiondropdown'])").click();
    await this.page.locator("(//*[@id='reassign'])").click();
    await this.page.getByRole('textbox', { name: 'Enter name' }).fill('kevin');
    await this.page.getByRole(
        'textbox', { name: 'Enter email address' })
        .fill('bstestA+1@gmail.com');
    await this.page.getByRole('textbox', { name: 'Enter reason for reassignment' }).fill('Reassigned');
    await this.page.getByRole('button', { name: 'Send' }).click();
    const toaster = await this.page.getByText('Document reassigned.');
    await expect(toaster).toContainText('Document reassigned.');
}

async DeclinewithEmptyDialogue() {
    await this.WaitingForMeButton();
    await this.page.locator("(//*[@id='actiondropdown'])").click();
    await this.page.getByRole('menuitem', { name: ' Decline' }).click();
    await this.page.getByRole('button', { name: 'Yes, decline' }).click();
    await expect(this.page.locator(
        "(//*[@class='bs-validation-text show'])"
        ).locator('text="This field is required."')).toBeVisible();
}

async Decline() {
    await this.WaitingForMeButton();
    await this.page.locator("(//*[@id='actiondropdown'])").click();
    await this.page.locator("(//*[@id='decline'])").click();
}

async RevokewithEmptyDialogue() {
    await this.WaitingForMeButton();
    await this.page.locator("(//*[@id='actiondropdown'])").click();
    await this.page.locator("(//*[@id='revoke'])").click(); 
    await this.page.getByRole('button', { name: 'Yes, revoke' }).click();
    await expect(this.page.locator(
        "(//*[@class='bs-validation-text show'])"
        ).locator('text="*Revoke reason is required"')).toBeVisible();
}

async Revoke() {
    await this.WaitingForMeButton();
    await this.page.locator("(//*[@id='actiondropdown'])").click();
    await this.page.locator("(//*[@id='revoke'])").click(); 
}

async Downloaddocument() {
    await this.WaitingForMeButton();
    await this.page.locator("(//*[@id='actiondropdown'])").click();
    await this.page.locator("(//*[@id='download'])").click();
    const toaster = await this.page.getByText('Document will download shortly.');
    await expect(toaster).toContainText('Document will download shortly.');
}

async Exportformdata() {
    await this.WaitingForMeButton();
    await this.page.locator("(//*[@id='actiondropdown'])").click();
    await this.page.locator("(//*[@id='downloadCSV'])").click();
    const toaster = await this.page.getByText('The download to CSV will start shortly.');
    await expect(toaster).toContainText('The download to CSV will start shortly.');
}

async Sendreminder() {
    await this.WaitingForOthersButton();
    await this.page.locator("(//*[@id='actiondropdown'])").click();
    const Sendreminder = await this.page.locator("(//*[@id='Send reminder'])");
    const isSendreminderVisible = await Sendreminder.isVisible();
    if (!isSendreminderVisible) {
        console.log("Remind Now option is not available, skipping this test case.");
        return;
    }
    await Sendreminder.click();
    await this.page.getByRole('button', { name: 'Remind now' }).click();
    const toaster = await this.page.getByText('Reminder sent', { exact: true });
    await expect(toaster).toContainText('Reminder sent');
}

async hovertokebabmenu() {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator("(//*[@class='e-rowcell e-templatecell auth-code-rowcell'])[1]").hover();
    const kebabmenu = await this.page.locator("(//*[@class='auth-menu-container no-highlight auth-menu-icon'])[1]");
    await kebabmenu.hover();
    await kebabmenu.click();
}

async kebabmenu() {
    const menuTrigger = this.page
        .locator("//div[@data-id='overview-access-code-readonly']").first();
    await menuTrigger.hover();
    const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
    await menu.waitFor({ state: 'visible' });
    await menu.hover();
    await menu.click();
}


async EditRecipient() {
    await this.WaitingForOthersButton();
    await this.kebabmenu();
    await this.page.getByRole('menuitem', { name: 'Edit recipient' }).click();
    await this.page.getByRole('textbox', { name: 'Enter signer name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter signer name' }).fill('simon');
    await this.page.getByRole('textbox', { name: 'Enter Email ID' }).click();
    await this.page.getByRole('textbox', { name: 'Enter Email ID' }).fill('simonmadebao+1@syncfusion.com');
    await this.page.getByRole('textbox', { name: 'Enter the reason' }).click();
    await this.page.getByRole('textbox', { name: 'Enter the reason' }).fill('incorrect signer');
    await this.page.locator("(//*[@class='e-control e-btn e-lib e-flat bs_recipients_send e-primary'])").click();
    const toaster = await this.page.getByText('Recipient updated successfully');
    await expect(toaster).toContainText('Recipient updated successfully');
}

async AccessCode() {
    await this.WaitingForOthersButton();
    await this.kebabmenu();
    await this.page.locator("#addAuthentication").hover();
    await this.page.locator("#addAuthentication").click();
    await this.page.getByRole('menuitem', { name: 'Access code' }).click();
    await this.page.getByRole('button', { name: '' }).click();
    await this.page.waitForLoadState('networkidle');
    const toaster = await this.page.getByText('Authentication added successfully.');
    await expect(toaster).toContainText('Authentication added successfully.');
}

async AutogenerateAuthentication() {
    await this.WaitingForOthersButton();
    await this.hovertokebabmenu();
    await this.page.getByRole('menuitem', { name: 'Auto generate' }).click();
    await this.page.getByRole('button', { name: '' }).click();
    const toaster = await this.page.getByText('Access code modified');
    await expect(toaster).toContainText('Access code modified');
}

async ChangeManuallyAuthentication() {
    await this.WaitingForOthersButton();
    await this.hovertokebabmenu();
    await this.page.getByRole('menuitem', { name: 'Change manually' }).click();
    const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
    const textBox = await this.page.locator("(//*[@class='input-element blue-border'])").fill(randomNumber);
    await this.page.getByRole('button', { name: '' }).click();
    const toaster = await this.page.getByText('Access code modified');
    await expect(toaster).toContainText('Access code modified');
}

async Emailaccesscode() {
    await this.WaitingForOthersButton();
    await this.hovertokebabmenu();
    await this.page.getByRole('menuitem', { name: 'Email access code' }).click();
}

async RemoveAuthentication() {
    await this.WaitingForOthersButton();
    await this.hovertokebabmenu();
    await this.page.getByRole('menuitem', { name: 'Remove authentication' }).click();
    await this.page.getByRole('button', { name: 'Yes, remove' }).click();
}

async Emailverification() {
    await this.WaitingForOthersButton();
    await this.kebabmenu();
    await this.page.locator("#addAuthentication").hover();
    await this.page.locator("#addAuthentication").click();
    await this.page.locator("#emailverification").click();
    const toaster = await this.page.getByText('Authentication added successfully.');
    await expect(toaster).toContainText('Authentication added successfully.');
}

async RemoveEmailOTP() {
    await this.WaitingForOthersButton();
    await this.hovertokebabmenu();
    await this.page.getByRole('menuitem', { name: 'Remove authentication' }).click();
    await this.page.getByRole('button', { name: 'Yes, remove' }).click();
}

async SMSOTP() {
    await this.WaitingForOthersButton();
    await this.kebabmenu();
    await this.page.locator("#addAuthentication").hover();
    await this.page.locator("#addAuthentication").click();
    await this.page.getByRole('menuitem', { name: 'SMS OTP' }).click();
    await this.page.getByRole('textbox', { name: '-555-0123' }).fill('2015550123');
    await this.page.getByRole('button', { name: '' }).click();
    const toaster = await this.page.getByText('SMS Authentication added');
    await expect(toaster).toContainText('SMS Authentication added');
}

async Editphonenumber() {
    await this.WaitingForOthersButton();
    await this.hovertokebabmenu();
    const addAuthentication = await this.page.locator("#addAuthentication");
    const editPhonenumber = await this.page.getByRole('menuitem', { name: 'Edit phone number' })
    await editPhonenumber.hover();
    await editPhonenumber.click();
    await this.page.getByRole('textbox', { name: '-555-0123' }).fill('2015650123');
    await this.page.getByRole('button', { name: '' }).click();
    const toaster = await this.page.getByText('Phone number edited');
    await expect(toaster).toContainText('Phone number edited');
}

async RemoveSMSOTP() {
    await this.WaitingForOthersButton();
    await this.hovertokebabmenu();
    await this.page.getByRole('menuitem', { name: 'Remove authentication' }).click();
    await this.page.getByRole('button', { name: 'Yes, remove' }).click();
}
}