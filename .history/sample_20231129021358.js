/* More Details: https://developer.paytm.com/docs/checksum/#node */

var BasGateChecksum = require("./BasGateChecksum");

var paytmParams = {};

/* Generate Checksum via Array */

/* initialize an array */
paytmParams["MID"] = "YOUR_MID_HERE";
paytmParams["ORDERID"] = "YOUR_ORDER_ID_HERE";

/**
* Generate checksum by parameters we have
* Find your Merchant Key in your BasGate Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
var paytmChecksum = BasGateChecksum.generateSignature(paytmParams, "YOUR_MERCHANT_KEY");
paytmChecksum.then(function(result){
	console.log("generateSignature Returns: " + result);
	var verifyChecksum =  BasGateChecksum.verifySignature(paytmParams, "YOUR_MERCHANT_KEY",result);
	console.log("verifySignature Returns: " + verifyChecksum);
}).catch(function(error){
	console.log(error);
});

/* Generate Checksum via String */

/* initialize JSON String */ 
body = "{\"mid\":\"YOUR_MID_HERE\",\"orderId\":\"YOUR_ORDER_ID_HERE\"}"

/**
* Generate checksum by parameters we have
* Find your Merchant Key in your BasGate Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
var paytmChecksum = BasGateChecksum.generateSignature(body, "YOUR_MERCHANT_KEY");
paytmChecksum.then(function(result){
	console.log("generateSignature Returns: " + result);
	var verifyChecksum =  BasGateChecksum.verifySignature(body, "YOUR_MERCHANT_KEY",result);
	console.log("verifySignature Returns: " + verifyChecksum);
}).catch(function(error){
	console.log(error);
});