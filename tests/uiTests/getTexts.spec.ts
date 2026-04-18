import { Locator } from '@playwright/test';
import { test } from '../../utils/hooks';

test('InnerText, textContent', { tag: ['@textConcepts'] }, async ({ page }) => {
  const products: Locator = page.locator('.product-title');
  console.log(products)

  //1) innerText() Vs textContent()

  console.log(await products.nth(1).innerText());
  console.log(await products.nth(1).textContent());

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const productName1: string = await products.nth(i).innerText(); // Extracts plain text. Eliminates Whitespace and line breaks
    console.log(productName1);

    const productName2: string | null = await products.nth(i).textContent();  // Extracts text including hidden elements. Includes Extra whitespaces, line breaks, etc. 
    console.log(productName2);

    const productName3: string | null = await products.nth(i).textContent();  // Extracts text including hidden elements. Includes Extra whitespaces, line breaks, etc. 
    console.log(productName3?.trim());

  }

  //2)  allInnerText() Vs allTextContent()

  console.log("**** Comparing allInnerText() Vs allTextContent() *****")

  const productNames1: string[] = await products.allInnerTexts()
  console.log("Product Names captured by allInnerText(): ", productNames1)

  const productNames2: string[] = await products.allTextContents()
  console.log("Product Names captured by allTextContent(): ", productNames2)

  const productNamesTrimmed: string[] = productNames2.map(text => text.trim());
  console.log("Product Names after trimmed: ", productNamesTrimmed)

  //3) all() - converts Locator----> Locator[]

  const productsLocators: Locator[] = await products.all();
  console.log(productsLocators);

  console.log(await productsLocators[1].innerText());

  //for of loop
  for (let productloc of productsLocators) {
    console.log(await productloc.innerText());
  }

  //for in loop
  for (let i in productsLocators) {
    console.log(await productsLocators[i].innerText());
  }
})