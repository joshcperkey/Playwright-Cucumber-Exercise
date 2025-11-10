import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class CheckoutPage {
    private readonly page: Page;
    private readonly cart: string = '.shopping_cart_link';
    private readonly checkout: string = 'button[id="checkout"]'
    private readonly firstNameField: string = 'input[id="first-name"]';
    private readonly lastNameField: string = 'input[id="last-name"]';
    private readonly zipField: string = 'input[id="postal-code"]';
    private readonly continueButton: string = 'input[id="continue"]';
    private readonly finishButton: string = 'button[id="finish"]';
    private readonly confirmationMessage: string = '.complete-text';

    constructor(page: Page) {
        this.page = page;
    }

    public async clickCart() {
        await this.page.locator(this.cart).click();
    }

    public async clickCheckout() {
        await this.page.locator(this.checkout).click();
    }

    public async fillCheckoutForm(firstName: string, lastName: string, zip: string) {
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.zipField).fill(zip);
    }

    public async clickContinue() {
        await this.page.locator(this.continueButton).click();
    }

    public async clickFinish() {
        await this.page.locator(this.finishButton).click();
    }

    public async validateConfirmationMessage(expectedMessage: string) {
        expect((await this.page.locator(this.confirmationMessage).textContent())?.trim()).toBe(expectedMessage);
    }

}
