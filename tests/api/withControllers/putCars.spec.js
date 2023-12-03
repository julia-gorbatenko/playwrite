import {test} from "../../../src/fixtures/userPanel.fixture.js";
import {expect} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../src/data/dict/brands.js";
import {VALID_MODELS_GROUPED_BY_BRAND} from "../../../src/data/dict/modelsGroupedByBrand.js";
import {USERS} from "../../../src/data/dict/users.js";
import APIClient from "../../../src/client/APIClient.js";

test.describe("PUT cars", ()=>{
    let client
    let carId

    test.beforeAll(async ()=>{
        client = await APIClient.authenticate(undefined, {
            "email": USERS.USER_FOR_LOGIN.email,
            "password": USERS.USER_FOR_LOGIN.password,
            "remember": false
        })
    })

    test('Should edit a car', async ({})=>{
        const brandIdToCreate = VALID_BRANDS_RESPONSE_BODY.data[1].id
        const modelIdToCreate = VALID_MODELS_GROUPED_BY_BRAND[brandIdToCreate].data[2].id
        const requestBodyToCreate = {
            "carBrandId": brandIdToCreate,
            "carModelId": modelIdToCreate,
            "mileage": 10
        }
        const responseAfterCreation = await client.cars.createUserCar(requestBodyToCreate)
        carId = responseAfterCreation.data.data.id
        const brandIdForEdit = VALID_BRANDS_RESPONSE_BODY.data[1].id
        const modelIdForEdit = VALID_MODELS_GROUPED_BY_BRAND[brandIdForEdit].data[1].id
        const requestBodyForEdit = {
            "carBrandId": brandIdForEdit,
            "carModelId": modelIdForEdit,
            "carCreatedAt":"2023-11-26T00:00:00.000Z"
        }
        const response = await client.cars.editUserCarById(carId,requestBodyForEdit)
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.status, "Success response should be returned").toBe("ok")
        expect(response.data.data, "Car should be updated with data from request").toMatchObject(requestBodyForEdit)
        await client.cars.deleteCar(carId)
    })

    test('Should return error message for car with invalid carId', async ({})=>{
        const brandIdToCreate = VALID_BRANDS_RESPONSE_BODY.data[1].id
        const modelIdToCreate = VALID_MODELS_GROUPED_BY_BRAND[brandIdToCreate].data[2].id
        const requestBodyToCreate = {
            "carBrandId": brandIdToCreate,
            "carModelId": modelIdToCreate,
            "mileage": 10
        }
        const responseAfterCreation = await client.cars.createUserCar(requestBodyToCreate)
        carId = responseAfterCreation.data.data.id
        const invalidCarId = carId + Math.random(100)
        const brandIdForEdit = VALID_BRANDS_RESPONSE_BODY.data[1].id
        const modelIdForEdit = VALID_MODELS_GROUPED_BY_BRAND[brandIdForEdit].data[1].id
        const requestBodyForEdit = {
            "carBrandId": brandIdForEdit,
            "carModelId": modelIdForEdit,
            "carCreatedAt":"2023-11-26T00:00:00.000Z"
        }
        const response = await client.cars.editUserCarById(invalidCarId,requestBodyForEdit)
        expect(response.status, "Status code should be 404").toEqual(404)
        expect(response.data.status, "Status should be error").toEqual('error')
        expect(response.data.message, "Error message for car with invalid carModelId should be returned").toEqual('Car not found')
        await client.cars.deleteCar(carId)
    })
})
