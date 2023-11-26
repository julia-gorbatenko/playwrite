import {test} from "../../src/fixtures/userPanel.fixture.js";
import {expect} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../src/data/dict/brands.js";
import {VALID_BRAND_MODELS} from "../../src/data/dict/models.js";
import {USERS} from "../../src/data/dict/users.js";
import {config} from "../../config/config.js";
import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

test.describe("Car API", ()=>{
    let client
    let carId

    test.beforeAll(async()=>{
        const jar = new CookieJar();
        client = wrapper(axios.create({
            baseURL: config.apiURL,
            jar,
            validateStatus: status => {
                return status < 501
            }
        }))
        await client.post('/auth/signin',{
            "email": USERS.USER_FOR_LOGIN.email,
            "password": USERS.USER_FOR_LOGIN.password,
            "remember": false
        })
})

test('Should create a new car', async ({})=>{
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id
    const requestBody = {
        "carBrandId": brandId,
        "carModelId": modelId,
        "mileage": 122
    }
    const response = await client.post('/cars', requestBody)
    carId = response.data.data.id

    expect(response.status, "Status code should be 201").toEqual(201)
    expect(response.data.status, "Success response should be returned").toBe("ok")
    expect(response.data.data, "Car should be created with data from request").toMatchObject(requestBody)
})
    test('Should return error message for car with invalid carBrandId', async ({})=>{
        const brandId = ''
        const modelId = 'testModel'

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }

        const response = await client.post('/cars', requestBody)

        expect(response.status, "Status code should be 400").toEqual(400)
        expect(response.data.status, "Success response should be returned").toBe("error")
        expect(response.data.message, "Error message for car with invalid carBrandId should be returned").toEqual("Invalid car brand type")
    })
    test('Should return error message for car with invalid mileage', async ({})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_BRAND_MODELS[brandId].data[1].id

        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": -3
        }

        const response = await client.post('/cars', requestBody)

        expect(response.status, "Status code should be 400").toEqual(400)
        expect(response.data.status, "Success response should be returned").toBe("error")
        expect(response.data.message, "Error message for car with invalid mileage should be returned").toEqual("Mileage has to be from 0 to 999999")
    })

    test.afterAll(async ({})=>{
        const response = await client.delete(`cars/${carId}`)
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.status).toBe("ok")
    })
})
