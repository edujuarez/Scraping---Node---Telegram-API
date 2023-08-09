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
    await page.goto("https://buenosaires.embaixadaportugal.mne.gov.pt/es/", {
        waitUntil: "domcontentloaded",
    });

    //Traemos la data que queremos comparar
    const quotes = await page.evaluate(() => {
        const quote = document.querySelector("div.custom.box4");

        const text = quote.querySelector('p:nth-of-type(7)').innerText;

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
    const oldText = "[69,108,32,100,237,97,32,50,56,32,100,101,32,97,98,114,105,108,32,100,101,32,50,48,50,51,32,115,101,32,104,97,98,105,108,105,116,97,114,111,110,32,101,110,32,101,108,32,80,111,114,116,97,108,32,69,45,86,105,115,97,32,108,111,115,32,116,117,114,110,111,115,32,99,111,114,114,101,115,112,111,110,100,105,101,110,116,101,115,32,97,108,32,115,101,103,117,110,100,111,32,99,117,97,116,114,105,109,101,115,116,114,101,32,100,101,108,32,97,241,111,32,50,48,50,51,46,32,9830,76,111,115,32,116,117,114,110,111,115,32,112,97,114,97,32,101,115,116,101,32,112,101,114,237,111,100,111,32,115,101,32,101,110,99,117,101,110,116,114,97,110,32,116,111,100,111,115,32,116,111,109,97,100,111,115,44,32,112,111,114,32,108,111,32,116,97,110,116,111,44,32,100,101,98,101,114,225,32,97,103,117,97,114,100,97,114,32,97,108,32,112,114,243,120,105,109,111,32,112,101,114,237,111,100,111,32,101,110,32,101,108,32,113,117,101,32,115,101,32,104,97,98,105,108,105,116,101,110,32,116,117,114,110,111,115,32,113,117,101,32,112,111,115,105,98,108,101,109,101,110,116,101,32,115,101,114,225,32,100,117,114,97,110,116,101,32,108,111,115,32,250,108,116,105,109,111,115,32,100,237,97,115,32,100,101,108,32,109,101,115,32,100,101,32,97,103,111,115,116,111,32,100,101,32,50,48,50,51,46,9830,160]"
    
      const quotesAscci = JSON.stringify(stringToAscii(quotes));
      const now = new Date();
      const formattedDate = now.toLocaleString();
    if (oldText === quotesAscci) {
        console.log('Sin cambios. ' + formattedDate)
    } else {
        console.log('Hubieron cambios!')
        botTelegram(quotes);
    }

    // Close the browser
    await browser.close();


};

// Start the scraping
getQuotes();
setInterval(getQuotes, 600000)
