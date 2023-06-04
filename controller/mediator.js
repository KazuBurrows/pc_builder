/**
 * Single point of communication between other scripts
 * 
*/

var db_route = require('./db_controller.js');
// const { MyCpu } = require('./products/ProductCpu.js');
// var product_routes = require('./product_routes.js');


/**
 * Insert a new product into db
 * @param {string} product_type "what table to use e.g cpu, motherboard"
 * @param {object} product "product object"
*/
function insert_product(product)
{

    switch (product.type)
    {
        case "CPU":
            console.log(db_route.method.insert_cpu(product));
            break;

        case "MOTHERBOARD":
            console.log(db_route.method.insert_motherboard(product));
            break;


    }
}


/**
 * Select a product in db
 * @param {string} product_type "what table to use e.g cpu, motherboard"
 * @param {string} sort_by "e.g sort by price & core_count > 6"
*/
function select_product(product_type, ...sort_by)
{
    
}


/**
 * If is_product_equal() returns false because price of product has changed the update db
 * @param {string} product "product object"
*/
function update_product(product)
{
    if (!is_product_equal(product))          // if is_product_equal returns false update db
    {

    }
    
}


/**
 * Compare existing 'product' in db with passed 'new_product'
 * @param {object} new_product "product object"
 * @return {boolean} "true if 'new_product' == 'product' in db"
*/
function is_product_equal(new_product)
{
    
}


/**
 * Remove a product in db
 * @param {object} product "product object"
*/
function delete_product(product)
{

}


/**
 * Run webscraper on Mightyape
 */
function run_mightyape_puppet()
{

}


/**
 * Run webscraper on Pbtech
 */
 function run_pbtech_puppet()
 {
 
 }


 /**
 * Run webscraper on Pcforce
 */
function run_pcforce_puppet()
{

}


/**
 * Run webscraper on Trademe
 */
 function run_trademe_puppet()
 {
 
 }






 /** Test inserting a product to db */

// let my_cpu = new product_routes.MyCpu();
// insert_product(my_cpu);







var methods = {
	insert_product: function(product) {
        insert_product(product);
	}
};






// var conn = connect();
// conn.end();


exports.method = methods;
