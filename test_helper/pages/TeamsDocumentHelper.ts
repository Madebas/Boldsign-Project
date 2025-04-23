import { expect, Page } from '@playwright/test';
import { baseUrl, TeamsDocumentUrl, } from '../urls';

export class TeamsDocumentHelper {
    constructor(public page: Page) {}

    async navigateToTeamsDocument() {
        await this.page.goto(baseUrl+TeamsDocumentUrl );
    }

    async uploadDocument() {
        await this.page.setInputFiles('input[type="file"]', './Data/blank.pdf');
        await this.page.waitForSelector("//span[contains(text(),'Uploaded Successfully')]");
        const uploadsuccessfull = this.page.locator("//span[contains(text(),'Uploaded Successfully')]");
        await expect(uploadsuccessfull).toBeVisible();
      }

    async otherrecipientdetails() {
        await this.page.getByRole('combobox').click();
        await this.page.getByRole('combobox').fill('OmarSalim');
        await this.page.getByRole('textbox', { name: 'Recipient email*' }).click();
        await this.page.getByRole(
            'textbox', { name: 'Recipient email*' }).fill('omarsalim@sync.com');
    }

    async createdocument() {
        await this.page.goto(baseUrl+documentUrl);
        await this.uploadDocument();
        await this.otherrecipientdetails();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator("(//*[@class='enable-navigation bs-next-button'])[1]").click();
    }

    async FilterBothOptionbyStatus() {
        await this.page.locator('.filter-icon-input').click();
        await this.page.locator('.bs-filterdialog > div > .e-multi-select-wrapper').click();
        await this.page.locator(
            '#statusdropdown_popup div').filter({ hasText: 'All' }).locator('span')
            .nth(1).click();
        await this.page.locator('#dialog_dialog-content').getByText('Status').click();
        await this.page.getByRole('button', { name: 'Apply Filter' }).click();
        const filterText = this.page.locator('text=Filters applied: Status - 7 selected');
        await expect(filterText).toBeVisible();
    }

    async FilterSentoptionbyStatus() {
        await this.page.locator('.filter-icon-input').click();
        await this.page.locator('label').filter({ hasText: 'Sent' }).click();
        await this.page.locator('.bs-filterdialog > div > .e-multi-select-wrapper').click();
        await this.page.locator(
            '#statusdropdown_popup div').filter({ hasText: 'All' }).locator('span')
            .nth(1).click();
        await this.page.locator('#dialog_dialog-content').getByText('Status').click();
        await this.page.getByRole('button', { name: 'Apply Filter' }).click();
        const filterText = this.page.locator(
            'text=Filters applied: Sent documents Status - 7 selected'
        );
        await expect(filterText).toBeVisible();
    }

    async FilterReceivedoptionbyStatus() {
        await this.page.locator('.filter-icon-input').click();
        await this.page.locator('label').filter({ hasText: 'Received' }).click();
        await this.page.locator('.bs-filterdialog > div > .e-multi-select-wrapper').click();
        await this.page.locator(
            '#statusdropdown_popup div').filter({ hasText: 'All' }).locator('span')
            .nth(1).click();
        await this.page.locator('#dialog_dialog-content').getByText('Status').click();
        await this.page.getByRole('button', { name: 'Apply Filter' }).click();
        const filterText = this.page.locator(
            'text=Filters applied: Received documents Status - 7 selected'
        );
        await expect(filterText).toBeVisible();
    }

