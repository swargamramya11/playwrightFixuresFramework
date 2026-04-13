import { test, expect } from '../utils/hooks';

test('Upload single file', { tag: ['@smoke, @uploadSingleFile'] }, async ({ page }) => {
  await page.locator("#singleFileInput").setInputFiles('testdata/uploads/text.txt')
  await page.locator("button:has-text('Upload Single File')").click()

  expect(await page.locator('#singleFileStatus').textContent()).toContain("text.txt")
});

test('Upload multiple files', { tag: ['@smoke, @uploadMultipleFiles'] }, async ({ page }) => {
  await page.locator("#multipleFilesInput").setInputFiles(['testdata/uploads/text.txt', 'testdata/uploads/text1.txt'])
  await page.locator("button:has-text('Upload Multiple Files')").click()

  let msg = await page.locator('#multipleFilesStatus').textContent()
  expect(msg).toContain("text.txt")
  expect(msg).toContain("text1.txt")
});