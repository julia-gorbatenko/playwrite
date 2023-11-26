import {test}  from '../../../src/fixtures/userPanel.fixture.js'
import {expect} from "@playwright/test";
import {CUSTOM_PROFILE_RESPONSE_BODY} from './fixtures/profile.js'

test.describe("Navigation to Profile page", ()=> {
    test("Frontend should use updated profile info", async ({userProfilePage}) => {
        const {page} = userProfilePage
        await page.route('/api/users/profile', route => {
            route.fulfill({body: JSON.stringify(CUSTOM_PROFILE_RESPONSE_BODY)})
        })
        await page.reload();
        await expect (userProfilePage.profilePageName, "User should have updated name").toHaveText(CUSTOM_PROFILE_RESPONSE_BODY.data.name+' '+CUSTOM_PROFILE_RESPONSE_BODY.data.lastName)
    })
})
