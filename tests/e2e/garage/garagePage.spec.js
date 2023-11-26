import {test} from '../../../src/fixtures/userPanel.fixture.js'
import {expect} from "@playwright/test";

test.describe('Navigation to Garage page', ()=>{
    test('Storage state should be used for navigation to Garage page', async ({userGaragePage, page})=>{
        await expect(userGaragePage.activeHeaderItem, "Garage link in header should be active").toHaveText("Garage")
        await expect(userGaragePage.garagePageTitleItem, "Garage page should have correct title").toHaveText("Garage")
    })
})
