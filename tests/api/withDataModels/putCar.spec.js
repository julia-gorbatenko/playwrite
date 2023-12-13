import {expect, test} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../src/data/dict/brands.js";
import {VALID_MODELS_GROUPED_BY_BRAND} from "../../../src/data/dict/modelsGroupedByBrand.js";
import {USERS} from "../../../src/data/dict/users.js";
import APIClient from "../../../src/client/APIClient.js";
import {CreateCarModel} from "../../../src/models/cars/CreateCarModel.mjs";
import {UpdateCarModel} from "../../../src/models/cars/UpdateCarModel.mjs";

test.describe("PUT cars", ()=>{
    let client
    let carId
    let carInitialMilleage
    const carsIdsToDelete = []

    test.beforeAll(async ()=>{
        client = await APIClient.authenticate(undefined, {
            "email": USERS.USER_FOR_LOGIN.email,
            "password": USERS.USER_FOR_LOGIN.password,
            "remember": false
        })

        const carModel = new CreateCarModel({carBrandId:1, carModelId:2, mileage:100})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand)=> brand.id === carModel.carBrandId)
        const model = VALID_MODELS_GROUPED_BY_BRAND[brand.id].data.find((model)=> model.id === carModel.carModelId)
        const newCar = await client.cars.createUserCar(carModel)
        carId = newCar.data.data.id
        carInitialMilleage = carModel.mileage
    })

    test('Should edit a car', async ({})=>{
        const updatedCarModel = new UpdateCarModel({carBrandId:1, carModelId:3, mileage: 150, carCreatedAt: "2023-11-26T00:00:00.000Z"})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand)=> brand.id === updatedCarModel.carBrandId)
        const model = VALID_MODELS_GROUPED_BY_BRAND[brand.id].data.find((model)=> model.id === updatedCarModel.carModelId)
        const response = await client.cars.editUserCarById(carId,updatedCarModel)
        const expectedBody = {
            ...updatedCarModel,
            initialMileage: expect.any(Number),
            id: expect.any(Number),
            updatedMileageAt: expect.any(String),
            brand: brand.title,
            model: model.title,
            logo: brand.logoFilename
        }
        expect(response.status, "Status code should be 200").toEqual(200)
        expect(response.data.status, "Success response should be returned").toBe("ok")
        expect(response.data.data, 'Car should be updated with data from request').toEqual(expectedBody)
        carsIdsToDelete.push(carId)
    })

    test('Should return error message for car with invalid carId', async ({})=>{
        const invalidCarId = carId + Math.random(100)
        const updatedCarModel = new UpdateCarModel({carBrandId:1, carModelId:3, carCreatedAt:"2023-11-26T00:00:00.000Z"})
        const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand)=> brand.id === updatedCarModel.carBrandId)
        const model = VALID_MODELS_GROUPED_BY_BRAND[brand.id].data.find((model)=> model.id === updatedCarModel.carModelId)
        const response = await client.cars.editUserCarById(invalidCarId,updatedCarModel)
        expect(response.status, "Status code should be 404").toEqual(404)
        expect(response.data.status, "Status should be error").toEqual('error')
        expect(response.data.message, "Error message for car with invalid carModelId should be returned").toEqual('Car not found')
    })

    test.afterAll(async ()=>{
        for (const id of carsIdsToDelete) {
            await client.cars.deleteCar(id)
        }
    })
})