    async ResetFilters() {
        await this.page.locator('.filter-icon-input').click();
        await this.page.locator('.bs-filterdialog > div > .e-multi-select-wrapper').click();
        await this.page.locator('#statusdropdown_popup').getByText('All').click();
        await this.page.getByRole('button', { name: 'Reset' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
    }

    async ClearallFilters() {
        await this.page.locator('.filter-icon-input').click();
        await this.page.locator('.bs-filterdialog > div > .e-multi-select-wrapper').click();
        await this.page.locator('#statusdropdown_popup div').filter({ hasText: 'All' })
            .locator('span').nth(1).click();
        await this.page.locator('#dialog_dialog-content').getByText('Status').click();
        await this.page.getByRole('button', { name: 'Apply Filter' }).dblclick();
        await this.page.getByText('Clear all filters').click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
    }

    async PinToDashboardWithoutEnteringWidgetName() {
        await this.page.locator('.filter-icon-input').click();
        await this.page.locator('.bs-filterdialog > div > .e-multi-select-wrapper').click();
        await this.page.locator('#statusdropdown_popup div').filter({ hasText: 'All' })
            .locator('span').nth(1).click();
        await this.page.locator('#dialog_dialog-content').getByText('Status').click();
        await this.page.getByRole('button', { name: 'Apply Filter' }).dblclick();
        await this.page.locator('#pin_filter span').click();
        await this.page.getByRole('button', { name: 'Save & Pin' }).click();
        await expect(this.page.getByText('This field is required', { exact: true }))
            .toBeVisible();
    }

    async PinToDashboard() {
        await this.page.locator('.filter-icon-input').click();
        await this.page.locator('.bs-filterdialog > div > .e-multi-select-wrapper').click();
        await this.page.locator('#statusdropdown_popup div').filter({ hasText: 'All' })
            .locator('span').nth(1).click();
        await this.page.locator('#dialog_dialog-content').getByText('Status').click();
        await this.page.getByRole('button', { name: 'Apply Filter' }).dblclick()
        await this.page.locator('#pin_filter span').click();
        await this.page.getByRole('textbox', { name: 'Enter a name for the saved' })
            .fill('Completed');
        await this.page.getByRole('button', { name: 'Save & Pin' }).click();
        const toaster = await this.page
            .getByText('Successfully pinned the filter to the dashboard');
        await expect(toaster)
            .toContainText('Successfully pinned the filter to the dashboard');
    }

    async DeletePinToDashboard() {
        await this.page.goto("https://staging-app.boldsign.com/dashboard");
        await this.page.locator("(//*[@class='bs-link-menu-items'])[1]").click();
        await this.page.getByRole('menuitem', { name: ' Delete filter' }).click();
        await this.page.getByRole('button', { name: 'Yes, delete' }).click();
        const toaster = await this
            .page.getByText('The selected filter has been deleted successfully');
        await expect(toaster)
            .toContainText('The selected filter has been deleted successfully');
    }

    async FilterbyAllTeams() {
        await this.page.locator('.e-multi-select-wrapper').first().click();
        await this.page.getByRole('option', { name: 'Default' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
    }

    async FilterbyTeamMember() {
        await this.page.locator('div:nth-child(3) > div > .e-multi-select-wrapper').click();
        await this.page.getByRole('option', { name: 'Simon Madeba' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
    }

    async FilterallbyAllbutton() {
        await this.page.getByText('All', { exact: true }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
    }

    async FilterbyTeammemberpendingbutton() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await expect(this.page.getByText('No documents available')).toBeVisible();
    }

    async FilterbyWaitingforothersbutton() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
    }

    async CopyDocumentID() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("//*[@data-id='overview-document-id']").first().hover();
        await this.page
            .locator("//*[@title='Copy to clipboard']").first().waitFor({ state: 'visible' });
        await this.page.locator('.bs-copy-icons').first().click();
        await this.page.locator("//*[@title='Copied']").isVisible();
    }

    async AddTags() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.getByText('Add Tag').click();
        await this.page.locator('tags').click();
        await this.page.locator('tags').getByRole('textbox').fill('Samples,');
        await this.page.getByRole('button', { name: 'Save' }).click();
        const toaster = await this.page.getByText('Tag(s) updated successfully');
        await expect(toaster).toContainText('Tag(s) updated successfully');
    }

    async FilterBothoptionbyTags() {
        await this.page.locator('.filter-icon-input').click();
        await this.page.locator('#dialog_dialog-content div')
            .filter({ hasText: 'Tags' }).nth(2).click();
        await this.page
            .getByRole('option', { name: 'Samples' }).locator('span').nth(1).click();
        await this.page.getByText('Samples, Samples0').click();
        await this.page.getByRole('button', { name: 'Apply Filter' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")
            .getByText('Sample')).toBeVisible();
    }

    async FilterSentoptionbyTags() {
        await this.page.locator('.filter-icon-input').click();
        await this.page.locator('label').filter({ hasText: 'Sent' }).click();
        await this.page.locator('#dialog_dialog-content div')
            .filter({ hasText: 'Tags' }).nth(2).click();
        await this.page
            .getByRole('option', { name: 'Samples' }).locator('span').nth(1).click();
        await this.page.getByText('Samples, Samples0').click();
        await this.page.getByRole('button', { name: 'Apply Filter' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")
            .getByText('Sample')).toBeVisible();
    }

    async FilterReceivedoptionbyTags() {
        await this.page.locator('.filter-icon-input').click();
        await this.page.locator('label').filter({ hasText: 'Received' }).click();
        await this.page.locator('#dialog_dialog-content div')
            .filter({ hasText: 'Tags' }).nth(2).click();
        await this.page
            .getByRole('option', { name: 'Samples' }).locator('span').nth(1).click();
        await this.page.getByText('Samples, Samples0').click();
        await this.page.getByRole('button', { name: 'Apply Filter' }).click();
        await expect(this.page.getByText('No documents available')).toBeVisible();
    }

    async FilterBothoptionbyDateRange() {
        await this.page.locator('.filter-icon-input').click();
        await this.page.getByLabel('select').click();
        await this.page.getByRole('option', { name: 'Today' }).click();
        await this.page.getByRole('button', { name: 'Apply Filter' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")
            .getByText('Sample')).toBeVisible();
    }

    async FilterBothoptionbyStatusTagsandDateRange() {
        await this.page.locator('.filter-icon-input').click();
        await this.page
            .locator('.bs-filterdialog > div > .e-multi-select-wrapper').click();
        await this.page.locator('#statusdropdown_popup div')
            .filter({ hasText: 'All' }).click();
        await this.page.locator('#dialog_dialog-content div')
            .filter({ hasText: 'Tags' }).nth(2).click();
        await this.page
            .getByRole('option', { name: 'Samples' }).locator('span').nth(1).click();
        await this.page.getByText('Samples, Samples0').click();
        await this.page.getByLabel('select').click();
        await this.page.getByRole('option', { name: 'This week' }).click();
        await this.page.getByRole('button', { name: 'Apply Filter' }).click();
        await expect(this.page.getByText('Filters applied:'))
            .toBeVisible();
    } 

    async ManageTagsButton() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.getByText('Manage tags').click();
        await this.page.getByRole('button', { name: 'remove tag' }).click();
        await this.page.getByRole('button', { name: 'Save' }).click();
        const toaster = await this.page.getByText('Tag(s) updated successfully');
        await expect(toaster).toContainText('Tag(s) updated successfully'); 
    }

    async FilterExpiredDocuments() {
        await this.page.getByRole('option', { name: 'Expired' }).click();
        await expect(this.page.getByText('No documents available')).toBeVisible();
    }

    async EditExpiryDateButton() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.waitForLoadState('networkidle'); 
        await this.page.getByText('Edit', { exact: true }).click();
        await this.page.locator(
            "(//*[@class='e-control e-datepicker e-lib e-input e-keyboard'])[1]").click();
        const existingDateValue = await this.page.locator(
            "(//*[@class='e-control e-datepicker e-lib e-input e-keyboard'])[1]").inputValue();
        const existingDate = new Date(existingDateValue);
        existingDate.setDate(existingDate.getDate() + 1);
        const formattedDate = (`0${existingDate.getMonth() + 1}`).slice(-2) + '-' + 
                              (`0${existingDate.getDate()}`).slice(-2) + '-' + 
                              existingDate.getFullYear();
        await this.page.locator(
            "(//*[@class='e-control e-datepicker e-lib e-input e-keyboard'])[1]"
                ).fill(formattedDate);
        await this.page.locator("(//*[@class='e-control e-btn e-primary ml-2 w-24'])[1]").click();
        const toaster = await this.page.getByText('Successfully extended expiry date');
        await expect(toaster).toContainText('Successfully extended expiry date'); 
    }

    async RemindNowButton() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator('[data-id="overview-reminder-remindnow"]').click();
        await this.page.getByRole('button', { name: 'Remind now' }).click();
        const toaster = await this.page.getByText('Reminder sent', { exact: true });
        await expect(toaster).toContainText('Reminder sent');
    }

    async DocumentHistory() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.getByText('Document History').click();
        const userActivityLocator = this.page.locator("(//*[@class='e-headertext'])[8]");
        await expect(this.page.getByText('User Activity')).toBeVisible();

    }

    async Generatesigninglink() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        const menuTrigger = this.page
            .locator("//div[@data-id='overview-access-code-readonly']").first();
        await menuTrigger.hover();
        const menu = this.page
            .locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.getByRole('menuitem', { name: 'Generate signing link' }).click();
        await this.page.getByRole('button', { name: 'Copy link & close' }).click();
        await this.page.waitForLoadState('networkidle')
        const toaster = await this.page.getByText('Signing link has been copied successfully');
        await expect(toaster).toContainText('Signing link has been copied successfully');
    }

    async EditRecipientwithEmptyFields() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        const menuTrigger = this.page
            .locator("//div[@data-id='overview-access-code-readonly']").first();
        await menuTrigger.hover();
        const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.getByRole('menuitem', { name: 'Edit recipient' }).click();
        await this.page.getByPlaceholder('Enter signer name').clear();
        await this.page.getByPlaceholder('Enter Email ID').clear();
        await this.page.getByPlaceholder('Enter the reason').clear();
        await this.page.getByRole('button', { name: 'Send', exact: true }).click();
        await expect(this.page.getByText('This field is required.').first()).toBeVisible();
        await expect(this.page.getByText('This field is required.').nth(1)).toBeVisible();
        await expect(this.page.getByText('This field is required.').nth(2)).toBeVisible();
    }

