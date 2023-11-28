
var BasGateChecksum = require("./BasGateChecksum");

var basgateParams = {};

/* Generate Checksum via Array */

/* initialize an array */
basgateParams["MID"] = "YOUR_MID_HERE";
basgateParams["ORDERID"] = "YOUR_ORDER_ID_HERE";

/**
* Generate checksum by parameters we have
*/
var basgateChecksum = BasGateChecksum.generateSignature(basgateParams, "YOUR_MERCHANT_KEY");
basgateChecksum.then(function(result){
	console.log("generateSignature Returns: " + result);
	var verifyChecksum =  BasGateChecksum.verifySignature(basgateParams, "YOUR_MERCHANT_KEY",result);
	console.log("verifySignature Returns: " + verifyChecksum);
}).catch(function(error){
	console.log(error);
});

/* Generate Checksum via String */

/* initialize JSON String */ 
body = "{\"mid\":\"YOUR_MID_HERE\",\"orderId\":\"YOUR_ORDER_ID_HERE\"}"

/**
* Generate checksum by parameters we have
*/
var basgateChecksum = BasGateChecksum.generateSignature(body, "YOUR_MERCHANT_KEY");
basgateChecksum.then(function(result){
	console.log("generateSignature Returns: " + result);
	var verifyChecksum =  BasGateChecksum.verifySignature(body, "YOUR_MERCHANT_KEY",result);
	console.log("verifySignature Returns: " + verifyChecksum);
}).catch(function(error){
	console.log(error);
});