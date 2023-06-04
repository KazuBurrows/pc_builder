//https://www.pcforce.co.nz/index.php?main_page=index&cPath=134

const SEARCH_CATEGORY = {
	CASE: "Cases",
	COOLING: "Cooling Devices",
	CPU: "CPU",
	GRAPHICS_CARD: "Graphic Cards",
	HARD_DRIVE: "Hard Drives",
	RAM: "Memory",
	MOTERBOARD: "Motherboards",
	OPTICAL_DRIVE: "Optical Drives",
	POWER: "Power Supplies",
}

const CPU_BRAND = {
	AMD: "AMD CPUs",
	INTEL: "Intel Socket 1200 CPUs",
}

var category;
var brand;
var family;


const puppeteer = require('puppeteer');

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);



switch (myArgs[0]) {        // SETTING 'category' variable with terminal input
    case 'CASE':
        category = SEARCH_CATEGORY.CASE
        break;
    case 'COOLING':
        category = SEARCH_CATEGORY.COOLING
        break;
    case 'CPU':
        category = SEARCH_CATEGORY.CPU
        break;
    case 'GRAPHICS_CARD':
        category = SEARCH_CATEGORY.GRAPHICS_CARD
        break;
    case 'HARD_DRIVE':
        category = SEARCH_CATEGORY.HARD_DRIVE
        break;
  default:
      console.log('Something went wrong');
      fail;
  }



  switch (myArgs[1]) {        // SETTING 'brand' variable with terminal input
  case 'AMD':
      brand = CPU_BRAND.AMD
      break;
  case 'INTEL':
      brand = CPU_BRAND.INTEL
      break;
  default:
      console.log('Something went wrong');
      fail;
  }




try {
    (async () => {
      const browser = await puppeteer.launch({
        headless: false,     //Gui toggle
        defaultViewport: null
      })

      const page = await browser.newPage()
      await page.setDefaultNavigationTimeout(0);
      await page.goto('https://www.pcforce.co.nz/index.php?main_page=index&cPath=134&zenid=vbm2tmvltl9p662p1hr1hv14p5', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
      })



    await page.waitForSelector('#indexCategories');
    await page.click('[alt="' + category + '"]');

    await page.waitForSelector('.categoryListBoxContents');
    await page.click('[alt="' + brand + '"]');

    await page.waitForSelector('#productListing');


    const results = await page.$$eval('[id="productListing"]', rows => {      //CSS selector and lambda function( x => y)
        return rows.map(row => {

          var return_list = [];

          const listItems = row.children;
          const listArray = Array.from(listItems);
          listArray.forEach((item) => {
            var linkName = item.className;

            if (linkName != 'centerBoxContentsProducts centeredContent back') {
              return;
            }

            const linkElement = item.firstElementChild;
            var link = linkElement.href;

            const priceElement = item.querySelector('.pl-price').firstElementChild;
            var price = priceElement ? priceElement.innerText : '';

            const titleElement = item.querySelector('.itemTitle').firstElementChild;
            var title = titleElement.innerHTML;

            return_list.push([title, price, link]);

            
          });

          
          return return_list;

        })
    });

    console.log(results);




    })()

} catch (err) {
    console.error(err);
};