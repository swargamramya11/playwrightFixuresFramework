import { test, expect } from '../utils/hooks';
import { ReusableMethods } from '../utils/reusableMethods';

test('Upload single file', { tag: ['@smoke, @downloadFile'] }, async ({ page }) => {
let reusableMethods = new ReusableMethods(page);

await page.locator("#inputText").fill("Welcome")
await page.locator("#generateTxt").click()
const download = await reusableMethods.clickAndDownloadFile(page.locator("#txtDownloadLink"))

const downloadPath = "testdata/downloads/testFile.txt"
download.saveAs(downloadPath)
});