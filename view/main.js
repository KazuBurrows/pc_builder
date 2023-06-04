
var mediator_route = require('../controller/db_controller.js');




const { MyCpu } = require('../model/products/ProductCpu.js');
var product_routes = require('../controller/product_routes.js');

let my_cpu = new product_routes.MyCpu("Ryzen 5 3600", "AMD", 6, 3.6, 65, 0000);
mediator_route.method.insert_cpu(my_cpu);
// console.log(my_cpu)