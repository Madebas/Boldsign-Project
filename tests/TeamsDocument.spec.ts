import { test, expect, Page, BrowserContext } from '@playwright/test';
import { SignInPage } from '../../test_helper/pages/signInPage';

import { TeamsDocumentHelper } from '../../test_helper/pages/TeamsDocumentHelper';






   

    test.afterAll(async () => {
        await page.close();
    });

    test.beforeEach(async () => {
        await teamsDocumentHelper.navigateToTeamsDocument();
        test.info().annotations
        .push({ type: 'Website link', description: baseUrl });
    });

   

    test('Verify Filter Both option by Status', async () => {
        await teamsDocumentHelper.FilterBothOptionbyStatus();
    });

    test('Verify Filter Sent option by Status', async () => {
        await teamsDocumentHelper.FilterSentoptionbyStatus();
    });

    test('Verify Filter Received option by Status', async () => {
        await teamsDocumentHelper.FilterReceivedoptionbyStatus();
    });

    test('Verify Reset Filters', async () => {
        await teamsDocumentHelper.ResetFilters();
    });

    test('Verify Clear all Filters ', async () => {
        await teamsDocumentHelper.ClearallFilters();
    });

    test(
        'Verify Pin To Dashboard Without Entering Widget Name'
        , async () => {
        await teamsDocumentHelper
        .PinToDashboardWithoutEnteringWidgetName();
    });

    test('Verify Pin To Dashboard', async () => {
        await teamsDocumentHelper.PinToDashboard();
    });

    test('Verify Delete Pin To Dashboard', async () => {
        await teamsDocumentHelper.DeletePinToDashboard();
    });

    test('Verify Filter by All Teams', async () => {
        await teamsDocumentHelper.FilterbyAllTeams();
    });

    test('Verify Filter by Team Member', async () => {
        await teamsDocumentHelper.FilterbyTeamMember();
    });

    test('Verify Filter all by All button ', async () => {
        await teamsDocumentHelper.FilterallbyAllbutton();
    });

    test('Verify Filter by Team member pending button ', async () => {
        await teamsDocumentHelper.FilterbyTeammemberpendingbutton();
    });

    test('Verify Filter by Waiting for others button ', async () => {
        await teamsDocumentHelper.FilterbyWaitingforothersbutton();
    });

    test('Verify Copy Document ID', async () => {
        await teamsDocumentHelper.CopyDocumentID();
    });

    test('Verify Add Tags', async () => {
        await teamsDocumentHelper.AddTags();
    });

    test(' Verify Filter Both option by Tags', async () => {
        await teamsDocumentHelper.FilterBothoptionbyTags();
    });

    test('Verify Filter Sent option by Tags', async () => {
        await teamsDocumentHelper.FilterSentoptionbyTags();
    });

    test('Verify Filter Received option by Tags', async () => {
        await teamsDocumentHelper.FilterReceivedoptionbyTags();
    });

    test('Verify Filter Both option by Date Range', async () => {
        await teamsDocumentHelper.FilterBothoptionbyDateRange();
    });

    test(
        'Verify Filter Both option by Status, Tags, and Date Range'
            , async () => {
        await teamsDocumentHelper
        .FilterBothoptionbyStatusTagsandDateRange();
    });

    test('Verify Manage Tags Button', async () => {
        await teamsDocumentHelper.ManageTagsButton();
    });

    test('Verify Filter Expired Documents ', async () => {
        await teamsDocumentHelper.FilterExpiredDocuments();
    });

    test('Verify Edit Expiry Date Button', async () => {
        await teamsDocumentHelper.EditExpiryDateButton();
    });

    test('Verify Remind Now Button', async () => {
        await teamsDocumentHelper.RemindNowButton();
    });

    test('Verify Document History', async () => {
        await teamsDocumentHelper.DocumentHistory();
    });

    test('Verify Generate signing link', async () => {
        await teamsDocumentHelper.Generatesigninglink();
    });

    test('Verify Edit Recipient with Empty Fields', async () => {
        await teamsDocumentHelper.EditRecipientwithEmptyFields();
    });

    test('Verify Edit recipient', async () => {
        await teamsDocumentHelper.Editrecipient();
    });

    test('Verify Add Authentication Access Code', async () => {
        await teamsDocumentHelper.AddAuthenticationAccessCode();
    });

    test('Verify Auto Generate Authentication', async () => {
        await teamsDocumentHelper.AutoGenerateAuthentication();
    });

    test('Verify Manually Change Authentication', async () => {
        await teamsDocumentHelper.ManuallyChangeAuthentication();
    });

    test('Verify Email Access Code', async () => {
        await teamsDocumentHelper.EmailAccessCode();
    });

    test('Verify Remove Authentication', async () => {
        await teamsDocumentHelper.RemoveAuthentication();
    });

    test('Verify Email Verification', async () => {
        await teamsDocumentHelper.EmailVerification();
    });

    test('Verify Remove Email Verification', async () => {
        await teamsDocumentHelper.RemoveEmailVerification();
    });

    test('Verify View Document', async () => {
        await teamsDocumentHelper.ViewDocument();
    });

    test('Verify Re-Assign Document with Empty Fields', async () => {
        await teamsDocumentHelper.ReassignDocumentwithEmptyFields();
    });

    test('Verify Re-Assign Document', async () => {
        await teamsDocumentHelper.ReassignDocument();
    });

    test('Verify Clone Document', async () => {
        await teamsDocumentHelper.CloneDocument();
    });

    test('Verify Edit Document', async () => {
        await teamsDocumentHelper.EditDocument();
    });

    test('Verify Revoke Document with Empty Fields', async () => {
        await teamsDocumentHelper.RevokeDocumentEmptyFields();
    });

    test('Verify Revoke Document', async () => {
        await teamsDocumentHelper.RevokeDocument();
    });

    test('Verify Revoked Button filter', async () => {
        await teamsDocumentHelper.RevokeButton();
    });

    test('Verify Download document', async () => {
        await teamsDocumentHelper.Downloaddocument();
    });

    test('Verify Export form data', async () => {
        await teamsDocumentHelper.Exportformdata();
    });

    test('Verify Sign Document', async () => {
        await teamsDocumentHelper.SignDocument();
    });

    test('Verify Completed button filter', async () => {
        await teamsDocumentHelper.Completedbutton();
    });

    test('Verify Needs Attention Button filter', async () => {
        await teamsDocumentHelper.NeedsAttentionButtonfilter();
    });

    test('Verify Cancel Editing Document', async () => {
        await teamsDocumentHelper.CancelEditingDocument();
    });

    test('Verify Decline Document with Empty fields', async () => {
        await teamsDocumentHelper.DeclineDocumentwithEmpttyFields();
    });

    test('Verify Decline Document', async () => {
        await teamsDocumentHelper.DeclineDocument();
    });

    test('Verify Declined Button filter', async () => {
        await teamsDocumentHelper.DeclinedButtonfilter();
    });

    test('Verify Delete Document', async () => {
        await teamsDocumentHelper.DeleteDocument();
    });
});