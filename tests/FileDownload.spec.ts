import { test, expect } from '../utils/hooks';

test('Upload single file', { tag: ['@downloadFile'] }, async ({ page, reusableMethods }) => {
  await page.locator("#inputText").fill("Welcome")
  await page.locator("#generateTxt").click()
  const download = await reusableMethods.clickAndDownloadFile(page.locator("#txtDownloadLink"))
  const downloadedPath = await download.path();
  console.log("Downloaded path: " + downloadedPath)
  const downloadPath = "resources/downloads/testFile.txt"
  download.saveAs(downloadPath)
});