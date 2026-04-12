import faker from 'faker';
import { Page } from '@playwright/test'
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
}