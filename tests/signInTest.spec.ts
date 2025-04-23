import { test, expect, Page, BrowserContext } from '@playwright/test';
import { SignInPage } from '../test_helper/pages/signInPage';
import { baseUrl } from '../test_helper/urls';

test.describe('Sign in page Test', () => {
  let context: BrowserContext;
  let page: Page;
  let signInPage: SignInPage;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({});
    page = await context.newPage();
    signInPage = new SignInPage(page);
  });

  test('Verify the sign in with valid credentials', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await signInPage.login('dhilipkumarrajasekaran@syncfusion.com', 'Dhilip1!', 'Dhilip');
    await context.clearCookies();
  });

  test('Verify the sign in without email', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await signInPage.login('', '', '');
    await expect(page.getByText('Please enter your email')).toBeVisible();
  });

  test('Verify the sign in with invalid email', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await signInPage.login('invalidEmail', '', '');
    await expect(page.getByText('Enter a valid email')).toBeVisible();
  });

  test('Verify the sign in without password', async () => {
    test.info().annotations.push({ type: 'Website link', description: baseUrl });
    await page.waitForLoadState('networkidle');
    await signInPage.login('test@gmail.com', '', '');
    await expect(page.getByText('Please enter your password')).toBeVisible();
  });

  test.afterAll(async () => {
    await page.close();
  });

});
