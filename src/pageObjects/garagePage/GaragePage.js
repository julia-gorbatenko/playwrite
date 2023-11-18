import BasePage from "../BasePage.js";

export default class GaragePage extends BasePage {

    constructor(page) {
        super(page, '/panel/garage', page.locator('app-panel-layout' , {has : page.locator('button', {hasText: 'Add car'})}));
        this.activeHeaderItem = page.locator('a.btn.header-link.-active')
        this.garagePageTitleItem = page.locator('h1')
    }
}
