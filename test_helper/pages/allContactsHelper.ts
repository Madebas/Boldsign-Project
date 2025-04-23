import { expect, Page } from '@playwright/test';
import { allcontactsUrl, baseUrl, mycontactsUrl} from '../urls';
export class AllContactsHelper {
 
    constructor(public page: Page) {}

    async navigateTo(url: string) {
      await this.page.goto(url);
    }

    async createNewContact () {
        await this.navigateTo(baseUrl+mycontactsUrl);
        await this.page.getByText('Add new contact', { exact: true }).click();
        await this.page.getByRole('textbox', { name: 'Name*' }).fill('Simon');
        await this.page.getByRole('textbox', { name: 'Email*' }).click();
        await this.page.getByRole('textbox', { name: 'Email*' }).fill('simonmadebao@syncfusion.com');
        await this.page.locator("(//*[@class='add-contacts-container'])").click();
        await this.page.getByRole('button', { name: 'Add' }).click();
        const toaster = await this.page.getByText('New contact was created successfully');
        await expect(toaster).toContainText('New contact was created successfully');
      }

    async copyContactId(){
        await this.createNewContact();
        await this.navigateTo(baseUrl+allcontactsUrl);
        await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[2]").hover();
        const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
        await kebabmenu.hover();
        await kebabmenu.click();
        const copyContactIdMenuItem = await this.page.getByRole('menuitem', { name: ' Copy contact ID' });
        await copyContactIdMenuItem.click();
        await this.page.waitForLoadState('networkidle'); 
        const toaster = await this.page.getByText('Contact ID was successfully copied to your clipboard');
        await expect(toaster).toContainText('Contact ID was successfully copied to your clipboard');
        await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[2]").hover();
        const kebabmenu1 = await this.page.locator("(//*[@id='formMenuItems'])[1]");
        await kebabmenu1.hover();
        await kebabmenu1.click();
        await this.page.getByRole('menuitem', { name: ' Delete' }).click();
        await this.page.getByRole('button', { name: 'Yes, delete' }).click();
    }

    async deleteContact(){
        await this.createNewContact();
        await this.page.waitForLoadState('networkidle'); 
        await this.navigateTo(baseUrl+allcontactsUrl);
        await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[2]").hover();
        const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
        await kebabmenu.hover();
        await kebabmenu.click();
        await this.page.getByRole('menuitem', { name: ' Delete' }).click();
        await this.page.getByRole('button', { name: 'Yes, delete' }).click();
        await this.page.waitForLoadState('networkidle'); 
        const toaster = await this.page.getByText('Contact(s) was deleted successfully');
        await expect(toaster).toContainText('Contact(s) was deleted successfully');
    }

    async searchContacts(){
        await this.createNewContact();
        await this.page.waitForLoadState('networkidle'); 
        await this.navigateTo(baseUrl+allcontactsUrl);
        await this.page.getByPlaceholder('Search contacts').click();
        await this.page.getByPlaceholder('Search contacts').fill('Simon');
        await this.page.getByPlaceholder('Search contacts').press('Enter');
        await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[2]").hover();
        const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
        await kebabmenu.hover();
        await kebabmenu.click();
        await this.page.getByRole('menuitem', { name: ' Delete' }).click();
        await this.page.getByRole('button', { name: 'Yes, delete' }).click();
    }

    async addNewContactGroup() {
        await this.navigateTo(baseUrl + mycontactsUrl);
        await this.page.getByText('Contact Groups').click();
        await this.page.getByText('Add new contact group').click();
        await this.page.getByPlaceholder('Enter contact group name').fill('Contact Group');
        await this.page.getByRole('textbox', { name: 'Name*' }).click();
        await this.page.getByRole('textbox', { name: 'Name*' }).fill('simon');
        await this.page.getByRole('textbox', { name: 'Email*' }).click();
        await this.page.getByRole('textbox', { name: 'Email*' }).fill('simonmadebao@syncfusion.com');
        await this.page.getByRole('button', { name: 'Create', exact: true }).click();
        const toaster = await this.page.getByText('Contact group was successfully added');
        await expect(toaster).toContainText('Contact group was successfully added');
      }

    async copyContactIdContactGroups(){
        await this.addNewContactGroup();
        await this.page.waitForLoadState('networkidle'); 
        await this.navigateTo(baseUrl+allcontactsUrl);
        await this.page.getByText('Contact Groups').click();
        await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
        const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
        await kebabmenu.hover();
        await kebabmenu.click();
        const copyContactIdMenuItem = await this.page.getByRole('menuitem', { name: ' Copy contact ID' });
        await copyContactIdMenuItem.click();
        await this.page.waitForLoadState('networkidle'); 
        const toaster = await this.page.getByText('Contact ID was successfully copied to your clipboard');
        await expect(toaster).toContainText('Contact ID was successfully copied to your clipboard');
        await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
        const kebabmenu1 = await this.page.locator("(//*[@id='formMenuItems'])[1]");
        await kebabmenu1.hover();
        await kebabmenu1.click();
        await this.page.getByRole('menuitem', { name: ' Delete' }).click();
        await this.page.getByRole('button', { name: 'Yes, delete' }).click();
    }

    async deleteContactGroups(){
        await this.addNewContactGroup();
        await this.page.waitForLoadState('networkidle'); 
        await this.navigateTo(baseUrl+allcontactsUrl);
        await this.page.getByText('Contact Groups').click();
        await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
        const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
        await kebabmenu.hover();
        await kebabmenu.click();
        await this.page.getByRole('menuitem', { name: ' Delete' }).click();
        await this.page.getByRole('button', { name: 'Yes, delete' }).click();
        const toaster = await this.page.getByText('Contact group was successfully deleted');
        await expect(toaster).toContainText('Contact group was successfully deleted');
    }

    async deleteMultipleContacts(){
      await this.createNewContact();
      await this.page.waitForLoadState('networkidle');
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Add new contact', { exact: true }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('Brenda');
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('brendanelsonm@syncfusion.com');
      await this.page.locator("(//*[@class='add-contacts-container'])").click();
      await this.page.getByRole('button', { name: 'Add' }).click();
      await this.navigateTo(baseUrl+allcontactsUrl);
      await this.page.waitForLoadState('networkidle');
      await this.page.locator("(//*[@class='e-rowcell e-gridchkbox'])[1]").hover();
      await this.page.locator("//*[@id='contactsListGrid_content_table']/tbody/tr[1]/td[1]/div/span[1]").click();
      await this.page.locator("(//*[@class='e-row e-altrow'])[1]").hover();
      await this.page.locator("//*[@id='contactsListGrid_content_table']/tbody/tr[2]/td[1]/div/span[1]").click();
      await this.page.getByRole('button', { name: 'Delete' }).click();
      await this.page.getByRole('button', { name: 'Yes, delete' }).click();
      const toaster = await this.page.getByText('Contact(s) was deleted successfully');
      await expect(toaster).toContainText('Contact(s) was deleted successfully');
    }
}