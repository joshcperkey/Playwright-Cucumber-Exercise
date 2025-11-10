import { Page, expect } from "@playwright/test";

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    
    // Most robust selector: Tag + data-test attribute
    private readonly sortDropdown: string = 'select[data-test="product-sort-container"]';
    private readonly itemPrices: string = '.inventory_item_price';

    // Best-practice mapping of Gherkin label to HTML value
    private readonly SORT_VALUES = {
        "Price (low to high)": "lohi",
        "Price (high to low)": "hilo",
        "Name (A to Z)": "az",
        "Name (Z to A)": "za"
    };

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async selectSortOption(option: string) {
    
        const optionValue = this.SORT_VALUES[option as keyof typeof this.SORT_VALUES];

        if (!optionValue) {
            throw new Error(`Unsupported sort option provided in feature file: ${option}`);
        }
        // Assert and wait for dropdown to be selected
        await this.page.locator(this.sortDropdown).selectOption({ value: optionValue });
        // Assert and wait for prices to be visible
        await this.page.locator(this.itemPrices).first().waitFor({ state: 'visible' }); 
    
        // Assertion: Confirm the selection was successful.
        await expect(this.page.locator(this.sortDropdown)).toHaveValue(optionValue);
}

    public async validatePriceSortOrder(direction: string) {
        // ... (existing correct code)
        await this.page.locator(this.itemPrices).first().waitFor({ state: 'visible' });

        const prices = await this.page.locator(this.itemPrices).allTextContents();
        const numericPrices = prices
            .map(p => parseFloat(p.replace('$', '').trim()))
            .filter(p => !isNaN(p));
        
        const sorted = [...numericPrices].sort((a, b) =>
            direction === 'ascending' ? a - b : b - a
        );

        expect(numericPrices, 
            `Expected prices to be in ${direction} order.\n
            Received (Actual): ${numericPrices.join(', ')}\n
            Expected (Sorted): ${sorted.join(', ')}`
        ).toEqual(sorted);
    }
}