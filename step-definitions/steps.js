import { Given, When, Then } from '@wdio/cucumber-framework';

import HomePage from '../pages/homePage.js';
import MobilePhonesPage from '../pages/mobilePhonesPage.js';
import FilterPage from '../pages/filterPage.js';


Given(/^I am on the Amazon home page$/, async () => {
    await HomePage.open();
    await HomePage.acceptCookies();
});

When(/^I navigate to the Mobile Phones department$/, async () => {
    await FilterPage.goToMobilePhonesAndSmartphonesSection();

});

When(/^I apply below filters$/, async (dataTable) => {
    const filters = dataTable.hashes()[0];
    await FilterPage.applyFilter(filters);
});


Then(/^I should see list of (\w+) phones$/, async (brand) => {
    await MobilePhonesPage.verifyListdItemsWithNameContaining(brand);
});
