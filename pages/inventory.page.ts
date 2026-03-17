import { Locator, Page, expect } from '@playwright/test';

export class InventoryPage {
  private readonly title: Locator;
  private readonly firstAddToCart: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('.title');
    this.firstAddToCart = page.locator('[data-test^="add-to-cart"]').first();
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async expectOnInventory() {
    await expect(this.title).toHaveText('Products');
  }

  async addFirstItemToCart() {
    await this.firstAddToCart.click();
    await expect(this.cartBadge).toHaveText('1');
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
