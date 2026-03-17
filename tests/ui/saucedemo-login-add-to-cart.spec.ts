import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { testData } from '../../test-data/testData';

test.describe('SauceDemo - UI smoke journey', () => {
  test('login + add to cart with unauth access negative check', async ({ page, baseURL }, testInfo) => {
    await test.step('[NEGATIVE] blocks unauthenticated access to inventory', async () => {
      await page.goto(`${baseURL}/inventory.html`);
      await expect(page).toHaveURL(/.*(\/|\/index\.html)$/);
      await expect(page.locator('[data-test="login-button"]')).toBeVisible();

      const negativeStepScreenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('negative-unauth-access', {
        body: negativeStepScreenshot,
        contentType: 'image/png'
      });
    });

    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await test.step('[POSITIVE] login and add item to cart', async () => {
      await login.goto();
      await login.login(testData.ui.username, testData.ui.password);

      await inventory.expectOnInventory();

      await inventory.addFirstItemToCart();
      await inventory.goToCart();

      await cart.expectHasAtLeastOneItem();

      const positiveStepScreenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('positive-item-in-cart', {
        body: positiveStepScreenshot,
        contentType: 'image/png'
      });
    });
  });
});
