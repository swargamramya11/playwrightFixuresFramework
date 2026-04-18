import { test, expect } from '../../utils/hooks';

test('Upload single file', { tag: ['@uploadSingleFile'] }, async ({ page }) => {
  await page.locator("#singleFileInput").setInputFiles('resources/uploads/text.txt')
  await page.locator("button:has-text('Upload Single File')").click()

  expect(await page.locator('#singleFileStatus').textContent()).toContain("text.txt")
});

test('Upload multiple files', { tag: ['@uploadMultipleFiles'] }, async ({ page }) => {
  await page.locator("#multipleFilesInput").setInputFiles(['resources/uploads/text.txt', 'resources/uploads/text1.txt'])
  await page.locator("button:has-text('Upload Multiple Files')").click()

  let msg = await page.locator('#multipleFilesStatus').textContent()
  expect(msg).toContain("text.txt")
  expect(msg).toContain("text1.txt")
});