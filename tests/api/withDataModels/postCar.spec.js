import {expect, test} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../src/data/dict/brands.js";
import {VALID_MODELS_GROUPED_BY_BRAND} from "../../../src/data/dict/modelsGroupedByBrand.js";
import {USERS} from "../../../src/data/dict/users.js";
import APIClient from "../../../src/client/APIClient.js";
import {CreateCarModel} from "../../../src/models/cars/CreateCarModel.mjs";

test.describe("POST cars", ()=>{
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

    test('Should create a new car', async ({})=>{
        const carModel = new CreateCarModel({carBrandId:1, carModelId:3, mileage:100})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand)=> brand.id === carModel.carBrandId)
        const model = VALID_MODELS_GROUPED_BY_BRAND[brand.id].data.find((model)=> model.id === carModel.carModelId)
        const response = await client.cars.createUserCar(carModel)
        const expectedBody = {
            ...carModel,
            initialMileage: carModel.mileage,
            id: expect.any(Number),
            carCreatedAt: expect.any(String),
            updatedMileageAt: expect.any(String),
            brand: brand.title,
            model: model.title,
            logo: brand.logoFilename
        }
        carId = response.data.data.id
        expect(response.data.data, 'Returned car object should ba valid').toEqual(expectedBody)
        expect(response.status, "Status code should be 201").toEqual(201)
        expect(response.data.status, "Success response should be returned").toBe("ok")
        carsIdsToDelete.push(carId)
    })

    test('Should return error message for car with invalid carModelId', async ({})=>{
        const carModel = new CreateCarModel({carBrandId:1, carModelId:7, mileage:100})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand)=> brand.id === carModel.carBrandId)
        const model = VALID_MODELS_GROUPED_BY_BRAND[brand.id].data.find((model)=> model.id === carModel.carModelId)
        const response = await client.cars.createUserCar(carModel)
        expect(response.status, "Status code should be 404").toEqual(404)
        expect(response.data.status, "Status should be error").toEqual('error')
        expect(response.data.message, "Error message for car with invalid carModelId should be returned").toEqual('Model not found')
    })

    test.afterAll(async ()=>{
        for (const id of carsIdsToDelete) {
            await client.cars.deleteCar(id)
        }
    })
})
