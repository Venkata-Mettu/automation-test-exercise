import { expect } from '@wdio/globals'
import BasePage from './basePage.js';

class MobilePhonesPage extends BasePage {
    
    get itemsList() {
        return $$('//div[@data-component-type="s-search-result" and contains(@data-cel-widget,"search_result")]//div[@data-cy="title-recipe"]//span');
    }

    async verifyListdItemsWithNameContaining(itemName) {
        await this.itemsList.forEach(async (element) => {

            const displayedItemName = await element.getText();
            console.log(displayedItemName);

            await expect(element).toBeDisplayed()
            await expect(element).toHaveTextContaining(itemName)
        });

    }
}

export default new MobilePhonesPage();
