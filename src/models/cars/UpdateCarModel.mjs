export class UpdateCarModel {
    constructor({carBrandId, carModelId, mileage, carCreatedAt}) {
        this.carBrandId = carBrandId
        this.carModelId = carModelId
        this.mileage = mileage
        this.carCreatedAt = carCreatedAt
    }
}
