import {expect, test} from "@playwright/test";
import { faker } from '@faker-js/faker';
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";

test.describe.only("Registration", ()=>{
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
    test('Error message should be shown when user has entered invalid name', async ()=>{
        const errorMessage = 'Name is invalid'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidName (invalidName,errorMessage)
    })
    test('Error message should be shown when user has\'t entered name', async ()=>{
        const errorMessage = 'Name required'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidName ('',errorMessage)
    })
    test('Error message should be shown when user has entered name less than 2 symbols', async ()=>{
        const errorMessage = 'Name has to be from 2 to 20 characters long'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidName (shortName,errorMessage)
    })
    test('Error message should be shown when user has entered name more than 20 symbols', async ()=>{
        const errorMessage = 'Name has to be from 2 to 20 characters long'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidName (longName,errorMessage)
    })
    test('Error message should be shown when user has entered invalid last name', async ()=>{
        const errorMessage = 'Last name is invalid'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidLastName (invalidName,errorMessage)
    })
    test('Error message should be shown when user has\'t entered last name', async ()=>{
        const errorMessage = 'Last name required'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidLastName ('',errorMessage)
    })
    test('Error message should be shown when user has entered last name less than 2 symbols', async ()=>{
        const errorMessage = 'Last name has to be from 2 to 20 characters long'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidLastName (shortName,errorMessage)
    })
    test('Error message should be shown when user has entered last name more than 20 symbols', async ()=>{
        const errorMessage = 'Last name has to be from 2 to 20 characters long'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidLastName (longName,errorMessage)
    })
    test('Error message should be shown when user has entered invalid email', async ()=>{
        const errorMessage = 'Email is incorrect'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidEmail (invalidEmail,errorMessage)
    })
    test('Error message should be shown when user has\'t entered email', async ()=>{
        const errorMessage = 'Email required'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidEmail ('',errorMessage)
    })
    test('Error message should be shown when user has entered invalid password', async ()=>{
        const errorMessage = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidPassword (invalidPassword,errorMessage)
    })
    test('Error message should be shown when user has\'t entered password', async ()=>{
        const errorMessage = 'Password required'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidPassword ('',errorMessage)
    })
    test('Error message should be shown when user has entered invalid re-enter password', async ()=>{
        const errorMessage = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidRepeatPassword (invalidPassword,errorMessage)
    })
    test('Error message should be shown when user has\'t entered re-enter password', async ()=>{
        const errorMessage = 'Re-enter password required'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForInvalidRepeatPassword ('',errorMessage)
    })
    test('Error message should be shown when password and re-enter password do not match', async ()=>{
        const errorMessage = 'Passwords do not match'
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.displayErrorForNotMatchingPassword (password,invalidRepeatPassword,errorMessage)
    })
    test('User can be registered', async ()=>{
        const registrationPopup = await welcomePage.openSignUp()
        await registrationPopup.registerUser (name,lastName,email,password,password)
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')
    })
})
