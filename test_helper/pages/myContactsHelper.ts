import { expect, Page } from '@playwright/test';
import { mycontactsUrl, baseUrl } from '../urls';
export class ContactsHelper {
 
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
    
    async deleteContact() {
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
      const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
      await kebabmenu.hover();
      await kebabmenu.click();
      await this.page.getByRole('menuitem', { name: ' Delete' }).click();
      await this.page.getByRole('button', { name: 'Yes, delete' }).click();
      const toaster = await this.page.getByText('Contact(s) was deleted successfully');
      await expect(toaster).toContainText('Contact(s) was deleted successfully');
    }

     async emptyContactName (){
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Add new contact', { exact: true }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('');
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('testing@cubeflake.com');
      await expect(this.page.getByText('Name field is required')).toBeVisible();
     }

     async emptyEmail (){
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Add new contact', { exact: true }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('Cubeflake');
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('');
      await this.page.locator("(//*[@class='add-contacts-container'])").click();
      await expect(this.page.getByText('Email field is required')).toBeVisible();
     }

     async invalidPhoneNumber (){
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Add new contact', { exact: true }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('Cubeflake');
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('test@cubeflake.com');
      await this.page.locator("//*[@id='phContact']").click();
      await this.page.locator("//*[@id='phContact']").fill('12345');
      await this.page.getByRole('button', { name: 'Add' }).click();
      await expect(this.page.getByText('Enter a valid phone number')).toBeVisible();
    }

    async contactWithExistingEmail() {
      await this.createNewContact();
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Add new contact', { exact: true }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('Simon');
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('simonmadebao@syncfusion.com');
      await this.page.locator("(//*[@class='add-contacts-container'])").click();
      await this.page.getByRole('button', { name: 'Add' }).click();
      await this.page.waitForLoadState('networkidle'); 
      await expect(this.page.getByText('Email already exists')).toBeVisible();
      await this.deleteContact();
    }
    
    async invalidEmail (){
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Add new contact', { exact: true }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('Cubeflake');
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('testme.com');
      await this.page.locator("(//*[@class='add-contacts-container'])").click();
      await expect(this.page.getByText('Invalid email address')).toBeVisible();
    }

     async downloadSampleCSVFile() {
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Add new contact', { exact: true }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('Cubeflake');
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('test@cubeflake.com');
      await this.page.locator("(//*[@class='add-contacts-container'])").click();
      await this.page.locator("(//*[@id='downloadSampleCsv'])[2]").click();
   }
  
    async importFromCSV() {
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Add new contact', { exact: true }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('Lorine');
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('lorinenighto@syncfusion.com'); 
      await this.page.locator("(//*[@class='add-contacts-container'])").click();
      await this.page.setInputFiles('input[type=file]', './Data/SampleContacts (10).csv');
      await this.page.getByRole('button', { name: 'Add' }).click();
      await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
      const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
      await kebabmenu.hover();
      await kebabmenu.click();
      await this.page.getByRole('menuitem', { name: ' Delete' }).click();
      await this.page.getByRole('button', { name: 'Yes, delete' }).click();
  }
  
