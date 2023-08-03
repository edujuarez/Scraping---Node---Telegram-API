import puppeteer from "puppeteer";
import botTelegram from "./botTelegram.js";

const getQuotes = async () => {
    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto("https://buenosaires.embaixadaportugal.mne.gov.pt/pt/", {
        waitUntil: "domcontentloaded",
    });

    //Traemos la data que queremos comparar
    const quotes = await page.evaluate(() => {
        const quote = document.querySelector("div.custom.box4");

        const text = quote.querySelector('p:nth-of-type(5)').innerText;

        return text
    })
    const oldText = "No dia 28 de abril de 2023 serão disponibilizados no Portal E-Visa os agendamentos para o segundo quadrimestre do ano 2023."

    if (quotes === oldText) {
        console.log('Sin cambios.')
        console.log(quotes)
        console.log(oldText)
    } else {
        console.log('hubieron cambios!')
        botTelegram();
    }

    // Close the browser
    await browser.close();


};

// Start the scraping
getQuotes();