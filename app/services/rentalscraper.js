import puppeteer from 'puppeteer';

async function getRentalData() {

    const browser = await puppeteer.launch({
        executablePath:
         '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: false, 
       });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36');

    let houseUrls = [];
    try {
        await page.goto('https://www.funda.nl/zoeken/huur?selected_area=%5B%22gemeente-amsterdam%22%5D&price=%22-2000%22&publication_date=%223%22&floor_area=%2250-%22', { waitUntil: "networkidle2"});
        
        await page.waitForSelector('script[type="application/ld+json"]');
        
        const jsonData = await page.evaluate(() => {
            const jsonScript = document.querySelector('script[type="application/ld+json"]');
            return jsonScript ? JSON.parse(jsonScript.innerText) : null;
        });

        let item;
        for (item of jsonData['itemListElement']) {
            houseUrls.push(item['url']);
        }
    } catch(err) {
        console.log('Web page has error!');
    }
    

    let house = [];
    for (let i = 0; i < houseUrls.length; i++) {
        
        const client = await page.createCDPSession();
        const cookiesBefore = await client.send('Network.getAllCookies');
        await client.send('Network.clearBrowserCookies');
        
        let url = houseUrls[i];
        await page.goto(`${url}`);
        await page.waitForSelector('script[type="application/ld+json"]');
        
        const houseDetail = await page.evaluate(() => {
            const jsonScript = document.querySelector('script[type="application/ld+json"]');
            return jsonScript ? JSON.parse(jsonScript.innerText) : null;
        });

        // house post code
        let front = houseDetail['description'].search(houseDetail['name'])+houseDetail['name'].length +1;
        var postCode = houseDetail['description'].substr(front,7);

        let houseUrl = houseDetail['id'];

        let img = [];
        for (let photo of houseDetail['photo']) {
            img.push(photo['contentUrl']);
        }
        
        let houseprice;
        if (houseDetail['offers']['price']) {
            houseprice = houseDetail['offers']['price'];
        } else {
            houseprice = 0;
        }
        
        house.push({"name": houseDetail['name'], "city" : houseDetail['address']['addressLocality'], "region" : houseDetail['address']['addressRegion'], "postcode" : postCode, "price" : houseprice, "imgUrl" : img, "url" : houseUrl })
        
    }

    await browser.close();
    return house;
}

export default getRentalData;