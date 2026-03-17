import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  private readonly cartItem: Locator;

  constructor(private readonly page: Page) {
    this.cartItem = page.locator('.cart_item');
  }

  async expectHasAtLeastOneItem() {
    await expect(this.cartItem.first()).toBeVisible();
  }
}
