import {test} from "../../../src/fixtures/userPanel.fixture.js";
import {expect} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../src/data/dict/brands.js";
import {VALID_MODELS_GROUPED_BY_BRAND} from "../../../src/data/dict/modelsGroupedByBrand.js";
import {USERS} from "../../../src/data/dict/users.js";
import APIClient from "../../../src/client/APIClient.js";

test.describe("DELETE cars", ()=>{
    let client
    let carId
    const carsIdsToDelete = []

    test.beforeAll(async ()=>{
        client = await APIClient.authenticate(undefined, {
            "email": USERS.USER_FOR_LOGIN.email,
            "password": USERS.USER_FOR_LOGIN.password,
            "remember": false
        })
    })

    test.beforeEach(async ()=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_MODELS_GROUPED_BY_BRAND[brandId].data[1].id
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 125
        }
        const newCar = await client.cars.createUserCar(requestBody)
        carId = newCar.data.data.id
    })

    test('Should delete a car', async ({})=>{
        const response = await client.cars.deleteCar(carId)
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.status, "Success response should be returned").toBe("ok")
    })

    test('Should return error message for car with invalid carId', async ({})=>{
        const invalidCarId = carId + Math.random(100)
        const response = await client.cars.deleteCar(invalidCarId)
        expect(response.status, "Status code should be 404").toEqual(404)
        expect(response.data.status, "Status should be error").toEqual('error')
        expect(response.data.message, "Error message for car with invalid carModelId should be returned").toEqual('Car not found')
        carsIdsToDelete.push(carId)
    })

    test.afterAll(async ()=>{
        for (const id of carsIdsToDelete) {
            await client.cars.deleteCar(id)
        }
    })
})
