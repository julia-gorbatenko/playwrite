import {expect} from "@playwright/test";
import BasePage from "../BasePage.js";
import RegistrationPopup from "../components/RegistrationPopup.js";
import SignInPopup from "../components/SignInPopup.js";

export default class WelcomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('button', {hasText: 'Guest log in'}));
        this.signUpButton = this._page.locator('button.hero-descriptor_btn.btn-primary')
        this.signInButton = this._page.locator('.header_signin')
    }

    async openSignUpPopup(){
        await expect (this.signUpButton, "Registration button is visible").toBeVisible()
        await this.signUpButton.click()
        return new RegistrationPopup(this._page)
    }
    async openSignInPopup (){
        await this.signInButton.click()
        return new SignInPopup(this._page)
    }
}
