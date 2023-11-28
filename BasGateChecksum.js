"use strict";

var crypto = require('crypto');

class BasGateChecksum {

	static encrypt(input, key) {
		var cipher = crypto.createCipheriv('AES-128-CBC', key, BasGateChecksum.iv);
		var encrypted = cipher.update(input, 'binary', 'base64');
		encrypted += cipher.final('base64');
		return encrypted;
	}
	static decrypt(encrypted, key) {
		var decipher = crypto.createDecipheriv('AES-128-CBC', key, BasGateChecksum.iv);
		var decrypted = decipher.update(encrypted, 'base64', 'binary');
		try {
			decrypted += decipher.final('binary');
		}
		catch (e) {
			console.log(e);
		}
		return decrypted;
	}
	static generateSignature(params, key) {
		if (typeof params !== "object" && typeof params !== "string") {
			var error = "string or object expected, " + (typeof params) + " given.";
			return Promise.reject(error);
		}
		if (typeof params !== "string"){
			params = BasGateChecksum.getStringByParams(params);
		}
		return BasGateChecksum.generateSignatureByString(params, key);
	}
	

	static verifySignature(params, key, checksum) {
		if (typeof params !== "object" && typeof params !== "string") {
		   	var error = "string or object expected, " + (typeof params) + " given.";
			return Promise.reject(error);
		}
		if(params.hasOwnProperty("CHECKSUMHASH")){
			delete params.CHECKSUMHASH
		}
		if (typeof params !== "string"){
			params = BasGateChecksum.getStringByParams(params);
		}
		return BasGateChecksum.verifySignatureByString(params, key, checksum);
	}

	static async generateSignatureByString(params, key) {
		var salt = await BasGateChecksum.generateRandomString(4);
		return BasGateChecksum.calculateChecksum(params, key, salt);
	}

	static verifySignatureByString(params, key, checksum) {		
		var basgate_hash = BasGateChecksum.decrypt(checksum, key);
		var salt = basgate_hash.substr(basgate_hash.length - 4);
		return (basgate_hash === BasGateChecksum.calculateHash(params, salt));
	}

	static generateRandomString(length) {
		return new Promise(function (resolve, reject) {
			crypto.randomBytes((length * 3.0) / 4.0, function (err, buf) {
				if (!err) {
					var salt = buf.toString("base64");
					resolve(salt);					
				}
				else {
					console.log("error occurred in generateRandomString: " + err);
					reject(err);
				}
			});
		});
	}

	static getStringByParams(params) {
		var data = {};
		Object.keys(params).sort().forEach(function(key,value) {
			data[key] = (params[key] !== null && params[key].toLowerCase() !== null) ? params[key] : "";
		});
		return Object.values(data).join('|');
	}

	static calculateHash(params, salt) {		
		var finalString = params + "|" + salt;
		return crypto.createHash('sha256').update(finalString).digest('hex') + salt;
	}
	static calculateChecksum(params, key, salt) {		
		var hashString = BasGateChecksum.calculateHash(params, salt);
		return BasGateChecksum.encrypt(hashString,key);
	}
}
BasGateChecksum.iv = '@@@@&&&&####$$$$';
module.exports = BasGateChecksum;
