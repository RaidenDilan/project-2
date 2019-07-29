// const rp = require('request-promise');
//
// function getWeather(req, res) {
//   let baseUrl = `http://api.openweathermap.org/data/2.5`;
//
//   let lat = req.query.lat;
//   let lng = req.query.lng;
//   let city = req.query.city;
//
//   console.log('1 ---------------->', lng);
//   console.log('2 ---------------->', lat);
//   console.log('3 ---------------->', city);
//
//   rp({
//     method: 'GET',
//     url: `${baseUrl}/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`,
//     json: true
//   })
//   .then((response) => {
//     console.log('response ------>', response);
//     res.status(200).json(response);
//   })
//   .catch((err) => {
//     console.log('err ------>', err);
//     res.status(500).json(err);
//   });
// }
//
// module.exports = {
//   getWeather
// };
