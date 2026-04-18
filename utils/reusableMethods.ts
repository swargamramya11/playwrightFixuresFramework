import faker from 'faker';
import { APIRequestContext, Page, expect } from '@playwright/test'
import { Locator } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright';

export class ReusableMethods {

    private readonly page: Page;
    private readonly request: APIRequestContext;

    constructor(page: Page, request: APIRequestContext) {
        this.page = page;
        this.request = request
    }

    async goToURL(property: string) {
        await this.page.goto(ReusableMethods.getProperty(property));
    }

    static getProperty(property: string): string {
        return process.env[property] as string
    }

    async goForward() {
        await this.page.goForward()
    }

    async goBackward() {
        await this.page.goBack()
    }

    async openNewBlankWindow() {
        const newPage = await this.page.context().newPage();
        return newPage
    }

    //Windows    

    async clickOnButtonToOpenNewTab(locator: Locator) {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            locator.click()
        ]);

        await newPage.waitForLoadState();
        return newPage;
    }

    async switchToMainWindow() {
        await this.page.bringToFront();
    }

    async clickOnButtonToOpenNewWindow(locator: Locator) {
        await Promise.all([
            this.page.waitForEvent('popup'),
            locator.click()
        ]);

        const pages = this.page.context().pages();
        console.log(pages.length);
        return pages;
    }

    async closeWindow(index: number) {
        const pages = this.page.context().pages();
        pages[index].close()
    }

    async navigateToParticularWindowByIndex(index: number) {
        const pages = this.page.context().pages();
        return pages[index]
    }

    async switchToWindowByURL(partialURL: string) {
        const pages = this.page.context().pages();

        for (const p of pages) {
            if (p.url().includes(partialURL)) {
                await p.bringToFront();
                await p.waitForLoadState();
                return p;
            }
        }

        throw new Error(`No window found with URL: ${partialURL}`);
    }

    async switchToWindowByTitle(partialTitle: string) {
        const pages = this.page.context().pages();

        for (const p of pages) {
            await p.waitForLoadState(); // ensures page is loaded
            const title = await p.title();

            if (title.includes(partialTitle)) {
                await p.bringToFront();
                return p;
            }
        }

        throw new Error(`No window found with title: ${partialTitle}`);
    }

    //Frames    

    async numberOfFrames() {
        const frames = this.page.frames();
        return frames.length
    }

    async navigateToFrameByURL(frameUrl: string) {
        return this.page.frame({ url: frameUrl })
    }

    async navigateToFrameByName(frameName: string) {
        return this.page.frame({ name: frameName })
    }

    async navigateToFrameByFrameLocator(frameLocator: string) {
        return this.page.frameLocator(frameLocator)
    }

    //Alerts    
    async acceptAlert() {
        this.page.on('dialog', async (dialog) => {
            console.log('Dialog Type:', dialog.type());
            console.log('Dialog message:', dialog.message());
            await dialog.accept(); // or dialog.dismiss(); 
        });
    }

    async dismissAlert() {
        this.page.on('dialog', async (dialog) => {
            console.log('Dialog Type:', dialog.type());
            console.log('Dialog message:', dialog.message());
            await dialog.dismiss();
        });
    }

    async enterValueAndAcceptAlert(text: string) {
        this.page.on('dialog', async (dialog) => {
            console.log('Dialog Type:', dialog.type());
            console.log('Dialog message:', dialog.message());
            console.log(dialog.defaultValue())
            await dialog.accept(text);
        });
    }

    //File download   

    async clickAndDownloadFile(locator: Locator) {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            locator.click()
        ])

        return download
    }

    //Dropdown oprations    

    async selectDropDownByVisibleText(locator: Locator, option: any) {
        await locator.selectOption(option);
    }

    async selectDropDownByValueAttribute(locator: Locator, value: any) {
        await locator.selectOption({ value: value });
    }

    async selectDropDownByIndex(locator: Locator, index: number) {
        await locator.selectOption({ index: index });
    }

    async selectDropDownByLabel(locator: Locator, label: any) {
        await locator.selectOption({ label: label });
    }

    async selectMultipleDropDownOptions(locator: Locator, options: []) {
        await locator.selectOption(options);
    }

    async verifycountDropdownElements(locator: Locator, expectedCount: number) {
        await expect(locator).toHaveCount(expectedCount);
    }

    async verifyIfOptionIsPresentInDropdrown(locator: Locator, expectedOption: any) {
        const optionsText = await locator.allInnerTexts();
        const trimmedText = optionsText.map(text => text.trim())
        expect(trimmedText).toContain(expectedOption);
    }

    async printAllDropDownOptions(locator: Locator) {
        const texts = await locator.allTextContents();
        for (const text of texts) {
            console.log(text);
        }
    }

    async verifyIfDropdownValuesAreAlphabeticalOrder(locator: Locator) {
        const options = await locator.allInnerTexts();
        const trimmedText = options.map(text => text.trim())
        const original = [...trimmedText];
        const sorted = [...trimmedText].sort();
        expect(original).toEqual(sorted);
    }

    async checkForDuplicateOptions(locator: Locator) {
        const options = await locator.allInnerTexts();
        const set = new Set();
        const duplicates = [];
        for (const item of options) {
            if (set.has(item)) {
                duplicates.push(item);
            } else {
                set.add(item);
            }
        }
        console.log("Duplicate items:", duplicates);
    }

    //Mouse operations    

    async mouseHover(locator: Locator) {
        await locator.hover()
    }

    async doubleClick(locator: Locator) {
        await locator.dblclick()
    }

    async dragAndDrop(source: Locator, target: Locator) {
        //Drag and drop manully   
        // await source.hover()
        // await this.page.mouse.down()
        // await target.hover()
        // await this.page.mouse.up()

        await source.dragTo(target);
    }

    async moveMouseToCoordinates(index1: number, index2: number) {
        await this.page.mouse.move(index1, index2);
    }

    //Scroll in page

    async scrollBottomOfPage() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        })
    }

    async getCurrentPageScrollHeight() {
        const currentHeight = await this.page.evaluate(() => {
            document.body.scrollHeight;
        })
        return currentHeight
    }

    //Keyboard actions

    async focusOnElement(locator: Locator) {
        await locator.focus()
    }

    async enterTextUsingKeyboardActions(text: string) {
        await this.page.keyboard.insertText(text)
    }

    async pressKeyDown(key: string) {
        await this.page.keyboard.down(key);
    }

    async pressKeyUp(key: string) {
        await this.page.keyboard.up(key);
    }

    async pressKey(key: string) {
        await this.page.keyboard.press(key); //Press will perform both down and up actions
    }

    async pressCtrlC() {
        await this.page.keyboard.press('Control+C');
    }

    async pressCtrlV() {
        await this.page.keyboard.press('Control+V');
    }

    async pressCtrlA() {
        await this.page.keyboard.press('Control+A');
    }

    async type(text: string) {
        await this.page.keyboard.type(text);
    }

    //Cookies

    async addCookies(cookie: any[]) {
        const cookies = await this.page.context().addCookies(cookie);
        console.log(cookies);
    }

    async getCookies() {
        const cookies = await this.page.context().cookies();
        console.log(cookies);
    }

    async deleteCookies() {
        await this.page.context().clearCookies();
    }

    //Accessibility

    async returnAllTypesOfAccessibilityResults() {
        // Printing all types of WCAG violations
        let page = this.page
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        console.log(accessibilityScanResults)
        console.log("Violations: " + accessibilityScanResults.violations.length)
        // expect(accessibilityScanResults.violations.length).toEqual(0)
    }

    async returnFewTypesOfAccessibilityResults(testInfo, rules: any[]) {
        //   Scanning few WCAG violations
        let page = this.page
        const accessibilityScanResults1 = await new AxeBuilder({ page }).withTags(rules).analyze()

        testInfo.attach('Accessibility Scan Results', {
            body: JSON.stringify(accessibilityScanResults1, null, 2),
            contentType: 'application/json'
        })
        console.log("Violations: " + accessibilityScanResults1.violations.length)
    }

    async disableFewValidations(testInfo, disableViolation: any[]) {
        //   Scanning WCAG violations with disabled rules
        let page = this.page
        const accessibilityScanResults1 = await new AxeBuilder({ page }).disableRules(disableViolation).analyze()

        testInfo.attach('Accessibility Scan Results with few disabled Rules', {
            body: JSON.stringify(accessibilityScanResults1, null, 2),
            contentType: 'application/json'
        })
        console.log("Violations: " + accessibilityScanResults1.violations.length)
    }

    //   Get text

    async getFirstElement(locator: Locator) {
        await locator.first().innerText()
    }

    async getLastElement(locator: Locator) {
        await locator.last().innerText()
    }

    async getnthElement(locator: Locator, index: number) {
        await locator.nth(index).innerText()
    }

    // API

    async postRequest(endPoint: any, requestBody: any) {
        const response = await this.request.post(endPoint, requestBody)
        const responseBody = await response.json()
        console.log(responseBody)
        return [response, responseBody]
    }

    async putRequest(endPoint: any, requestBody: any) {
        const response = await this.request.put(endPoint, requestBody)
        const responseBody = await response.json()
        console.log(responseBody)
        return [response, responseBody]
    }

    async patchRequest(endPoint: any, requestBody: any) {
        const response = await this.request.patch(endPoint, requestBody)
        const responseBody = await response.json()
        console.log(responseBody)
        return [response, responseBody]
    }

    async deleteRequest(endPoint: any, requestBody: any) {
        const response = await this.request.delete(endPoint, requestBody)
        return response
    }

    async getRequest(endPoint: any) {
        const response = await this.request.get(endPoint)
        const responseBody = await response.json()
        console.log(responseBody)
        return [response, responseBody]
    }

    async getRequestWithQueryParameters(endPoint: any, requestBody: any) {
        const response = await this.request.get(endPoint, requestBody)
        const responseBody = await response.json()
        console.log(responseBody)
        return [response, responseBody]
    }
}