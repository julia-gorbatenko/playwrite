import BaseComponent from "./BaseComponent.js";
import {expect} from "@playwright/test";

export default class BasePage extends BaseComponent {
    constructor(page, url,  container) {
        const wrapper = container ?? page.locator('html')
        super(page, wrapper)
        this._url = url
        this.activeHeaderItem = page.locator('a.btn.header-link.-active')
    }

    async navigate(){
        await this.open()
        await this.waitLoaded()
    }

    async open(){
        await this._page.goto(this._url)
    }
}
