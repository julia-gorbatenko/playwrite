import {test} from "../../src/fixtures/userPanel.fixture.js";
import {expect} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../src/data/dict/brands.js";
import {VALID_BRAND_MODELS} from "../../src/data/dict/models.js";



test.describe("Car API", ()=>{
    let carId
test('Should create a new car', async ({userAPIClient})=>{
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id

    const requestBody = {
        "carBrandId": brandId,
        "carModelId": modelId,
        "mileage": 122
    }

    const response = await userAPIClient.post('/api/cars', {
        data:requestBody
    })
    const body = await response.json()
    carId = body.data.id
    expect(response, "Success response should be returned").toBeOK()
    expect(response.status(), "Status code should be 201").toEqual(201)
    expect(body.status).toBe("ok")
    expect(body.data, "Car should be created with data from request").toMatchObject(requestBody)
})
    test('Should return error message for car with invalid carBrandId', async ({userAPIClient})=>{
        const brandId = ''
        const modelId = 'testModel'

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })
        const body = await response.json()
        expect(response.status(), "Status code should be 400").toEqual(400)
        expect(body.status).toBe("error")
        expect(body.message, "Error message for car with invalid carBrandId should be returned").toEqual("Invalid car brand type")
    })
    test('Should return error message for car with invalid mileage', async ({userAPIClient})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": -3
        }

        const response = await userAPIClient.post('/api/cars', {
            data:requestBody
        })
        const body = await response.json()
        expect(response.status(), "Status code should be 400").toEqual(400)
        expect(body.status).toBe("error")
        expect(body.message, "Error message for car with invalid mileage should be returned").toEqual("Mileage has to be from 0 to 999999")
    })
    test.afterAll(async ({userAPIClient})=>{
        const response = await userAPIClient.delete(`/api/cars/${carId}`, {
        })
        const body = await response.json()
        expect(response.status(), "Status code should be 200").toEqual(200)
        expect(body.status).toBe("ok")
    })
})
