import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { CheckoutPage } from "../pages/checkout.page";

Then('I select the cart', async () => {
  const page = getPage();
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.clickCart();
});

Then('I select Checkout', async () => {
  const page = getPage();
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.clickCheckout();
});

Then(
  'I fill in the checkout form with First Name {string}, Last Name {string}, and Zip {string}',
  async (firstName, lastName, zip) => {
    const page = getPage();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutForm(firstName, lastName, zip);
  }
);

Then('I select Continue', async () => {
  const page = getPage();
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.clickContinue();
});

Then('I select Finish', async () => {
  const page = getPage();
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.clickFinish();
});

Then('I should see the confirmation message {string}', async (expectedMessage) => {
  const page = getPage();
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.validateConfirmationMessage(expectedMessage);
});