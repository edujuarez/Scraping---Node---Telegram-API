import { launch } from 'puppeteer';

async function startBrowser() {
    let browser;
    try {
        console.log('Opening the browser.....');
        browser = await launch({
            headless: false,
            args: ["--disable-setiuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}

export default startBrowser();