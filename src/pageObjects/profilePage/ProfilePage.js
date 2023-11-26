import BasePage from "../BasePage.js";
import {expect} from "@playwright/test";

export default class ProfilePage extends BasePage {

    constructor(page) {
        super(page, '/panel/profile', page.locator('app-panel-layout', {has: page.locator('button', {hasText: 'Edit profile'})}));
        this.profilePageTitleItem = page.locator('h1')
        this.profilePageName = page.locator('p.profile_name.display-4')
    }
}
