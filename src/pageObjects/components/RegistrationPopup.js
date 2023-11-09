import BaseComponent from "../BaseComponent.js";
import {expect} from "@playwright/test";

export default class RegistrationPopup extends BaseComponent {

    constructor(page) {
        super(page, page.locator('app-signup-modal'));
        this.nameInput = this._container.locator('input#signupName')
        this.lastNameInput = this._container.locator('input#signupLastName')
        this.emailInput = this._container.locator('input#signupEmail')
        this.passwordInput = this._container.locator(`input#signupPassword`)
        this.repeatPasswordInput = this._container.locator('input#signupRepeatPassword')
        this.registerButton = this._container.locator('button.btn.btn-primary')
        this.еrrorMessage = this._container.locator('div.invalid-feedback')
        this.modalHeader = this._container.locator('div.modal-header')
    }
    async registerUser(name, lastName, email, password, repeatPassword){
        await this.nameInput.fill(name)
        await this.lastNameInput.fill(lastName)
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.repeatPasswordInput.fill(repeatPassword)
        await this.registerButton.click()
    }

    async fillName (name) {
        await this.nameInput.fill(name)
        await this.nameInput.blur()
    }

    async checkErrorForInvalidName (errorMessage){
        await expect (this.еrrorMessage).toHaveText(errorMessage)
        await expect (this.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect (this.registerButton).toBeDisabled()
    }
    async fillLastName (lastName) {
        await this.lastNameInput.fill(lastName)
        await this.lastNameInput.blur()
    }

    async checkErrorForInvalidLastName (errorMessage){
        await expect (this.еrrorMessage).toHaveText(errorMessage)
        await expect (this.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect (this.registerButton).toBeDisabled()
    }

    async fillEmail (email) {
        await this.emailInput.fill(email)
        await this.emailInput.blur()
    }

    async checkErrorForInvalidEmail (errorMessage){
        await expect (this.еrrorMessage).toHaveText(errorMessage)
        await expect (this.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect (this.registerButton).toBeDisabled()
    }

    async fillPassword (password) {
        await this.passwordInput.fill(password)
        await this.passwordInput.blur()
    }

    async checkErrorForInvalidPassword (errorMessage){
        await expect (this.еrrorMessage).toHaveText(errorMessage)
        await expect (this.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect (this.registerButton).toBeDisabled()
    }

    async fillRepeatPassword (repeatPassword) {
        await this.repeatPasswordInput.fill(repeatPassword)
        await this.repeatPasswordInput.blur()
    }

    async checkErrorForInvalidRepeatPassword(errorMessage){
        await expect (this.еrrorMessage).toHaveText(errorMessage)
        await expect (this.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect (this.registerButton).toBeDisabled()
    }
}
