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
        this.invalidNameErrorMessage = this._container.locator('div.invalid-feedback')
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
    async displayErrorForInvalidName (name,errorMessage){
        await this.nameInput.fill(name)
        await this.modalHeader.click()
        await expect (this.invalidNameErrorMessage).toHaveText(errorMessage)
        await expect (this.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect (this.registerButton).toBeDisabled()
    }

    async displayErrorForInvalidLastName (lastName,errorMessage){
        await this.lastNameInput.fill(lastName)
        await this.modalHeader.click()
        await expect (this.invalidNameErrorMessage).toHaveText(errorMessage)
        await expect (this.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect (this.registerButton).toBeDisabled()
    }

    async displayErrorForInvalidEmail (email,errorMessage){
        await this.emailInput.fill(email)
        await this.modalHeader.click()
        await expect (this.invalidNameErrorMessage).toHaveText(errorMessage)
        await expect (this.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect (this.registerButton).toBeDisabled()
    }
    async displayErrorForInvalidPassword (password,errorMessage){
        await this.passwordInput.clear()
        await this.passwordInput.fill(password)
        await this.modalHeader.click()
        await expect (this.invalidNameErrorMessage).toHaveText(errorMessage)
        await expect (this.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect (this.registerButton).toBeDisabled()
    }
    async displayErrorForInvalidRepeatPassword (repeatPassword,errorMessage){
        await this.repeatPasswordInput.clear()
        await this.repeatPasswordInput.fill(repeatPassword)
        await this.modalHeader.click()
        await expect (this.invalidNameErrorMessage).toHaveText(errorMessage)
        await expect (this.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect (this.registerButton).toBeDisabled()
    }
    async displayErrorForNotMatchingPassword (password, repeatPassword,errorMessage){
        await this.passwordInput.clear()
        await this.passwordInput.fill(password)
        await this.repeatPasswordInput.clear()
        await this.repeatPasswordInput.fill(repeatPassword)
        await this.modalHeader.click()
        await expect (this.invalidNameErrorMessage).toHaveText(errorMessage)
        await expect (this.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect (this.registerButton).toBeDisabled()
    }
}
