const weather = require('./weather');

const cities = process.argv.slice(2);

/* 1 */
cities.forEach(weather.getTemp);

/* the same code as 1 */
// cities.forEach(city => {
// 	weather.getTemp(city);
// });
