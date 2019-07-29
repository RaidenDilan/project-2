const rp              = require('request-promise');
const { openWeather } = require('../config/environment.js');

function getWeather(req, res) {
  let baseUrl = `http://api.openweathermap.org/data/2.5`;
  let lat = req.query.lat;
  let lng = req.query.lng;

  rp({
    method: 'GET',
    url: `${baseUrl}/weather?lat=${lat}&lon=${lng}&units=metric&appid=${openWeather}`,
    json: true
  })
  .then((response) => res.status(200).json(response))
  .catch((err) => res.status(500).json(err));
}

module.exports = {
  getWeather
};
