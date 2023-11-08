import {expect} from "@playwright/test";
import BasePage from "../BasePage.js";
import RegistrationPopup from "../components/RegistrationPopup";

export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('button', {hasText: 'Guest log in'}));
        this.signUpButton = this._page.locator('button.hero-descriptor_btn.btn-primary')
    }

    async openSignUpPopup(){
        await expect (this.signUpButton, "Registration button is visible").toBeVisible()
        await this.signUpButton.click()
        return new RegistrationPopup(this._page)
    }
}
