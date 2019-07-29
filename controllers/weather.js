const rp = require('request-promise');

function getWeather(req, res) {
  const baseUrl = `http://api.openweathermap.org/data/2.5`;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  let lat = req.query.lat;
  let lng = req.query.lng;

  rp({
    method: 'GET',
    url: `${baseUrl}/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`,
    json: true
  })
  .then((response) => res.status(200).json(response))
  .catch((err) => res.status(500).json(err));
}

module.exports = {
  getWeather
};
