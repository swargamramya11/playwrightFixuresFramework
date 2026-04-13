import faker from 'faker';
import { Page, expect } from '@playwright/test'
import { Locator } from '@playwright/test'

export class ReusableMethods {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
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

    async clickAndDownloadFile(locator: Locator) {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            locator.click()
        ])

        return download
    }

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
        const trimmedText = optionsText.map(text=>text.trim())
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
        const trimmedText = options.map(text=>text.trim())
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
}