import {test} from "../../../src/fixtures/userPanel.fixture.js";
import {expect} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../src/data/dict/brands.js";
import {VALID_BRAND_MODELS} from "../../../src/data/dict/models.js";
import {VALID_MODELS_GROUPED_BY_BRAND} from "../../../src/data/dict/modelsGroupedByBrand.js";
import {USERS} from "../../../src/data/dict/users.js";
import APIClient from "../../../src/client/APIClient.js";

test.describe("GET cars", ()=>{
    let client
    let carId
    let requestBody
    const carsIdsToDelete = []

    test.beforeAll(async ()=>{
        client = await APIClient.authenticate(undefined, {
            "email": USERS.USER_FOR_LOGIN.email,
            "password": USERS.USER_FOR_LOGIN.password,
            "remember": false
        })
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_MODELS_GROUPED_BY_BRAND[brandId].data[1].id
        requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 120
        }
        const newCar = await client.cars.createUserCar(requestBody)
        carId = newCar.data.data.id
    })

    test("Should return user's cars", async ()=>{
        const response = await client.cars.getUserCars()
        expect(response.data.data[0], "List of cars should be returned for user").toMatchObject(requestBody)
        expect(response.status, "Status code should be 200").toEqual(200)
    })

    test("Should return user's car by id", async ()=>{
        const response = await client.cars.getUserCarById(carId)
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.data, "Car should be returned by provided id").toMatchObject(requestBody)
        carsIdsToDelete.push(carId)
    })

    test("Should return error message for invalid carId", async ()=>{
        carId = -1
        const response = await client.cars.getUserCarById(carId)
        expect(response.status, "Status code should be 404").toEqual(404)
        expect(response.data.status, "Status should be error").toEqual('error')
        expect(response.data.message, "Error message for car with invalid carId should be returned").toEqual('Car not found')
    })

    test("Should return user's car brands", async ()=>{
        const response = await client.cars.getUserCarBrands()
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.data, "Car brands should be returned").toMatchObject(VALID_BRANDS_RESPONSE_BODY.data)
    })

        for (const brand of VALID_BRANDS_RESPONSE_BODY.data) {
            test(`Should return valid data for ${brand.title} brand`, async ({}) => {
                const brandId = brand.id
                const response = await client.cars.getUserCarBrandsById(brandId)
                expect(response.status, "Status code should be 200").toEqual(200)
                expect(response.data.data, "Valid brand data should be returned").toMatchObject(VALID_BRANDS_RESPONSE_BODY.data[brandId-1])
            })
        }

    test("Should return error message for invalid carBrandId", async ()=>{
        const brandId = -1
        const response = await client.cars.getUserCarBrandsById(brandId)
        expect(response.status, "Status code should be 404").toEqual(404)
        expect(response.data.status, "Status should be error").toEqual('error')
        expect(response.data.message, "Error message for car with invalid carBrandId should be returned").toEqual('No car brands found with this id')
    })

    test("Should return user's car models", async ()=>{
        const response = await client.cars.getUserCarModels()
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.data, "Car models should be returned").toMatchObject(VALID_BRAND_MODELS.data)
    })

        for (const model of VALID_BRAND_MODELS.data) {
            test(`Should return valid data for ${model.title} model`, async ({}) => {
                const modelId = model.id
                const response = await client.cars.getUserCarModelsById(modelId)
                expect(response.status, "Status code should be 200").toEqual(200)
                expect(response.data.data, "Valid model data should be returned").toMatchObject(VALID_BRAND_MODELS.data[modelId-1])
            })
        }

    test("Should return error message for invalid carModelId", async ()=>{
        const modelId = -1
        const response = await client.cars.getUserCarModelsById(modelId)
        expect(response.status, "Status code should be 404").toEqual(404)
        expect(response.data.status, "Status should be error").toEqual('error')
        expect(response.data.message, "Error message for car with invalid carModelId should be returned").toEqual('No car models found with this id')
    })

    test.afterAll(async ()=>{
        for (const id of carsIdsToDelete) {
            await client.cars.deleteCar(id)
        }
    })
})
