
const puppeteer = require('puppeteer');

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs[0]);
var searchWord = myArgs[0];

try {
    (async () => {
      const browser = await puppeteer.launch({
        headless: false,     //Gui toggle
        defaultViewport: null
      })

      const page = await browser.newPage()
      await page.setDefaultNavigationTimeout(0);
      await page.goto('https://www.trademe.co.nz/', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
      })
      await page.type('#searchString', searchWord);
      await page.click('.icon-search-large');
      
      await page.waitForSelector('#ListingsTitle_buyNowOption');
      await page.click('[for="ListingsTitle_BuyNowCheckBox"]');

      await page.waitForSelector('.supergrid-bucket');
      const results = await page.$$eval('.supergrid-bucket', rows => {      //CSS selector and lambda function( x => y)
        return rows.map(row => {

          var return_list = [];

          const listItems = row.children;
          const listArray = Array.from(listItems);
          listArray.forEach((item) => {
            var linkElement = item.href;

            if (linkElement == null) {
              return;
            }

            const priceElement = item.querySelector('.listingBuyNowPrice');
            var price = priceElement ? priceElement.innerText : '';

            const titleElement = item.querySelector('.title');
            var title = titleElement ? titleElement.innerText : '';
            
            return_list.push([title, price, linkElement]);


            
          });

          
          return return_list;
          
        })
    });

    console.log(results);


    var fs = require('fs');

    var file = fs.createWriteStream('results.txt');
    file.on('error', function(err) { /* error handling */ });
    results.forEach(function(v) { file.write(v.join(', ') + '\n'); });
    file.end();



    //await browser.close();
    })()
  } catch (err) {
    console.error(err);
  }

