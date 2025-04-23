import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { SignInPage } from './signInPage';
import { baseUrl, profileUrl } from '../urls';


let pagetitle: string;
export class ProfilePage {
    private signIn: SignInPage;
    constructor(private page: Page) {
        this.signIn = new SignInPage(page);
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async verifyPageTitle(title: string,) {
        await this.page.waitForLoadState('networkidle');
        console.log("Title: ", await this.page.title());
        pagetitle = await this.page.title();
        expect(pagetitle).toBe(title);
    }

    generateRandomPhoneNumber(): string {
        // Implement your logic to generate a random phone number
        return '9' + this.getRandomNumber(100000000, 999999999).toString();
    }

    getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async editSignature() {
        await this.navigateTo(baseUrl + profileUrl)
        await this.page.hover('div#drawSignatureDiv');
        await this.page.locator("(//span[text()='Edit'])[1]").click();

        // Enter a valid signature and save
        await this.page.getByRole('button', { name: 'Type' }).click();
        await this.page.getByRole('textbox', { name: 'Enter Name...' }).fill('Dhilip kumar');
        await this.page.getByRole('button', { name: 'Choose font 3 of 4 for the' }).click();
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async editInitials() {
        await this.navigateTo(baseUrl + profileUrl)
        await this.page.hover('div#drawInitialDiv');
        await this.page.locator("(//span[text()='Edit'])[2]").click();

        // Enter valid initials and save
        await this.page.getByRole('button', { name: 'Type' }).click();
        await this.page.getByPlaceholder('Enter Initials...').fill('R');
        await this.page.getByRole('button', { name: 'Choose font 3 of 4 for the' }).click();
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async updatePassword(page: Page, oldPassword: string, newPassword: string) {
        await page.getByRole('row', { name: 'Password Change' }).getByRole('link').click();
        await page.getByLabel('Old Password').fill(oldPassword);
        await page.getByLabel('New Password').fill(newPassword);
        await page.getByLabel('Confirm Password').fill(newPassword);
        await page.getByRole('button', { name: 'Change Password' }).click();
    }

    async verifySettings() {
        await this.navigateTo(baseUrl + profileUrl)
        // Go to settings tab
        await this.page.getByLabel('tab-header').getByText('Settings').click();
        //Select the Date format
        await this.page.locator("(//div[@class='dateAndTime-format'])[1]").click();
        await this.page.locator("//li[text()='MM/dd/yyyy']").click();
        //Select the Time format
        await this.page.locator("(//div[@class='dateAndTime-format'])[2]").click();
        await this.page.locator("//li[text()='h:mm tt']").click();
        //Select the Time Zone
        await this.page.locator("//span[@aria-describedby='timeZoneDropdownlist']").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('option', { name: '(UTC+09:00) Korea Standard Time ( Asia/Pyongyang )' }).click();
        //Enable or Disable the Signature Settings
        await this.page.locator("//div[@role='switch']").click();
        await this.page.getByRole('button', { name: 'Save Changes' }).click();
        await expect(this.page.getByText('Profile updated successfully')).toBeVisible();
    }

    async verifynotification() {
        await this.navigateTo(baseUrl + profileUrl)
        //Go to notification tab
        await this.page.getByText('Notifications', { exact: true }).click();
        // Example of handling checkboxes
        await this.page.getByRole('checkbox', { name: 'Select All' }).first().click();
        await this.page.getByRole('button', { name: 'Save changes' }).click();
        // Update notification preferences
        await this.page.getByRole('checkbox', { name: 'Receive a document to sign' }).first().click();
        await this.page.getByRole('checkbox', { name: 'Sender revokes the document' }).first().click();
        await this.page.getByRole('button', { name: 'Save changes' }).click();
        await expect(this.page.getByText('Profile updated successfully')).toBeVisible();
    }

    async invalidOldPassword() {
        await this.navigateTo(baseUrl + profileUrl)
        await this.page.getByRole('row', { name: 'Password Change' }).getByRole('link').click();
        await this.page.getByLabel('Old Password').fill('fwefrwrgf');
        await this.page.getByLabel('New Password').fill('Test_123');
        await this.page.getByLabel('Confirm Password').fill('Test_123');
        await this.page.getByRole('button', { name: 'Change Password' }).click();
        const toastermsg = this.page.locator("//div[text()='Old Password is incorrect.']")
        await expect(toastermsg).toContainText('Old Password is incorrect')
    }

    async emptypasswords() {
        await this.navigateTo(baseUrl + profileUrl);
        await this.page.getByRole('row', { name: 'Password Change' }).getByRole('link').click();
        await this.page.getByRole('button', { name: 'Change Password' }).click();
        const oldpassword = this.page.locator('span#old_password_validation')
        const newpassowrd = this.page.locator('span#new_password_validation')
        const confirmpassword = this.page.locator('div#confirm-password-field')
        await expect(oldpassword).toBeVisible();
        await expect(newpassowrd).toBeVisible();
        await expect(confirmpassword).toBeVisible();
    }

    async passwordChange() {
        const password = 'Dhilip1!';
        const newPassword = 'Test_123';
        await this.navigateTo(baseUrl + profileUrl)
        await this.updatePassword(this.page, password, newPassword);
        await this.updatePassword(this.page, newPassword, password);
    }

    async newoldpassword() {
        const newPassword = 'Test_123';
        await this.navigateTo(baseUrl + profileUrl)
        await this.updatePassword(this.page, newPassword, newPassword);
        const errormessage = this.page.locator('span#new_password_validation')
        await expect(errormessage).toBeVisible();
    }

    async mismatchpassword() {
        const oldpassword = 'Dhilip1!';
        const newPassword = 'Test_123';
        await this.navigateTo(baseUrl + profileUrl)
        await this.page.getByRole('row', { name: 'Password Change' }).getByRole('link').click();
        await this.page.getByLabel('Old Password').fill(oldpassword);
        await this.page.getByLabel('New Password').fill(newPassword);
        await this.page.getByLabel('Confirm Password').fill('efefweg');
        await this.page.getByRole('button', { name: 'Change Password' }).click();
        const mismatchpassword = this.page.locator("//span[text()='Passwords do not match']")
        await expect(mismatchpassword).toContainText('Passwords do not match');
    }

    async emptyemail() {
        await this.navigateTo(baseUrl + profileUrl)
        await this.page.getByRole('row', { name: 'Verification Email Add' }).locator('a').click();
        await this.page.getByRole('button', { name: 'Verify Email Address' }).click();
        await this.page.locator('#getRecoveryEmail').getByText('Enter a valid email address').click();
        const emptyemail = this.page.locator(" //span[text()='Enter a valid email address']");
        await expect(emptyemail).toContainText('Enter a valid email address');
    }

    async emptyphone() {
        await this.navigateTo(baseUrl + profileUrl)
        await this.page.getByRole('row', { name: 'Phone Number (SMS) Add' }).locator('a').click();
        await this.page.getByRole('button', { name: 'Verify Phone Number' }).click();
        const errormessage = this.page.locator("//span[text()='Enter a valid phone number']")
        await expect(errormessage).toContainText('Enter a valid phone number')
    }

    async invalidphone() {
        await this.navigateTo(baseUrl + profileUrl)
        await this.page.getByRole('row', { name: 'Phone Number (SMS) Add' }).locator('a').click();
        await this.page.getByRole('button', { name: 'Verify Phone Number' }).click();
        const errormessage = this.page.locator("//span[text()='Enter a valid phone number']")
        await expect(errormessage).toContainText('Enter a valid phone number')
    }

    async change_email_validation() {
        const email = 'dhilipkumarrajasekaran@syncfusion.com';
        const existingEmail = 'dhilipkumarrajasekaran@syncfusion.com';
        const invalidEmail = 'permission@.com';
        await this.navigateTo(baseUrl + profileUrl);
        await this.page.getByRole('row', { name: `Email Address ${email}` }).getByRole('link').click();
        await this.page.waitForLoadState('networkidle');
        await this.signIn.typeOTP({ page: this.page, firstname: 'Dhilip', subject: 'Your verification code for verifying your email' });

        // Verify the change email page
        await this.page.getByLabel('Email*').fill(invalidEmail);
        await this.verifyPageTitle('Change Email - BoldSign');

        // Enter invalid email address
        await this.page.getByRole('button', { name: 'Change Email' }).click();
        await expect(this.page.getByText('Enter a valid email')).toBeVisible();

        //Empty email field
        await this.page.getByLabel('Email*').clear();
        await this.page.getByRole('button', { name: 'Change Email' }).click();
        await expect(this.page.getByText('Please enter your email')).toBeVisible();

        //Existing email address
        await this.page.getByLabel('Email*').fill(existingEmail);
        await this.page.getByRole('button', { name: 'Change Email' }).click();
        await expect(this.page.getByText('Email address already exists')).toBeVisible();
    }

    async authenticator_Validation() {
        await this.navigateTo(baseUrl + profileUrl);
        await this.page.getByRole('row', { name: 'Authenticator App Add' }).locator('a').click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
        const emptycode = await this.page.locator('#setUpAuthenticatorApp').getByText('The verification code must');
        await expect(emptycode).toBeVisible();
        await this.page.getByPlaceholder('Enter verification code').fill('123456');
        await this.page.getByRole('button', { name: 'Continue' }).click();
        const invalidcode = await this.page.locator('#setUpAuthenticatorApp').getByText('Invalid Code');
        await expect(invalidcode).toBeVisible();
        await this.page.locator('#setUpAuthenticatorApp').getByTitle('Close').click();
    }

    async fieldValidation() {
        await this.navigateTo(baseUrl + profileUrl);

        const textFields = [
            { role: 'row', name: 'First Name Dhilip', index: 1 },
            { role: 'row', name: 'Last Name Kumar', index: 2 },
            { role: 'cell', name: '123456789', index: 3 },
            { role: 'cell', name: 'tester', index: 4 }
        ];

        for (const field of textFields) {
            await this.page.getByRole(field.role as 'row' | 'cell', { name: field.name })
                .locator(`(//input[@role='textbox'])[${field.index}]`)
                .clear();
        }

        await this.page.getByRole('button', { name: 'Save changes' }).click();
        const emptyFieldError = this.page.locator("//span[text()='This field is required']");
        await expect(emptyFieldError).toBeVisible();
    }

    async updateProfileDetails() {
        await this.page.getByRole('row', { name: 'First Name' }).locator("(//input[@role='textbox'])[1]").fill('Dhilip');
        await this.page.getByRole('row', { name: 'Last Name' }).locator("(//input[@role='textbox'])[2]").fill('Kumar');
        await this.page.getByRole('row', { name: 'Phone', exact: true }).locator("(//input[@role='textbox'])[3]").fill('123456789');
        await this.page.getByRole('row', { name: 'Job Title' }).locator("(//input[@role='textbox'])[4]").fill('tester');
        await this.page.getByRole('button', { name: 'Save changes' }).click();
        const updatestatus = await this.page.getByText('Profile updated successfully');
        await expect(updatestatus).toBeVisible();
    }

}



