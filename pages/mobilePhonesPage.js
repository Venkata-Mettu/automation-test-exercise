import { $, expect } from '@wdio/globals'
import BasePage from './basePage.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MobilePhonesPage extends BasePage {
    /**
     * define selectors using getter methods
     * 
     */

    get itemsList() {
        return $$('//div[@data-component-type="s-search-result" and contains(@data-cel-widget,"search_result")]//div[@data-cy="title-recipe"]//span');
    }

    async verifyListdItemsWithNameContaining(itemName) {
        // await this.itemsList.get(0).waitForDisplayed({ timeout: 60000 })
        const length = await this.itemsList.length;
        console.log(`*************************`,length);
        await this.itemsList.forEach(async (element) => {

            const phoneName = await element.getText();
            console.log(phoneName);

            await expect(element).toBeDisplayed()
            await expect(element).toHaveTextContaining(itemName)        });
    
    }
}

export default new MobilePhonesPage();
