import { Page } from "@playwright/test"
import { expect } from '@playwright/test';

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = '[data-test="product_sort_container"]';
    private readonly itemPrices: string = '.inventory_item_price';

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async selectSortOption(option: string) {
        await this.page.locator(this.sortDropdown).selectOption({ label: option });
    }

    public async validatePriceSortOrder(direction: string) {
        const prices = await this.page.locator(this.itemPrices).allTextContents();
        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
        
        const sorted = [...numericPrices].sort((a, b) =>
        direction === 'ascending' ? a - b : b - a
        );

        expect(numericPrices).toEqual(sorted);
    }
}