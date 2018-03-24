const https = require('https');
const http = require('http');
const api = require('./api');

function printError(err) {
	console.error(err);
}

function printMessage(data) {
	const city = data.current_observation.display_location.city;
	const temp = data.current_observation.temperature_string;
	const message = `Current temperature in ${city} is ${temp}.`;
	console.log(message);
}

function getTemp(city) {
	try {
		https.get(`https://api.wunderground.com/api/${api.key}/conditions/q/${city}.json`, (res) => {
			if (res.statusCode === 200) {
				let body = '';

				res.on('data', (chunk) => {
					body += chunk;
				});
				res.on('end', () => {
					const data = JSON.parse(body);

					if (data.current_observation) {
						printMessage(data);
					} else {
						const locationError = 'The city is not found.';
						const err = new Error(locationError);
						printError(err);
					}
				});
			} else {
				const errMessage = `There was an error getting the temperature. The status code is: ${res.statusCode} - ${http.STATUS_CODES[res.statusCode]}`;
				printError(errMessage);
			}
		}).on('error', (err) => {
			const urlErr = 'The URl is wrong? ' + err;
			printError(urlErr)

		});
	} catch (err) {
		const domainErr = 'The domain name is wrong. ' + err;
		printError(domainErr)
	}
}

module.exports.getTemp = getTemp;