// const request = require('request');
// // const rp = require('request-promise');
// // // let baseUrl = `http://api.openweathermap.org/data/2.5`;
// //
// // let lat = req.query.lat;
// // let lng = req.query.lng;
// // let city = req.query.city;
// //
// // console.log('1 ---------------->', lng);
// // console.log('2 ---------------->', lat);
// // console.log('3 ---------------->', city);
// //
// // rp({
// //   method: 'GET',
// //   // url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
// //   // url: `${baseUrl}/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`,
// //   json: true
// // })
// // .then((response) => {
// //   console.log('response ------>', response);
// //   res.status(200).json(response);
// // })
// // .catch((err) => {
// //   console.log('err ------>', err);
// //   res.status(500).json(err);
// // });
// //
// // module.exports = {
// //   getWeather
// // };
//
//
// var geocodeAddress = (address, callback) => {
//   var encodeAddress = encodeURIComponent(address);
//   request ({
//     url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
//     json: true
//   }, (error, response, body) => {
//     console.log(JSON.stringify(error, undefined, 2));
//
//     if(error) callback('Unable to conncet google Servers'); // console.log('Unable to conncet google Servers');
//     else if(body.status === 'ZERO_RESULTS') callback('Unable to find address'); // console.log('Unable to find address');
//     else if(body.status === 'OK') {
//       callback(undefined, {
//         address: body.results[0].formatted_address,
//         latitude: body.results[0].geometry.location.lat,
//         longitude: body.results[0].geometry.location.lng
//       });
//       // console.log(`Address: ${body.results[0].formatted_address}`);
//       // console.log(`Latitude: ${body.results[0].geometry.location.lat},Longitude: ${body.results[0].geometry.location.lng} `);
//     }
//   });
// };
//
// module.exports = {
//   getAddress: geocodeAddress
// };
