import { expect, Page } from '@playwright/test';
import { baseUrl, oAuthAppsUrl, productionUrl} from '../urls';

export class OAuthAppsHelper {
    constructor(public page: Page) {}

async navigateToOAuthApps() {
    await this.page.goto(baseUrl+oAuthAppsUrl);
}

async CreateYourFirstApp() {
    await this.page.getByRole('button', { name: 'Create Your First App' }).click();
    await this.page.getByRole('textbox', { name: 'Enter name...' }).fill('Boldsign App');
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = this.page.getByText('Application created successfully');
    await expect(toaster).toContainText('Application created successfully');
    await expect(this.page).toHaveTitle(/App Details - Settings - BoldSign/);
    await this.navigateToOAuthApps();
    await expect(this.page.locator("//tr[@class='e-row']//td[contains(@class,'e-rowcell') and contains(.,'Boldsign App')]"))
        .toBeVisible();
}

async CreateAppWithNoName() {
    await this.page.getByRole('button', { name: 'Create App' }).click();
    await this.page.getByRole('textbox', { name: 'Enter name...' }).fill('  ');
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Failed to create application');
    await expect(toaster).toContainText('Failed to create application');
}

async CreateOAuthApp() {
    await this.page.getByRole('button', { name: 'Create App' }).click();
    await this.page.getByRole('textbox', { name: 'Enter name...' }).fill('Bolddesk App');
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Application created successfully');
    await expect(toaster).toContainText('Application created successfully');
    await expect(this.page).toHaveTitle(/App Details - Settings - BoldSign/);
    await this.navigateToOAuthApps();
    await expect(this.page.locator(
        "//tr[@class='e-row']//td[@class='e-rowcell' and contains(.,'Bolddesk App')]")).toBeVisible();
}

async ViewAppDetails() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").hover();
    await this.page.locator("(//*[@class='sb_template_menu-icon-input'])[1]").click();
    await this.page.getByRole('menuitem', { name: ' View Details' }).click();
    await expect(this.page).toHaveTitle(/App Details - Settings - BoldSign/);
}

async DeleteApp() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").hover();
    await this.page.locator("(//*[@class='sb_template_menu-icon-input'])[1]").click();
    await this.page.getByRole('menuitem', { name: ' Delete' }).click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    const toaster = await this.page.getByText('Application deleted successfully');
    await expect(toaster).toContainText('Application deleted successfully');
}

async EditApplication() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator('.sf-icon-Edit1').click();
    await this.page.getByRole('textbox', { name: 'Enter name...' }).fill('Boldreport App');
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Application updated successfully');
    await expect(toaster).toContainText('Application updated successfully');
    await this.navigateToOAuthApps();
    await expect(this.page.locator(
        "//tr[@class='e-row']//td[@class='e-rowcell' and contains(.,'Boldreport App')]")).toBeVisible();
}

async AddDescription() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator('.sf-icon-Edit1').click();
    await this.page.getByText('Add Description').click();
    await this.page.getByRole('textbox', { name: 'Description' }).fill('Ticket reports');
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Application updated successfully');
    await expect(toaster).toContainText('Application updated successfully');
}

async AddInvalidURL() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator('.sf-icon-Edit1').click();
    await this.page.getByText('Add URL').click();
    await this.page.getByRole('textbox', { name: 'https://' }).fill('boldsign');
    await expect(this.page.locator('.errorValidation')).toBeVisible();
}

async AddValidURL() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator('.sf-icon-Edit1').click();
    await this.page.getByText('Add URL').click();
    await this.page.getByRole('textbox', { name: 'https://' }).fill(baseUrl);
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Application updated successfully');
    await expect(toaster).toContainText('Application updated successfully');
}

async OpentheURLInAppDetails() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    const page2Promise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: 'https://staging-app.boldsign.' }).click();
    const page2 = await page2Promise;
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveTitle(/App Details - Settings - BoldSign/);
    await page2.close();
}

async AddmorethanoneValidURL() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator('.sf-icon-Edit1').click();
    await this.page.getByText('Add URL').click();
    await this.page.locator('#s_url2').fill(productionUrl);
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Application updated successfully');
    await expect(toaster).toContainText('Application updated successfully');
}

async DeleteAddedURL() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator('.sf-icon-Edit1').click();
    await this.page.locator("(//*[@class='sf-icon-Delete1 s_url2'])").click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Application updated successfully');
    await expect(toaster).toContainText('Application updated successfully');
}

async RefreshTokenExpirationModeSliding() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator('.sf-icon-Edit1').click();
    await this.page.locator('label').filter({ hasText: 'Sliding' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Application updated successfully');
    await expect(toaster).toContainText('Application updated successfully');
    await this.navigateToOAuthApps();
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator(".sf-icon-digisign").first().hover();
    const tooltip = this.page.locator('.e-tooltip[data-tooltip-id^="tooltip_"]');
    await expect(tooltip).toBeVisible();
}

async RefreshTokenExpirationModeAbsolute() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator('.sf-icon-Edit1').click();
    await this.page.locator('label').filter({ hasText: 'Absolute' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Application updated successfully');
    await expect(toaster).toContainText('Application updated successfully');
    await this.navigateToOAuthApps();
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator(".sf-icon-digisign").first().hover();
    const tooltip = this.page.locator('.e-tooltip[data-tooltip-id^="tooltip_"]');
    await expect(tooltip).toBeVisible();
}

async CopyClientID() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator('.sf-icon-Copy').first().click();
    const toaster = await this.page.getByText('Client ID copied');
    await expect(toaster).toContainText('Client ID copied');
}

async NewClientSecretWithSpecialCases() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.getByRole('button', { name: 'New Client Secret' }).click();
    await this.page.getByRole('textbox', { name: 'Enter notes for new client' }).fill('   ');
    await this.page.getByRole('button', { name: 'Generate' }).click();
    const toaster = await this.page.getByText('Failed to generate secret key');
    await expect(toaster).toContainText('Failed to generate secret key');
}

