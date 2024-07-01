import { $ } from '@wdio/globals'
import BasePage from './basePage.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FilterPage extends BasePage {
    /**
     * define selectors using getter methods
     */
    get allHamburgerMenuCTA () {
        return $('#nav-hamburger-menu');
    }

    get electronicsAndComputersDepartmentCTA () {
        return $("//a/div[text()='Electronics & Computers']");
    }

    get phonesAndAccessoriesDepartmentCTA () {
        return $("//a[contains(text(),'Phones') and contains(text(),'Accessories')]");
    }

    get mobilePhonesAndSmartphonesCTA () {
        return $("//a[text()='Mobile Phones & Smartphones']");
    }

    get smartPhonesCTA () {
        return $("//a[contains(text(),'Smartphones')]");
    }

    refinementFilters(key, keyValue) {
        return $(`//span[contains(text(),'${key}')]/parent::div//following-sibling::ul//span[contains(text(),'${keyValue}')]/preceding-sibling::div//i[contains(@class,'checkbox')]`);
    }
    get goBtn () {
        return $("//input[@aria-label='Go - Submit price range' and @class='a-button-input' and @type='submit']");
    }

    get newConditionCTA () {
        return $("//span[contains(text(),'Condition')]/parent::div//following-sibling::ul//span[text()='New']");
    }
   

    async goToMobilePhonesAndSmartphonesSection() {
        await this.allHamburgerMenuCTA.click();
        await this.electronicsAndComputersDepartmentCTA.scrollIntoView();
        await this.electronicsAndComputersDepartmentCTA.click();
        await this.phonesAndAccessoriesDepartmentCTA.click({ button: 'left'});
        await this.mobilePhonesAndSmartphonesCTA.waitForClickable({ timeout: 30000 });
        await this.mobilePhonesAndSmartphonesCTA.click();
        await this.smartPhonesCTA.click();
    }

    async applyFilter(filters) {

        const brandCheckbox = await this.refinementFilters('Brand',filters.brand);
        await brandCheckbox.scrollIntoView();
        await brandCheckbox.click();

        const yearCheckbox = await this.refinementFilters('Year',filters.year);
        await yearCheckbox.scrollIntoView();
        await yearCheckbox.click();

        const cameraResolutionCheckbox = await this.refinementFilters('Camera',filters.camera);
        await cameraResolutionCheckbox.scrollIntoView();
        await cameraResolutionCheckbox.click();

        await this.newConditionCTA.click();
        
        await browser.url(await browser.getUrl()+`&low-price=${filters.lowerPriceBound}.0&high-price=${filters.upperPriceBound}`);
        await this.goBtn.click();
        
    }

}

export default new FilterPage();
