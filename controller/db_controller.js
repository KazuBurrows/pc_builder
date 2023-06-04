const { MyCpu } = require('../model/products/ProductCpu');

/**
 * "Connect to database"
 * @return {mysql.Connection} "The connection"
 */
function connect()
{
    var mysql = require('mysql');

    var conn = mysql.createConnection({
        host: "freedb.tech",
        user: "freedbtech_Freezerz",
        password: "Rockstar03",
        database: "freedbtech_parts"
      });
      
      conn.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
    return conn;
}


/**
 * "Inserts a new cpu item into db"
 * @param {object} cpu "cpu object"
 * @returns {string} "success or fail message"
 */
function hard_insert_cpu(cpu)
{  
  var cpu = MyCpu.class(cpu);                                                                    //Cast cpu object

  try {
    var conn = connect();                                                                        //Connection to db
  } catch(e) {
    return "Connection to db failed.";
  }

  try {
    var sql = "INSERT INTO cpu (name, brand, core_count, " +                                     //Sql statement
    "core_clock, tdp, link_ID) VALUES (" + cpu.sql_format() + ")";

    run_sql(conn, sql);
    conn.end();                                                                                  //Close connection to db

  } catch(e) {
    return "Failed to insert cpu into db."
  }

  return "Successfully inserted " + cpu.name +" into db";
}


/**
 * "Inserts a new motherboard item into db"
 * @param {object} motherboard "motherboard object"
 * @returns {string} "success or fail message"
 */
function hard_insert_motherboard(motherboard)
{

}






/**
 * "Run sql query"
 * @param {mysql.Connection} conn "db connection"
 * @param {string} sql "sql statement"
 */
function run_sql(conn, sql)
{
  conn.query(sql, function (err, result) {                                                        //Run sql statement
    if (err) throw err;
  });
}









/**
 * Public methods for exports
 */
var methods = {
	insert_cpu: function(product) {
    var response_message = hard_insert_cpu(product);
		console.log(response_message);
	},
	insert_motherboard: function(product) {
		var response_message = hard_insert_cpu(product);
		console.log(response_message);
	}
};

exports.method = methods;
