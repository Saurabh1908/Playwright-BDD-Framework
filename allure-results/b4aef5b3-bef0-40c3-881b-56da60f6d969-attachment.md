# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features\checkout.feature.spec.js >> Complete checkout >> Complete a purchase from login through order confirmation
- Location: .features-gen\features\checkout.feature.spec.js:6:7

# Error details

```
Error: Expected the checkout overview page, received: Checkout: Your Information
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e10]: Swag Labs
        - button "Cart, 1 items" [ref=e13]:
          - generic [ref=e14]: "1"
      - generic [ref=e15]: "Checkout: Overview"
    - main [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]:
          - generic [ref=e20]: QTY
          - generic [ref=e21]: Description
          - generic [ref=e22]:
            - generic [ref=e23]: "1"
            - generic [ref=e24]:
              - button "View details for Sauce Labs Backpack" [ref=e25] [cursor=pointer]:
                - generic [ref=e26]: Sauce Labs Backpack
              - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
              - generic [ref=e28]: $29.99
        - generic [ref=e30]:
          - generic [ref=e31]: "Payment Information:"
          - generic [ref=e32]: "SauceCard #31337"
          - generic [ref=e33]: "Shipping Information:"
          - generic [ref=e34]: Free Pony Express Delivery!
          - generic [ref=e35]: Price Total
          - generic [ref=e36]: "Item total: $29.99"
          - generic [ref=e37]: "Tax: $2.40"
          - generic [ref=e38]: "Total: $32.39"
          - generic [ref=e39]:
            - button "Cancel" [ref=e40] [cursor=pointer]
            - button "Finish" [ref=e41] [cursor=pointer]
  - contentinfo [ref=e42]:
    - list [ref=e43]:
      - listitem [ref=e44]:
        - link "X" [ref=e45] [cursor=pointer]:
          - /url: https://x.com/saucelabs
      - listitem [ref=e46]:
        - link "Facebook" [ref=e47] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e48]:
        - link "LinkedIn" [ref=e49] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e50]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import type { Page } from 'playwright';
  2  | 
  3  | export class CheckoutOverviewPage {
  4  |   private readonly pageTitle;
  5  |   private readonly finishButton;
  6  | 
  7  |   constructor(private readonly page: Page) {
  8  |     this.pageTitle = page.locator('[data-test="title"]');
  9  |     this.finishButton = page.locator('[data-test="finish"]');
  10 |   }
  11 | 
  12 |   async verifyContainsProduct(productName: string): Promise<void> {
  13 |     await this.page.waitForURL('**/checkout-step-two.html');
  14 |     const title = await this.pageTitle.textContent();
  15 |     if (title?.trim() !== 'Checkout: Overview') {
> 16 |       throw new Error(`Expected the checkout overview page, received: ${title?.trim() ?? 'no heading'}`);
     |             ^ Error: Expected the checkout overview page, received: Checkout: Your Information
  17 |     }
  18 |     await this.page.getByText(productName, { exact: false }).first().waitFor({ state: 'visible' });
  19 |   }
  20 | 
  21 |   async finishOrder(): Promise<void> {
  22 |     await this.finishButton.click();
  23 |     await this.page.waitForURL('**/checkout-complete.html');
  24 |   }
  25 | }
```