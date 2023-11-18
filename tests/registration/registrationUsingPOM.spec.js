import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";

test.describe("Registration @S9168b118", ()=>{
    let page
    let welcomePage

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

    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext({
            viewport: {
                width: 1200,
                height: 800
            }
        })

        page = await context.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.open()
        await welcomePage.waitLoaded()
    })
    test('Error message should be shown when user has entered invalid name @T8e62614f', async ()=>{
        const errorMessage = 'Name is invalid'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillName (invalidName)
        await registrationPopup.checkErrorForInvalidName (errorMessage)
    })
    test('Error message should be shown when user has\'t entered name @T0f2b85f8', async ()=>{
        const errorMessage = 'Name required'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillName ('')
        await registrationPopup.checkErrorForInvalidName (errorMessage)
    })
    test('Error message should be shown when user has entered name less than 2 symbols @T88cdb086', async ()=>{
        const errorMessage = 'Name has to be from 2 to 20 characters long'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillName (shortName)
        await registrationPopup.checkErrorForInvalidName (errorMessage)
    })
    test('Error message should be shown when user has entered name more than 20 symbols @T4cab5984', async ()=>{
        const errorMessage = 'Name has to be from 2 to 20 characters long'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillName (longName)
        await registrationPopup.checkErrorForInvalidName (errorMessage)
    })
    test('Error message should be shown when user has entered invalid last name @T206e998c', async ()=>{
        const errorMessage = 'Last name is invalid'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillLastName (invalidName)
        await registrationPopup.checkErrorForInvalidLastName (errorMessage)
    })
    test('Error message should be shown when user has\'t entered last name @T516644a5', async ()=>{
        const errorMessage = 'Last name required'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillLastName('')
        await registrationPopup.checkErrorForInvalidLastName (errorMessage)
    })
    test('Error message should be shown when user has entered last name less than 2 symbols @T0482620f', async ()=>{
        const errorMessage = 'Last name has to be from 2 to 20 characters long'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillLastName (shortName)
        await registrationPopup.checkErrorForInvalidLastName (errorMessage)
    })
    test('Error message should be shown when user has entered last name more than 20 symbols @T78f1f75b', async ()=>{
        const errorMessage = 'Last name has to be from 2 to 20 characters long'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillLastName (longName)
        await registrationPopup.checkErrorForInvalidLastName (errorMessage)
    })
    test('Error message should be shown when user has entered invalid email @Tb9af3651', async ()=>{
        const errorMessage = 'Email is incorrect'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillEmail (invalidEmail)
        await registrationPopup.checkErrorForInvalidEmail (errorMessage)
    })
    test('Error message should be shown when user has\'t entered email @Td434f7c1', async ()=>{
        const errorMessage = 'Email required'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillEmail ('')
        await registrationPopup.checkErrorForInvalidEmail (errorMessage)
    })
    test('Error message should be shown when user has entered invalid password @T1ba5d42c', async ()=>{
        const errorMessage = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillPassword (invalidPassword)
        await registrationPopup.checkErrorForInvalidPassword (errorMessage)
    })
    test('Error message should be shown when user has\'t entered password @Td7d575e1', async ()=>{
        const errorMessage = 'Password required'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillPassword ('')
        await registrationPopup.checkErrorForInvalidPassword (errorMessage)
    })
    test('Error message should be shown when user has entered invalid re-enter password @T4219df5c', async ()=>{
        const errorMessage = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillRepeatPassword (invalidPassword)
        await registrationPopup.checkErrorForInvalidRepeatPassword (errorMessage)
    })
    test('Error message should be shown when user has\'t entered re-enter password @Te9965e7a', async ()=>{
        const errorMessage = 'Re-enter password required'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillRepeatPassword ('')
        await registrationPopup.checkErrorForInvalidRepeatPassword (errorMessage)
    })
    test('Error message should be shown when password and re-enter password do not match @Te1baee50', async ()=>{
        const errorMessage = 'Passwords do not match'
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.fillPassword (password)
        await registrationPopup.fillRepeatPassword (invalidRepeatPassword)
        await registrationPopup.checkErrorForInvalidRepeatPassword (errorMessage)
    })
    test('User can be registered @T3b9d3ea5', async ()=>{
        const registrationPopup = await welcomePage.openSignUpPopup()
        await registrationPopup.registerUser (name,lastName,email,password,password)
        await expect(page).toHaveURL('/panel/garage')
    })
})
