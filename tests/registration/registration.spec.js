import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';

const name = 'username'
const lastName = 'lastname'
const email = 'aqa-'+faker.internet.email()
const password = 'Passw0rd'
const invalidName = 'test-user1'
const shortName = 'r'
const longName = 'Loremipsumdolorsitamet'
const invalidEmail = 'test!@$gmail.com'
const invalidPassword = 'Testpass'
const invalidRepeatPassword = 'Passw0rd!'

test.describe('Registration @S9168b118', ()=>{
    test('Registration with valid data @T770e73a4', async({page})=>{
        await page.goto('/')
        const signUpButton = page.locator('button.hero-descriptor_btn.btn-primary')
        await expect(signUpButton, "Sign up button should be visible").toBeVisible()
        await expect(signUpButton, "Sign up button should be enabled").toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('app-signup-modal')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword')
        const registerButton = popup.locator('button.btn.btn-primary')

        await nameInput.fill(name)
        await lastNameInput.fill(lastName)
        await emailInput.fill(email)
        await passwordInput.fill(password)
        await repeatPasswordInput.fill(password)
        await expect(registerButton, "Register button should be visible").toBeVisible()
        await expect(registerButton, "Register button should be enabled").toBeEnabled()
        await registerButton.click()
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')
    })
    test('Registration with invalid name @T4b657981', async({page})=>{
        await page.goto('/')
        const signUpButton = page.locator('button.hero-descriptor_btn.btn-primary')
        await expect(signUpButton, "Sign up button should be visible").toBeVisible()
        await expect(signUpButton, "Sign up button should be enabled").toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('app-signup-modal')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        await nameInput.fill(invalidName)

        const invalidNameErrorMessage = popup.locator('div.invalid-feedback')
        const modalHeader = page.locator('div.modal-header')
        const registerButton = popup.locator('button.btn.btn-primary')
        await modalHeader.click()
        await expect(invalidNameErrorMessage, "Error message should be shown when user has entered invalid name").toHaveText('Name is invalid')
        await expect(nameInput, "Name input should have red border when user has entered invalid name").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered invalid email").toBeDisabled()

        await nameInput.clear()
        const emptyNameErrorMessage = popup.locator('div.invalid-feedback')
        await expect(emptyNameErrorMessage, "Error message should be shown when user has't entered name ").toHaveText('Name required')
        await expect(nameInput, "Name input should have red border when user hasn't filled name").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user hasn't filled name").toBeDisabled()

        await nameInput.clear()
        await nameInput.fill(shortName)
        const shortNameErrorMessage = popup.locator('div.invalid-feedback')
        await expect(shortNameErrorMessage, "Error message should be shown when user has entered name less than 2 symbols").toHaveText('Name has to be from 2 to 20 characters long')
        await expect(nameInput, "Name input should have red border when user has entered name less than 2 symbols").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered name less than 2 symbols").toBeDisabled()

        await nameInput.clear()
        await nameInput.fill(longName)
        const longNameErrorMessage = popup.locator('div.invalid-feedback')
        await expect(longNameErrorMessage, "Error message should be shown when user has entered name more than 20 symbols").toHaveText('Name has to be from 2 to 20 characters long')
        await expect(nameInput, "Name input should have red border when user has entered name more than 20 symbols").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered name more than 20 symbols").toBeDisabled()
    })
    test('Registration with invalid last name @T54223752', async({page})=>{
        await page.goto('/')
        const signUpButton = page.locator('button.hero-descriptor_btn.btn-primary')
        await expect(signUpButton, "Sign up button should be visible").toBeVisible()
        await expect(signUpButton, "Sign up button should be enabled").toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('app-signup-modal')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const lastNameInput = popup.locator(`input#signupLastName`)
        await lastNameInput.fill(invalidName)

        const invalidLastNameErrorMessage = popup.locator('div.invalid-feedback')
        const modalHeader = page.locator('div.modal-header')
        const registerButton = popup.locator('button.btn.btn-primary')
        await modalHeader.click()
        await expect(invalidLastNameErrorMessage, "Error message should be shown when user has entered invalid last name").toHaveText('Last name is invalid')
        await expect(lastNameInput, "Last name input should have red border when user has entered invalid last name").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered invalid last name").toBeDisabled()

        await lastNameInput.clear()
        const emptyLastNameErrorMessage = popup.locator('div.invalid-feedback')
        await expect(emptyLastNameErrorMessage, "Error message should be shown when user has't entered last name").toHaveText('Last name required')
        await expect(lastNameInput, "Last name input should have red border when user hasn't filled last name").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user hasn't filled last name").toBeDisabled()

        await lastNameInput.clear()
        await lastNameInput.fill(shortName)
        const shortLastNameErrorMessage = popup.locator('div.invalid-feedback')
        await expect(shortLastNameErrorMessage, "Error message should be shown when user has entered last name less than 2 symbols").toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(lastNameInput, "Last name input should have red border when user has entered last name less than 2 symbols").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered last name less than 2 symbols").toBeDisabled()

        await lastNameInput.clear()
        await lastNameInput.fill(longName)
        const longNameErrorMessage = popup.locator('div.invalid-feedback')
        await expect(longNameErrorMessage, "Error message should be shown when user has entered last name more than 20 symbols").toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(lastNameInput, "Last name input should have red border when user has entered last name more than 20 symbols").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered last name more than 20 symbols").toBeDisabled()
    })

    test('Registration with invalid email @Ta47a73c0', async({page})=>{
        await page.goto('/')
        const signUpButton = page.locator('button.hero-descriptor_btn.btn-primary')
        await expect(signUpButton, "Sign up button should be visible").toBeVisible()
        await expect(signUpButton, "Sign up button should be enabled").toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('app-signup-modal')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const emailInput = popup.locator(`input#signupEmail`)
        await emailInput.fill(invalidEmail)

        const invalidEmailErrorMessage = popup.locator('div.invalid-feedback')
        const modalHeader = page.locator('div.modal-header')
        const registerButton = popup.locator('button.btn.btn-primary')
        await modalHeader.click()
        await expect(invalidEmailErrorMessage, "Error message should be shown when user has entered invalid email").toHaveText('Email is incorrect')
        await expect(emailInput, "Email input should have red border when user has entered invalid last name").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered invalid email").toBeDisabled()

        await emailInput.clear()
        const emptyEmailErrorMessage = popup.locator('div.invalid-feedback')
        await expect(emptyEmailErrorMessage, "Error message should be shown when user has't entered email").toHaveText('Email required')
        await expect(emailInput, "Email input should have red border when user hasn't filled email").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user hasn't filled email").toBeDisabled()
    })

    test('Registration with invalid password @T0060c898', async({page})=>{
        await page.goto('/')
        const signUpButton = page.locator('button.hero-descriptor_btn.btn-primary')
        await expect(signUpButton, "Sign up button should be visible").toBeVisible()
        await expect(signUpButton, "Sign up button should be enabled").toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('app-signup-modal')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const passwordInput = popup.locator(`input#signupPassword`)
        await passwordInput.fill(invalidPassword)

        const invalidPasswordErrorMessage = popup.locator('div.invalid-feedback')
        const modalHeader = page.locator('div.modal-header')
        const registerButton = popup.locator('button.btn.btn-primary')
        await modalHeader.click()
        await expect(invalidPasswordErrorMessage, "Error message should be shown when user has entered invalid password").toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(passwordInput, "Password input should have red border when user has entered invalid password").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered invalid password").toBeDisabled()

        await passwordInput.clear()
        const emptyPasswordErrorMessage = popup.locator('div.invalid-feedback')
        await expect(emptyPasswordErrorMessage, "Error message should be shown when user has't filled password field'").toHaveText('Password required')
        await expect(passwordInput, "Password input should have red border when user hasn't filled filled").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user hasn't filled filled").toBeDisabled()
    })
    test('Registration with invalid re-enter password @Td8867f14', async({page})=>{
        await page.goto('/')
        const signUpButton = page.locator('button.hero-descriptor_btn.btn-primary')
        await expect(signUpButton, "Sign up button should be visible").toBeVisible()
        await expect(signUpButton, "Sign up button should be enabled").toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('app-signup-modal')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const passwordInput = popup.locator(`input#signupPassword`)
        await passwordInput.fill(password)
        const repeatPasswordInput = popup.locator(`input#signupRepeatPassword`)
        await repeatPasswordInput.fill(invalidRepeatPassword)

        const invalidRepeatPasswordErrorMessage = popup.locator('div.invalid-feedback')
        const modalHeader = page.locator('div.modal-header')
        const registerButton = popup.locator('button.btn.btn-primary')
        await modalHeader.click()
        await expect(invalidRepeatPasswordErrorMessage, "Error message should be shown when user has entered repeat password that doesn't match with password").toHaveText('Passwords do not match')
        await expect(repeatPasswordInput, "Password input should have red border when user has entered repeat password that doesn't match with password").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user has entered repeat password that doesn't match with password").toBeDisabled()

        await repeatPasswordInput.clear()
        const emptyRepeatPasswordErrorMessage = popup.locator('div.invalid-feedback')
        await expect(emptyRepeatPasswordErrorMessage, "Error message should be shown when user has't filled repeat password field'").toHaveText('Re-enter password required')
        await expect(repeatPasswordInput, "Password input should have red border when user hasn't filled repeat password").toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await expect(registerButton, "Register button should be disabled when user hasn't filled repeat password").toBeDisabled()
    })

})
