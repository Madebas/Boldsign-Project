import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { baseUrl } from '../urls';
import { authenticator } from 'otplib';
import { JSDOM } from 'jsdom';
import quotedPrintable from 'quoted-printable';


let pagetitle: string;
let emailRegex: RegExp;

export class SignInPage {
    constructor(private page: Page) { }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async findSecurityCode(bodyData: string): Promise<string> {
        if (bodyData) {
            const htmlDoc = new JSDOM(bodyData);
            const securityCode = htmlDoc.window.document.getElementsByClassName('bs-security-code')[0];
            if (securityCode) {
                return securityCode.innerHTML;
            }
        }
        return '';
    }

    async typeOTP({ page, firstname, subject }: { page: Page; firstname: string; subject?: string }) {
        const automation_Url = 'http://34.54.66.79/Automation/MailHogEmail?email=';
        const Subject = subject;
        const email = 'boldsignteammembers@boldsign.com';
        const url = `${automation_Url}${email}&&subject=${Subject}&&name=${firstname}`;

        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        const user = await response.json() as { items: { html: string }[] };
        let verifyOTPBtnExists = false;

        if (user != null && user.items.length > 0) {
            const filtered = user.items;
            let securityCode = '';
            otploop: for (const item of filtered) {
                const bodyData = quotedPrintable.decode(item.html);
                securityCode = await this.findSecurityCode(bodyData);
                if (securityCode && filtered.indexOf(item) < 5) {
                    await page.waitForSelector('#otp-field', { timeout: 240000 });
                    await page.$eval('#otpTextBox', (el: HTMLInputElement) => el.value = '');
                    await page.fill('#otpTextBox', securityCode);
                    await Promise.all([page.click('#verifyOTPBtn'), page.waitForNavigation()]);
                    verifyOTPBtnExists = await page.evaluate(() => {
                        return document.querySelector('#verifyOTPBtn') !== null;
                    });
                    if (verifyOTPBtnExists) {
                        continue;
                    } else {
                        break otploop;
                    }
                } else {
                    verifyOTPBtnExists = true;
                    break otploop;
                }
            }
            if (verifyOTPBtnExists) {
                return await this.typeOTP({ page, firstname });
            }
        }
    }

    async OTP2FA() {
        let otp;
        let attempt = 0;
        while (!otp && attempt < 5) {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for OTP
            const secretKey = 'KHIYORCIRUQ3XVWGRT5TNEE4IUDKJWBL';
            otp = authenticator.generate(secretKey);
            attempt++;
        }
        if (!otp) throw new Error("Failed to retrieve OTP");
        await this.page.waitForSelector("#otp-field");
        await this.page.fill("#otpTextBox", otp);
        await this.page.click("#verifyOTPBtn");
    }

    async enterEmail(email: string) {
        await this.page.getByLabel('Email*').click();
        if (email != '') {
            await this.page.getByLabel('Email*').fill(email);
        }
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async enterPassword(password: string) {
        await this.page.getByLabel('Password*').click();
        if (password != '') {
            await this.page.getByLabel('Password*').fill(password);
        }
        await this.page.getByRole('button', { name: 'Sign In' }).click();
    }

    async verifyPageTitle(title: string,) {
        await this.page.waitForLoadState('networkidle');
        console.log("Title: ", await this.page.title());
        pagetitle = await this.page.title();
        expect(pagetitle).toBe(title);
        await this.page.waitForLoadState('networkidle');
        await this.navigateTo(baseUrl);
        await this.page.waitForLoadState('networkidle');
    }

    async login(email: string, password: string, firstname: string) {
        emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        await this.navigateTo(baseUrl);
        if (emailRegex.test(email) && password != '' && firstname != '') {
            this.enterEmail(email);
            this.enterPassword(password);
            await this.page.waitForLoadState('networkidle');
            await this.typeOTP({ page: this.page, firstname, subject: 'Your verification code from BoldSign' });
            await this.page.waitForLoadState('networkidle');
        }
        else if (email == '') {
            //Verify without email validation shown or not
            this.enterEmail(email);
        }
        else if (!emailRegex.test(email)) {
            //Verify invalid email
            this.enterEmail(email);
        }
        else if (emailRegex.test(email) && password == '') {
            //verify without 
            this.enterEmail(email);
            this.enterPassword(password);
        }
        else {
            //Verify invalid password
            this.enterEmail(email);
            this.enterPassword(password);
        }
    }

    async verifyLoginPage() {
        await this.navigateTo(baseUrl);
        //Verify Sign page title
        await this.verifyPageTitle('Login - BoldSign');
        //verify Syncfusion logo
        await expect(this.page.getByRole('img', { name: 'Syncfusion Brand Logo' })).toBeVisible();
        //Verify Email field
        await expect(this.page.getByLabel('Email*')).toBeVisible();
        //Verify Continue button
        await expect(this.page.getByRole('button', { name: 'Continue' })).toBeVisible();

        //Verify Sign in with Google option
        await expect(this.page.getByRole('link', { name: 'Sign in with Google' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Sign in with Google' }).click();
        await this.verifyPageTitle('Sign in - Google Accounts');

        //Verify Sign in with Microsoft option
        await expect(this.page.getByRole('link', { name: 'Sign in with Microsoft' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Sign in with Microsoft' }).click();
        await this.verifyPageTitle('Sign in to your account');

        //Verify Sign in with SSO button
        await expect(this.page.getByRole('link', { name: 'Sign In with SSO' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Sign In with SSO' }).click();
        await this.verifyPageTitle('Sign In with SSO - BoldSign');

        //Verify SignUp button
        await expect(this.page.getByRole('link', { name: 'Sign Up' })).toBeVisible();
        await expect(this.page.getByText('Don’t have an account?')).toBeVisible();
        await this.page.getByRole('link', { name: 'Sign Up' }).click();
        await this.verifyPageTitle('Sign Up - BoldSign');

        //Verify forget button
        this.enterEmail('test@email.com');
        await expect(this.page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Forgot password?' }).click();
        await this.verifyPageTitle('Forgot Password - BoldSign');
    }
}

