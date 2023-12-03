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

    test.beforeAll(async ()=>{
        client = await APIClient.authenticate(undefined, {
            "email": USERS.USER_FOR_LOGIN.email,
            "password": USERS.USER_FOR_LOGIN.password,
            "remember": false
        })
    })

    test("Should return user's cars", async ()=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_MODELS_GROUPED_BY_BRAND[brandId].data[1].id
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }
        const newCar = await client.cars.createUserCar(requestBody)
        carId = newCar.data.data.id
        const response = await client.cars.getUserCars()
        expect(response.data.data[0], "List of cars should be returned for user").toMatchObject(requestBody)
        expect(response.status, "Status code should be 200").toEqual(200)
        await client.cars.deleteCar(carId)
    })

    test("Should return user's car by id", async ()=>{
        const userCars = await client.cars.getUserCars()
        carId = userCars.data.data[0].id
        const response = await client.cars.getUserCarById(carId)
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.data, "Car should be returned by provided id").toMatchObject(userCars.data.data[0])
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

    test("Should return user's car brand by id", async ()=>{
        const brandId = 1
        const response = await client.cars.getUserCarBrandsById(brandId)
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.data, "Car brand should be returned by id").toMatchObject(VALID_BRANDS_RESPONSE_BODY.data[brandId-1])
    })

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

    test("Should return user's car model by id", async ()=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[2].id
        const modelId = VALID_MODELS_GROUPED_BY_BRAND[brandId].data[1].id
        const response = await client.cars.getUserCarModelsById(modelId)
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.data, "Car model should be returned by id").toMatchObject(VALID_MODELS_GROUPED_BY_BRAND[brandId].data[1])
    })

    test("Should return error message for invalid carModelId", async ()=>{
        const modelId = -1
        const response = await client.cars.getUserCarModelsById(modelId)
        expect(response.status, "Status code should be 404").toEqual(404)
        expect(response.data.status, "Status should be error").toEqual('error')
        expect(response.data.message, "Error message for car with invalid carModelId should be returned").toEqual('No car models found with this id')
    })
})
