import { browser } from '@wdio/globals'


export default class BasePage {

    open(path) {
        browser.maximizeWindow();
        return browser.url(`https://www.Amazon.co.uk/${path}`)
    }
}
