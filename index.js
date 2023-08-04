import puppeteer from "puppeteer";
import botTelegram from "./botTelegram.js";

const getQuotes = async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    // On this new page:
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
    function stringToAscii(text) {
        let asciiValues = [];
        for (let i = 0; i < text.length; i++) {
          const asciiValue = text.charCodeAt(i);
          asciiValues.push(asciiValue);
        }
        return asciiValues;
      }
    const oldText = "[78,111,32,100,105,97,32,50,56,32,100,101,32,97,98,114,105,108,32,100,101,32,50,48,50,51,32,115,101,114,227,111,32,100,105,115,112,111,110,105,98,105,108,105,122,97,100,111,115,160,110,111,32,80,111,114,116,97,108,32,69,45,86,105,115,97,32,111,115,32,97,103,101,110,100,97,109,101,110,116,111,115,32,112,97,114,97,32,111,32,115,101,103,117,110,100,111,32,113,117,97,100,114,105,109,101,115,116,114,101,32,100,111,32,97,110,111,32,50,48,50,51,46]"
    
      const quotesAscci = JSON.stringify(stringToAscii(quotes));
      const now = new Date();
      const formattedDate = now.toLocaleString();
    if (oldText === quotesAscci) {
        console.log('Sin cambios. ' + formattedDate)
    } else {
        console.log('Hubieron cambios!')
        botTelegram();
    }

    // Close the browser
    await browser.close();


};

// Start the scraping
getQuotes();
setInterval(getQuotes, 600000)
