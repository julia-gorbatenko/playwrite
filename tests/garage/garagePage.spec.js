import {test} from '../../src/fixtures/userGaragePage.fixture.js'
import {expect} from "@playwright/test";

test.describe('Navigation to Garage page', ()=>{
    test.only('Storage state should be used for navigation to Garage page', async ({userGaragePage, page})=>{
        await userGaragePage.navigate()
        await expect(userGaragePage.activeHeaderItem, "Garage link in header should be active").toHaveText("Garage")
        await expect(userGaragePage.garagePageTitleItem, "Garage page should have correct title").toHaveText("Garage")
    })
})