async NewClientSecret() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.getByRole('button', { name: 'New Client Secret' }).click();
    await this.page.getByRole('textbox', { name: 'Enter notes for new client' }).fill('FranceParis.');
    await this.page.getByRole('button', { name: 'Generate' }).click();
    const toaster = await this.page.getByText('Secret key added successfully');
    await expect(toaster).toContainText('Secret key added successfully');
    await this.navigateToOAuthApps();
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await expect(this.page.locator('tr.e-row td.e-rowcell:has-text("FranceParis.")')).toBeVisible();
}

async EnableClientSecretValidity() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.getByRole('button', { name: 'New Client Secret' }).click();
    await this.page.getByRole('textbox', { name: 'Enter notes for new client' }).fill('NairobiKenya.');
    await this.page.locator('.e-switch-handle').first().click();
    await this.page.locator("(//*[@class='e-input-group-icon e-date-icon e-icons'])[1]").click();
    const activeDate = await this.page.locator('.e-calendar td:not(.e-other-month):not(.e-disabled)').first();
    await activeDate.click();
    await this.page.getByRole('button', { name: 'Generate' }).click();
    const toaster = await this.page.getByText('Secret key added successfully');
    await expect(toaster).toContainText('Secret key added successfully');
    await this.navigateToOAuthApps();
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await expect(this.page.locator("//*[@class='e-headertext' and contains(text(),'Valid Till')]")).toBeVisible();
}

async DeleteClientScreatKey() {
    await this.page.locator("//table[@class='e-table']//tr[@class='e-row'][1]").click();
    await this.page.locator('td.e-rowcell[aria-label*="FranceParis"]').hover();
    await this.page.locator("(//*[@class='sf-icon-Delete1'])[2]").click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    await this.page.goto(baseUrl+oAuthAppsUrl);
    await this.DeleteApp();
}

async CreateAppAndEnableImplicitFlow() {
    await this.page.getByRole('button', { name: 'Create App' }).click();
    await this.page.getByRole('textbox', { name: 'Enter name...' }).fill('Bolddesk App');
    await this.page.getByText('Add Description').click();
    await this.page.getByRole('textbox', { name: 'Description' }).fill('Ticket reports');
    await this.page.getByRole('textbox', { name: 'https://' }).fill(baseUrl);
    await this.page.locator("(//*[@class='e-switch-inner'])[1]").click();
    await this.page.locator("(//*[@class='e-control e-textbox e-lib e-input'])[3]").fill(productionUrl)
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Application created successfully');
    await expect(toaster).toContainText('Application created successfully');
    await expect(this.page).toHaveTitle(/App Details - Settings - BoldSign/);
    await this.navigateToOAuthApps();
    await expect(this.page.locator(
        "//tr[@class='e-row']//td[@class='e-rowcell' and contains(.,'Bolddesk App')]")).toBeVisible();
    await this.page.goto(baseUrl+oAuthAppsUrl);
    await this.DeleteApp();
}

async CreateAppWithClientSecretValidity() {
    await this.page.getByRole('button', { name: 'Create App' }).click();
    await this.page.getByRole('textbox', { name: 'Enter name...' }).fill('Bolddesk App');
    await this.page.locator('#keyValidity').getByRole('switch').locator('span').nth(3).click();
    await this.page.locator("(//*[@class='e-input-group-icon e-date-icon e-icons'])[1]").click();
    const activeDate = await this.page.locator('.e-calendar td:not(.e-other-month):not(.e-disabled)').first();
    await activeDate.click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Application created successfully');
    await expect(toaster).toContainText('Application created successfully');
    await expect(this.page).toHaveTitle(/App Details - Settings - BoldSign/);
    await this.navigateToOAuthApps();
    await expect(this.page.locator(
        "//tr[@class='e-row']//td[@class='e-rowcell' and contains(.,'Bolddesk App')]")).toBeVisible();
    await this.page.goto(baseUrl+oAuthAppsUrl);
    await this.DeleteApp();
}

async ChangeBillingOptionsToChargeMyAccount() {
    await this.page.getByRole('button', { name: 'Create App' }).click();
    await this.page.getByRole('textbox', { name: 'Enter name...' }).fill('Bolddesk App');
    await this.page.getByText('Add Description').click();
    await this.page.getByRole('textbox', { name: 'Description' }).fill('Ticket reports');
    await this.page.getByRole('textbox', { name: 'https://' }).fill(baseUrl);
    await this.page.locator("(//*[@class='e-switch-inner'])[1]").click();
    await this.page.locator('label').filter({ hasText: 'Charge my account' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
    const toaster = await this.page.getByText('Application created successfully');
    await expect(toaster).toContainText('Application created successfully');
    await expect(this.page).toHaveTitle(/App Details - Settings - BoldSign/);
    await this.navigateToOAuthApps();
    await expect(this.page.locator(
        "//tr[@class='e-row']//td[@class='e-rowcell' and contains(.,'Bolddesk App')]")).toBeVisible();
    await this.page.goto(baseUrl+oAuthAppsUrl);
    await this.DeleteApp();
}
}