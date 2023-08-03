import pageScraper from './pageScraper.js';

async function scrapeAll(browserInstance) {
    let browser
    try {
        browser = await browserInstance;
        await pageScraper.scrapper(browser);
    }
    catch (err) {
        console.log("No se pudo obtener la instancia, error: ", err);
    }
}
export default (browserInstance) => scrapeAll(browserInstance);