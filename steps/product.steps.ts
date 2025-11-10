import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

console.log("Product.steps loaded");

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I sort the items by {string}', {timeout: 60 * 1000}, async (sortOption) => {
  const page = getPage();
  const productPage = new Product(page);
  await productPage.selectSortOption(sortOption);
});

Then('I validate that all {int} items are sorted by price in {string} order', async (count: number, direction: string) => {
  const page = getPage();
  const productPage = new Product(page);
  await productPage.validatePriceSortOrder(direction);
});