  async editContact(){
    await this.createNewContact();
    await this.navigateTo(baseUrl + mycontactsUrl);
    await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
    const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
    await kebabmenu.hover();
    await kebabmenu.click();
    await this.page.getByRole('menuitem', { name: ' Edit contact' }).click();
    const randomName = `User${Math.floor(Math.random() * 10000)}`;
    await this.page.locator("#new_contact_name").fill(randomName);
    await this.page.getByRole('button', { name: 'Update' }).click();
    await this.page.waitForLoadState('networkidle'); 
    const toaster = await this.page.getByText('Contact was updated successfully');
    await expect(toaster).toContainText('Contact was updated successfully');
    await this.deleteContact();
}

async editInvalidPhone (){
    await this.createNewContact();
    await this.navigateTo(baseUrl+mycontactsUrl);
    await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
    const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
    await kebabmenu.hover();
    await kebabmenu.click();
    await this.page.getByRole('menuitem', { name: ' Edit contact' }).click();
    await this.page.locator("//*[@id='editPhContact']").fill('1263');
    await this.page.getByRole('button', { name: 'Update' }).click();
    await expect(this.page.getByText('Enter a valid phone number')).toBeVisible();
    await this.deleteContact();
}

async editInvalidEmail (){
  await this.createNewContact();
  await this.navigateTo(baseUrl+mycontactsUrl);
  await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
  const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
  await kebabmenu.hover();
  await kebabmenu.click();
  await this.page.getByRole('menuitem', { name: ' Edit contact' }).click();
  await this.page.locator("//*[@id='new_contact_email']").fill('testme.com');
  await expect(this.page.getByText('Invalid email address')).toBeVisible();
  await this.deleteContact();
}

async copyContactId() {
  await this.createNewContact();
  await this.navigateTo(baseUrl+mycontactsUrl);
  await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
  const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
  await kebabmenu.hover();
  await kebabmenu.click();
  const copyContactIdMenuItem = await this.page.getByRole('menuitem', { name: ' Copy contact ID' });
  await copyContactIdMenuItem.click();
  await this.page.waitForLoadState('networkidle'); 
  const toaster = await this.page.getByText('Contact ID was successfully copied to your clipboard');
  await expect(toaster).toContainText('Contact ID was successfully copied to your clipboard');
  await this.deleteContact();
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

  async deleteContactGroup (){
    await this.navigateTo(baseUrl+mycontactsUrl);
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

  async contactGroupWithExistingGroupName(){
      await this.addNewContactGroup();
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Contact Groups').click();
      await this.page.getByText('Add new contact group').click();
      await this.page.getByPlaceholder('Enter contact group name').fill('Contact Group');
      await this.page.getByRole('textbox', { name: 'Name*' }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('Simon');
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('simonmadebao@syncfusion.com');
      await this.page.getByRole('button', { name: 'Create', exact: true }).click();
      await this.page.waitForLoadState('networkidle'); 
      const toaster = await this.page.getByText('Group name already exists');
      await expect(toaster).toContainText('Group name already exists');
      await this.deleteContactGroup();
  }

     async emptyContactGroupName(){
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Contact Groups').click();
      await this.page.getByText('Add new contact group').click();
      await this.page.getByRole('button', { name: 'Create', exact: true }).click();
      await expect(this.page.getByText('Groupname field is required')).toBeVisible();
    }
  
    async editContactGroup () {
      await this.addNewContactGroup();
      await this.navigateTo(baseUrl + mycontactsUrl);
      await this.page.getByText('Contact Groups').click();
      await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
      const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
      await kebabmenu.hover();
      await kebabmenu.click();
      await this.page.getByRole('menuitem', { name: ' Edit contact' }).click();
      const randomGroupName = `Group${Math.floor(Math.random() * 10000)}`;
      await this.page.locator("//*[@id='groupName']").click();
      await this.page.locator("//*[@id='groupName']").fill(randomGroupName);
      await this.page.getByRole('button', { name: 'Update' }).click();
      const toaster = await this.page.getByText('Contact group was successfully updated');
      await expect(toaster).toContainText('Contact group was successfully updated');
      await this.deleteContactGroup();
   }

    async copyContactIdforContactGroup (){
      await this.addNewContactGroup();
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Contact Groups').click();
      await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
      const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
      await kebabmenu.hover();
      await kebabmenu.click();
      await this.page.getByRole('menuitem', { name: ' Copy contact ID' }).click();
      const toaster = await this.page.getByText('Contact ID was successfully copied to your clipboard');
      await expect(toaster).toContainText('Contact ID was successfully copied to your clipboard');
      await this.deleteContactGroup();
     }

    async searchContact (){
      await this.addNewContactGroup();
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByPlaceholder('Search contacts').click();
      await this.page.getByPlaceholder('Search contacts').fill('Simon');
      await this.page.getByPlaceholder('Search contacts').press('Enter');
      await this.deleteContactGroup();
    }

    async importFromCSVGroupContact () {
      await this.navigateTo(baseUrl + mycontactsUrl);
      await this.page.getByText('Contact Groups').click();
      await this.page.getByText('Add new contact group').click();
      const randomGroupName = `Group_${Math.floor(Math.random() * 10000)}`;
      await this.page.getByPlaceholder('Enter contact group name').fill(randomGroupName);
      await this.page.setInputFiles('input[type=file]', './Data/SampleContactGroups.csv');
      await this.page.getByRole('button', { name: 'Create', exact: true }).click();
      const toaster = await this.page.getByText('Contact group was successfully added');
      await expect(toaster).toContainText('Contact group was successfully added');
      await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
      const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
      await kebabmenu.hover();
      await kebabmenu.click();
      await this.page.getByRole('menuitem', { name: ' Delete' }).click();
      await this.page.getByRole('button', { name: 'Yes, delete' }).click();
  }
  
    async addUsersToContactGroup (){
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Contact Groups').click();
      await this.page.getByText('Add new contact group').click();
      await this.page.getByPlaceholder('Enter contact group name').fill('New Group');
      await this.page.getByRole('textbox', { name: 'Name*' }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('simon');
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('simonmadebao@syncfusion.com');
      await this.page.locator("(//*[@class='sf-icon-AddNew'])[1]").click();
      await this.page.locator("#name_1").click();
      await this.page.locator("#name_1").fill('kevin');
      await this.page.locator("#email_1").click();
      await this.page.locator("#email_1").fill('kevinodangamatete@syncfusion.com');
      await this.page.getByRole('button', { name: 'Create', exact: true }).click();
      await this.page.locator("(//*[@class='e-rowcell e-templatecell e-lastrowcell'])[1]").hover();
      const kebabmenu = await this.page.locator("(//*[@id='formMenuItems'])[1]");
      await kebabmenu.hover();
      await kebabmenu.click();
      await this.page.getByRole('menuitem', { name: ' Delete' }).click();
      await this.page.getByRole('button', { name: 'Yes, delete' }).click();
    }

    async downloadSampleCSVContactGroup (){
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Contact Groups').click();
      await this.page.getByText('Add new contact group').click();
      await this.page.getByPlaceholder('Enter contact group name').fill('Group121');
      await this.page.locator("(//*[@id='downloadSampleCsv'])[1]").click();
    }

    async emptyNameForContactGroup (){
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Contact Groups').click();
      await this.page.getByText('Add new contact group').click();
      await this.page.getByPlaceholder('Enter contact group name').fill('Group121');;
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('rayronaldocholao@syncfusion.com');
      await this.page.getByRole('button', { name: 'Create', exact: true }).click();
      await expect(this.page.getByText('Name field is required')).toBeVisible();
    }

    async emptyEmailForContactGroup (){
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Contact Groups').click();
      await this.page.getByText('Add new contact group').click();
      await this.page.getByPlaceholder('Enter contact group name').fill('Group121');
      await this.page.getByRole('textbox', { name: 'Name*' }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('Cubeflakes');
      await this.page.getByRole('button', { name: 'Create', exact: true }).click();
      await expect(this.page.getByText('Email field is required')).toBeVisible();
    }

    async deleteMultipleContacts() {
      await this.createNewContact();
      await this.page.waitForLoadState('networkidle');
      await this.navigateTo(baseUrl+mycontactsUrl);
      await this.page.getByText('Add new contact', { exact: true }).click();
      await this.page.getByRole('textbox', { name: 'Name*' }).fill('Brenda');
      await this.page.getByRole('textbox', { name: 'Email*' }).click();
      await this.page.getByRole('textbox', { name: 'Email*' }).fill('brendanelsonm@syncfusion.com');
      await this.page.locator("(//*[@class='add-contacts-container'])").click();
      await this.page.getByRole('button', { name: 'Add' }).click();
      await this.page.waitForLoadState('networkidle');
      await this.page.locator("(//*[@class='e-rowcell e-gridchkbox'])[1]").hover();
      await this.page.getByRole('row', { name: 'checkbox Brenda column header' }).locator('span').first().click();
      await this.page.locator("(//*[@class='e-row e-altrow'])[1]").hover();
      await this.page.getByRole('row', { name: 'checkbox simon column header' }).locator('span').first().click();
      await this.page.getByRole('button', { name: 'Delete' }).click();
      await this.page.getByRole('button', { name: 'Yes, delete' }).click();
      const toaster = await this.page.getByText('Contact(s) was deleted successfully');
      await expect(toaster).toContainText('Contact(s) was deleted successfully');
    }

}