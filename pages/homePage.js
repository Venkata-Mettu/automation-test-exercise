import { $ } from '@wdio/globals'
import BasePage from './basePage.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends BasePage {
    /**
     * define selectors using getter methods
     */
    get acceptCookiesBtn () {
        return $("//input[contains(@id, 'accept') and @name='accept']");
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        // await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('');
    }

    async acceptCookies() {
        await this.acceptCookiesBtn.click();
    }
}

export default new HomePage();
