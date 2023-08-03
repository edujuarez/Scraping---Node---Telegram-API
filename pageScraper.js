//Iremos hacia la pagina a scrapear
const scraperObject = {
    url: "https://buenosaires.embaixadaportugal.mne.gov.pt/pt/",
    async scrapper(browser) {
        let page = await browser.newPage();
        console.log(`Ingresando a ', ${url}...`);
        await page.goto(url);
    }
}
export default scraperObject;