    async Editrecipient() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        const menuTrigger = this.page
            .locator("//div[@data-id='overview-access-code-readonly']").first();
        await menuTrigger.hover();
        const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.getByRole('menuitem', { name: 'Edit recipient' }).click();
        await this.page.getByPlaceholder('Enter signer name').fill('');
        await this.page.getByPlaceholder('Enter signer name').fill('Simon Madeba');
        await this.page.getByPlaceholder('Enter Email ID').fill('');
        await this.page.getByPlaceholder('Enter Email ID')
            .fill('simonmadebao+1@syncfusion.com');
        await this.page.getByPlaceholder('Enter the reason').click();
        await this.page.getByPlaceholder('Enter the reason').fill('me');
        await this.page.getByRole('button', { name: 'Send', exact: true }).click();
        const toaster = await this.page.getByText('Recipient updated successfully');
        await expect(toaster).toContainText('Recipient updated successfully');
    }

    async AddAuthenticationAccessCode() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        const menuTrigger = this.page
            .locator("//div[@data-id='overview-access-code-readonly']").first();
        await menuTrigger.hover();
        const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.locator("#addAuthentication").hover();
        await this.page.locator("#addAuthentication").click();
        await this.page.getByRole('menuitem', { name: 'Access code' }).click();
        await this.page.getByRole('button', { name: '' }).click();
        const toaster = await this.page.getByText('Authentication added successfully.');
        await expect(toaster).toContainText('Authentication added successfully.');
    }

    async AutoGenerateAuthentication() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(
            "(//*[@class='e-rowcell e-templatecell auth-code-rowcell'])[1]").hover();
        const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.getByRole('menuitem', { name: 'Auto generate' }).click();
        await this.page.getByRole('button', { name: '' }).click();
        const toaster = await this.page.getByText('Access code modified');
        await expect(toaster).toContainText('Access code modified');
    }

    async ManuallyChangeAuthentication() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(
            "(//*[@class='e-rowcell e-templatecell auth-code-rowcell'])[1]").hover();
        const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.getByRole('menuitem', { name: 'Change manually' }).click();
        const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
        const textBox = await this.page
            .locator("(//*[@class='input-element blue-border'])").fill(randomNumber);
        await this.page.getByRole('button', { name: '' }).click();
        const toaster = await this.page.getByText('Access code modified');
        await expect(toaster).toContainText('Access code modified');
    }

    async EmailAccessCode() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(
            "(//*[@class='e-rowcell e-templatecell auth-code-rowcell'])[1]").hover();
        const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.getByRole('menuitem', { name: 'Email access code' }).click();
    }

    async RemoveAuthentication() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(
            "(//*[@class='e-rowcell e-templatecell auth-code-rowcell'])[1]").hover();
        const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.getByRole('menuitem', { name: 'Remove authentication' }).click();
        await this.page.getByRole('button', { name: 'Yes, remove' }).click();
    }

    async EmailVerification() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        const menuTrigger = this.page
            .locator("//div[@data-id='overview-access-code-readonly']").first();
        await menuTrigger.hover();
        const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.locator("#addAuthentication").hover();
        await this.page.locator("#addAuthentication").click();
        await this.page.locator("#emailverification").click();
        const toaster = await this.page.getByText('Authentication added successfully.');
        await expect(toaster).toContainText('Authentication added successfully.');
    }

    async RemoveEmailVerification() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(
            "(//*[@class='e-rowcell e-templatecell auth-code-rowcell'])[1]").hover();
        const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.getByRole('menuitem', { name: 'Remove authentication' }).click();
        await this.page.getByRole('button', { name: 'Yes, remove' }).click();
    }

    async ViewDocument() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.locator("(//*[@id='view'])").click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.locator("//*[@class='view-header-doc-name']")).toBeVisible();
        const pagetitle = await this.page.title();
        await expect(pagetitle).toBe('Sample - View Document - BoldSign');
    }

    async ReassignDocumentwithEmptyFields() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
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

    async ReassignDocument() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.locator("(//*[@id='reassign'])").click();
        await this.page.getByRole('textbox', { name: 'Enter name' }).fill('Kevin Ochieng');
        await this.page.getByRole(
            'textbox', { name: 'Enter email address' })
            .fill('kevinochiengo@syncfusion.com');
        await this.page
            .getByRole('textbox', { name: 'Enter reason for reassignment' }).fill('Reassigned');
        await this.page.getByRole('button', { name: 'Send' }).click();
        const toaster = await this.page.getByText('Document reassigned.');
        await expect(toaster).toContainText('Document reassigned.');
    }

    async CloneDocument() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.getByRole('menuitem', { name: ' Clone document' }).click();
        await this.page.getByRole('button', { name: 'Clone' }).click();
        await this.page.locator("(//*[@class='enable-navigation bs-next-button'])[1]").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator("(//*[@class='enable-navigation'])[1]").click();
        await this.page.locator("(//*[@class='e-control e-btn e-lib e-flat e-primary'])[3]").click();
        await expect(this.page
            .getByText('Document has been sent successfully.', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'Go to dashboard' }).click();
        await this.page.goto(baseUrl+TeamsDocumentUrl );
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
    }

    async EditDocument() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.getByRole('menuitem', { name: ' Edit document' }).click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
        await this.page.getByRole('button', { name: ' Remove' }).click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.setInputFiles('input[type=file]', './Data/TableFeatures.pdf');
        const uploadsuccessfull = this.page
            .locator("//span[contains(text(),'Uploaded Successfully')]");
        await expect(uploadsuccessfull).toBeVisible();
        await this.page.getByRole('combobox').fill('David pamur');
        await this.page.getByRole('textbox', { name: 'Recipient email*' }).click();
        await this.page.getByRole(
            'textbox', { name: 'Recipient email*' }).fill('davidpamur@sync.com');
        await this.page.waitForLoadState('networkidle');
        await this.page.locator("(//*[@class='enable-navigation bs-next-button'])[1]").click();
        await this.page.locator('#signature_parent.bs-old-form-field').waitFor({ state: 'visible' });
        await this.page.locator('#signature_parent.bs-old-form-field').hover();
        await this.page.mouse.down();
        await this.page.locator('#pdfviewer_viewerContainer').waitFor({ state: 'visible' });
        await this.page.locator('#pdfviewer_viewerContainer').hover();
        await this.page.locator('#formElementsContainer_SVG').waitFor({ state: 'visible' });
        await this.page.locator('#formElementsContainer_SVG').click();
        await this.page.waitForLoadState('networkidle');
        await this.page.mouse.up();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator("(//*[@class='enable-navigation'])[1]").click();
        await this.page.locator("(//*[@class='e-control e-btn e-lib e-flat e-primary'])[4]").click();
        await expect(this.page
            .getByText('Document has been edited and sent successfully.', { exact: true }))
            .toBeVisible();
    }

    async RevokeDocumentEmptyFields() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.getByRole('menuitem', { name: ' Revoke' }).click();
        await this.page.getByRole('button', { name: 'Yes, revoke' }).click();
        await expect(this.page.getByText('*Revoke reason is required')).toBeVisible();
    }

    async RevokeDocument() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.getByRole('menuitem', { name: ' Revoke' }).click();
        await this.page
            .getByRole('textbox', { name: 'Enter reason for revocation*' }).fill('Revoke');
        await this.page.getByRole('button', { name: 'Yes, revoke' }).click();
        const toaster = await this.page.getByText('Document revoked.');
        await expect(toaster).toContainText('Document revoked.');
    }

    async RevokeButton() {
        await this.page.getByRole('option', { name: 'Revoked' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
    }

    async Downloaddocument() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
         await this.page.locator("(//*[@id='download'])").click();
        const toaster = await this.page.getByText('Document will download shortly.');
        await expect(toaster).toContainText('Document will download shortly.');
    }

    async Exportformdata() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.locator("(//*[@id='downloadCSV'])").click();
        const toaster = await this.page.getByText('The download to CSV will start shortly.');
        await expect(toaster).toContainText('The download to CSV will start shortly.');
    }

    async SignDocument() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        const menuTrigger = this.page
            .locator("//div[@data-id='overview-access-code-readonly']").first();
        await menuTrigger.hover();
        const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.getByRole('menuitem', { name: 'Edit recipient' }).click();
        await this.page.getByPlaceholder('Enter signer name').fill('');
        await this.page.getByPlaceholder('Enter signer name').fill('Simon Madeba');
        await this.page.getByPlaceholder('Enter Email ID').fill('');
        await this.page.getByPlaceholder('Enter Email ID')
            .fill('simonmadebao+1@syncfusion.com');
        await this.page.getByPlaceholder('Enter the reason').click();
        await this.page.getByPlaceholder('Enter the reason').fill('me');
        await this.page.getByRole('button', { name: 'Send', exact: true }).click();
        const toaster = await this.page.getByText('Recipient updated successfully');
        await expect(toaster).toContainText('Recipient updated successfully');
        await this.page.goto(baseUrl+TeamsDocumentUrl );
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.getByRole('button', { name: 'Sign document' }).click();
        await this.page.locator("#agreeCheckbox").check();
        await this.page.locator("#btnContinue").click();
        await this.page.getByText("Sign Here").click();
        await this.page.locator("#btnDesktopFinish").click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page
            .getByText('You have successfully signed the document: Sample', { exact: true }))
            .toBeVisible();
    }

    async Completedbutton() {
        await this.page.getByRole('option', { name: 'Completed' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.getByRole('menuitem', { name: ' Delete' }).click();
        await this.page.getByRole('button', { name: 'Yes, delete' }).click();
        const toaster = await this.page.getByText('Document(s) deleted forever.');
        await expect(toaster).toContainText('Document(s) deleted forever.');
    }

    async NeedsAttentionButtonfilter() {
        await this.page.getByRole('button', { name: ' Create New' }).click();
        await this.page.getByRole('link', { name: 'Create New Document Send' }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.setInputFiles('input[type=file]', './Data/sample.pdf');
        const uploadsuccessfull = this.page
            .locator("//span[contains(text(),'Uploaded Successfully')]");
        await expect(uploadsuccessfull).toBeVisible();
        await this.page.getByRole('combobox').click();
        await this.page.getByRole('combobox').fill('Kevin Ochieng');
        await this.page.getByRole('textbox', { name: 'Recipient email*' }).click();
        await this.page.getByRole(
            'textbox', { name: 'Recipient email*' }).fill('kevinochiengo@syncfusion.com');
        await this.page.waitForLoadState('networkidle');
        await this.page.locator("(//*[@class='enable-navigation bs-next-button'])[1]").click();
        await this.page.locator('#signature_parent.bs-old-form-field').waitFor({ state: 'visible' });
        await this.page.locator('#signature_parent.bs-old-form-field').hover();
        await this.page.mouse.down();
        await this.page.locator('#pdfviewer_viewerContainer').waitFor({ state: 'visible' });
        await this.page.locator('#pdfviewer_viewerContainer').hover();
        await this.page.locator('#formElementsContainer_SVG').waitFor({ state: 'visible' });
        await this.page.locator('#formElementsContainer_SVG').click();
        await this.page.waitForLoadState('networkidle');
        await this.page.mouse.up();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator("(//*[@class='enable-navigation'])[1]").click();
        await this.page.locator("(//*[@class='e-control e-btn e-lib e-flat e-primary'])[3]").click();
        await expect(this.page
            .getByText('Document has been sent successfully.', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'Go to dashboard' }).click();
        await this.page.goto(baseUrl+TeamsDocumentUrl );
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.getByRole('menuitem', { name: ' Edit document' }).click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
        await this.page.goto(baseUrl+TeamsDocumentUrl );
        await this.page.getByRole('option', { name: 'Needs attention' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
    }

    async CancelEditingDocument() {
        await this.page.getByRole('option', { name: 'Needs attention' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.getByRole('menuitem', { name: ' Cancel editing' }).click();
        const toaster = await this.page.getByText('Document editing has been cancelled successfully.');
        await expect(toaster).toContainText('Document editing has been cancelled successfully.');
    }

    async DeclineDocumentwithEmpttyFields() {
        await this.page.getByRole('option', { name: 'Waiting for others' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        const menuTrigger = this.page
            .locator("//div[@data-id='overview-access-code-readonly']").first();
        await menuTrigger.hover();
        const menu = this.page.locator("//div[@data-id='overview-access-code-menu']").first();
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
        await menu.click();
        await this.page.getByRole('menuitem', { name: 'Edit recipient' }).click();
        await this.page.getByPlaceholder('Enter signer name').fill('');
        await this.page.getByPlaceholder('Enter signer name').fill('Simon Madeba');
        await this.page.getByPlaceholder('Enter Email ID').fill('');
        await this.page.getByPlaceholder('Enter Email ID')
            .fill('simonmadebao+1@syncfusion.com');
        await this.page.getByPlaceholder('Enter the reason').click();
        await this.page.getByPlaceholder('Enter the reason').fill('me');
        await this.page.getByRole('button', { name: 'Send', exact: true }).click();
        const toaster = await this.page.getByText('Recipient updated successfully');
        await expect(toaster).toContainText('Recipient updated successfully');
        await this.page.goto(baseUrl+TeamsDocumentUrl );
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.getByRole('menuitem', { name: ' Decline' }).click();
        await this.page.getByRole('button', { name: 'Yes, decline' }).click();
        await expect(this.page.locator(
            "(//*[@class='bs-validation-text show'])"
            ).locator('text="This field is required."')).toBeVisible();
    }

    async DeclineDocument() {
        await this.page.getByRole('option', { name: 'Team member pending' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.getByRole('menuitem', { name: ' Decline' }).click();
        await this.page.getByRole('textbox', { name: 'Enter reason for declining*' }).click();
        await this.page.getByRole('textbox', { name: 'Enter reason for declining*' }).fill('Declined.');
        await this.page.getByRole('button', { name: 'Yes, decline' }).click();
        const toaster = await this.page.getByText('Document declined.');
        await expect(toaster).toContainText('Document declined.');
    }

    async DeclinedButtonfilter() {
        await this.page.getByRole('option', { name: 'Declined' }).click();
        await expect(this.page.locator("(//*[@class='doc-title'])[1]")).toBeVisible();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.getByRole('menuitem', { name: ' Delete' }).click();
        await this.page.getByRole('button', { name: 'Yes, delete' }).click();
        const toaster = await this.page.getByText('Document(s) deleted forever.');
        await expect(toaster).toContainText('Document(s) deleted forever.');
    }

    async DeleteDocument() {
        await this.page.getByRole('option', { name: 'Revoked' }).click();
        await this.page.locator("(//*[@class='doc-title'])[1]").click();
        await this.page.locator("(//*[@id='actiondropdown'])").click();
        await this.page.getByRole('menuitem', { name: ' Delete' }).click();
        await this.page.getByRole('button', { name: 'Yes, delete' }).click();
        const toaster = await this.page.getByText('Document(s) deleted forever.');
        await expect(toaster).toContainText('Document(s) deleted forever.');
    }
}

