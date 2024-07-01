import { $ } from '@wdio/globals'
import BasePage from './basePage.js';


class HomePage extends BasePage {
    
    get acceptCookiesBtn () {
        return $("//input[contains(@id, 'accept') and @name='accept']");
    }
    
    /**
     * overwrite basepage object
     */
    open () {
        return super.open('');
    }

    async acceptCookies() {
        await this.acceptCookiesBtn.click();
    }
}

export default new HomePage();
