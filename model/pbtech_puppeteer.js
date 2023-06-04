// node pbtech_puppeteer.js CPU AMD AMD_RYZEN_5

const SEARCH_CATEGORY = {
	CPU: "CPUs",
	MOTERBOARD: "Motherboards",
	SSD_DRIVE: "SSD Drives",
	HARD_DRIVE: "Internal Hard Drives",
	RAM: "RAM / Memory",
	GRAPHICS_CARD: "Video Cards",
	CASE: "Cases & Chassis",
	POWER: "Power Supplies",
	COOLING: "Cooling",
	OPTICAL_DRIVE: "Optical Drives",
	SOUND_CARD: "Sound Cards",
	IO_CARD: "IO, SCSI, IDE Cards",
	CAPTURE_CARD: "TV & Video Capture Cards",
}

const CPU_BRAND = {
	AMD: "AMD",
	HPE: "HPE",
	INTEL: "Intel",
	LENOVO: "Lenovo",
	PB: "PB",
}

const CPU_FAMILIY = {
	AMD_EPYC: "3269",
	AMD_RYZEN_3: "3208",
	AMD_RYZEN_5: "3152",
    AMD_RYZEN_7: "3118",
    AMD_RYZEN_9: "4773",
    Intel_Core_i3: "173",
    Intel_Core_i5: "174",
    Intel_Core_i7: "52",
    Intel_Core_i9: "3351",
    Intel_Pentium: "53",
    Intel_Xeon: "54",
    Intel_Xeon_E3: "767",
    Intel_Xeon_E5: "768",
    Intel_Xeon_Bronze: "3243",
    Intel_Xeon_Silver: "3244",
    Intel_Xeon_Gold: "3245",
    Intel_Xeon_Platinum: "3246",
}



var category;
var brand;
var family;



const puppeteer = require('puppeteer');

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);



switch (myArgs[0]) {        // SETTING 'category' variable with terminal input
  case 'CPU':
      category = SEARCH_CATEGORY.CPU
      break;
  case 'MOTERBOARD':
      category = SEARCH_CATEGORY.MOTERBOARD
      break;
  case 'SSD_DRIVE':
      category = SEARCH_CATEGORY.SSD_DRIVE
      break;
  case 'HARD_DRIVE':
      category = SEARCH_CATEGORY.HARD_DRIVE
      break;
  case 'RAM':
      category = SEARCH_CATEGORY.RAM
      break;
  case 'GRAPHICS_CARD':
      category = SEARCH_CATEGORY.GRAPHICS_CARD
      break;
  default:
      console.log('Something went wrong');
      fail;
  }


switch (myArgs[1]) {        // SETTING 'brand' variable with terminal input
  case 'AMD':
      brand = CPU_BRAND.AMD
      break;
  case 'HPE':
      brand = CPU_BRAND.HPE
      break;
  case 'INTEL':
      brand = CPU_BRAND.INTEL
      break;
  case 'LENOVO':
      brand = CPU_BRAND.LENOVO
      break;
  case 'PB':
      brand = CPU_BRAND.PB
      break;
  default:
      console.log('Something went wrong');
      fail;
  }


  switch (myArgs[2]) {        // SETTING 'family' variable with terminal input
  case 'AMD_EPYC':
      family = CPU_FAMILIY.AMD_EPYC
      break;
  case 'AMD_RYZEN_3':
      family = CPU_FAMILIY.AMD_RYZEN_3
      break;
  case 'AMD_RYZEN_5':
      family = CPU_FAMILIY.AMD_RYZEN_5
      break;
  case 'AMD_RYZEN_7':
      family = CPU_FAMILIY.AMD_RYZEN_7
      break;
  case 'AMD_RYZEN_9':
      family = CPU_FAMILIY.AMD_RYZEN_9
      break;
  default:
      console.log('Something went wrong');
      fail;
  }




try {
    (async () => {
        const browser = await puppeteer.launch({
            headless: true,     //Gui toggle
            defaultViewport: null
            
        });
        const page = await browser.newPage();

        await page.setRequestInterception(true);                                                            //Block loading images
        page.on('request', (req) => {
            if(req.resourceType() === 'image'){
                req.abort();
            }
            else {
                req.continue();
            }
        });

        
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.pbtech.co.nz/category/components', {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0 });

      
        await page.waitForSelector('#b25279');
        await page.click('[alt="' + category + '"]');

        await page.waitForSelector('[class="p_atc_button_dd mobileSml"]');
        await page.click('[class="p_atc_button_dd mobileSml"]');

        await page.waitForSelector('.rec_num');
        await page.select('select[class="rec_num"]', '96');
        await page.waitForNavigation();
        
        var scraped_results = [];

        scraped_results = scrapePage(page);


        console.log("results: " + scraped_results.toString());


        // Now do something with the data



    })();

} catch (err) {
    console.error(err);
};




/**
 * Get all products from website
 * @param {puppeteer.page} page
 * @returns {Array} "Scraped results from website"
 */
async function scrapePage(page)
{

    var scraped_results = [];
    while(1)
    {
        // await page.waitForSelector('[class="page_next ripple"]');
        await page.waitForSelector('[class="products_list_wrapper expanded_list"]');

        const results = await page.$$eval('[class="none_slider d-flex flex-wrap"]', rows => {      //CSS selector and lambda function( x => y)
            return rows.map(row => {
                var return_list = [];

                const listItems = row.children;
                const listArray = Array.from(listItems);
                listArray.forEach((item) => {
                    var linkName = item.className;
                    if (linkName != 'item') {
                        return;
                    }

                    const linkElement = item.querySelector('.item_line_name');
                    var link = linkElement.href;

                    const priceElement = item.querySelector('.price_full');
                    var price = priceElement ? priceElement.innerText : '';

                    // const titleElement = item.querySelector('.item_line_name');
                    // var title = titleElement.getAttribute('title');
                    var title = "Nothing";



                    const itemAttribute = item.querySelector('.attWrap');
                    const itemAttribute_children = itemAttribute.children;
                    for (var i=0; i < itemAttribute.childElementCount; i++) {               //Loop to retrive items attributes e.g price, name, specs...
                        var attribute = itemAttribute_children[i];

                        //Need switch



                    }




                    return_list.push([title, price, link]);
                });

            
            return return_list;
            });
        });
        
        scraped_results = scraped_results.concat(results);

        
        // await page.waitForSelector('[class="page_pagination]');
        var isLoadingSucceeded = await page. $('[class="page_next ripple"]'). then (res =>!! res);
        if (!isLoadingSucceeded) {
            console.log("Breaking loop");
            break;
        }

        await page.click('[class="page_next ripple"]');


        
    }//End of loop

    console.log(scraped_results);
    return scraped_results;
}