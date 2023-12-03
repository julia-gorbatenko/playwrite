import {test} from "../../../src/fixtures/userPanel.fixture.js";
import {expect} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../src/data/dict/brands.js";
import {VALID_MODELS_GROUPED_BY_BRAND} from "../../../src/data/dict/modelsGroupedByBrand.js";
import {USERS} from "../../../src/data/dict/users.js";
import APIClient from "../../../src/client/APIClient.js";

test.describe("POST cars", ()=>{
    let client
    let carId

    test.beforeAll(async ()=>{
        client = await APIClient.authenticate(undefined, {
            "email": USERS.USER_FOR_LOGIN.email,
            "password": USERS.USER_FOR_LOGIN.password,
            "remember": false
        })
    })

    test('Should create a new car', async ({})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id
        const modelId = VALID_MODELS_GROUPED_BY_BRAND[brandId].data[1].id
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 123
        }
        const response = await client.cars.createUserCar(requestBody)
        carId = response.data.data.id
        expect(response.status, "Status code should be 201").toEqual(201)
        expect(response.data.status, "Success response should be returned").toBe("ok")
        expect(response.data.data, "Car should be created with data from request").toMatchObject(requestBody)
        await client.cars.deleteCar(carId)
    })

    test('Should return error message for car with invalid carModelId', async ({})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id
        const modelId = VALID_MODELS_GROUPED_BY_BRAND[brandId+1].data[1].id
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 124
        }
        const response = await client.cars.createUserCar(requestBody)
        expect(response.status, "Status code should be 404").toEqual(404)
        expect(response.data.status, "Status should be error").toEqual('error')
        expect(response.data.message, "Error message for car with invalid carModelId should be returned").toEqual('Model not found')
    })

})
