import { Page, expect, Locator } from '@playwright/test'

export class RegistrationPage {
    private readonly page: Page;
    private readonly rhjhje: Locator;
    
    constructor(page: Page) {
        this.page = page
        this.rhjhje = page.locator('')
    }

    async methodName() {
        
    }
}