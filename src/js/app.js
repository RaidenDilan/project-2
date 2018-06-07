$(() => {
  var $links = $('nav a');
  var $menu = $('.menu');

  $links.on('click');
  $menu.on('click', toggleMenu);

  function toggleMenu() {
    $('.dropdown').slideToggle();
  }
//--------------------------------AUTOCOMPLETE--------------------------------//
  const $input = $('.autocomplete');

  if($input.length) {
    const autocomplete = new google.maps.places.Autocomplete($input[0]);

    const $lat = $('input[name=lat]');
    const $lng = $('input[name=lng]');

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const location = place.geometry.location.toJSON();
      $lat.val(location.lat);
      $lng.val(location.lng);
    });
  }
//-----------------------------------WEATHER----------------------------------//
// const weather = $('#weather').data('resort');
// console.log(weather);
  const $weather = $('#weather');

  if($weather.length > 0) {
    const lat = $weather.data('lat');
    const lng = $weather.data('lng');
    // console.log(lat, lng);

    $.get(`https://api.wunderground.com/api/4dfbb04b4a67e340/geolookup/q/${lat},${lng}.json`)
    .done((response) => {
      const country = response.location.country;
      const city = response.location.city;

      $.get(`https://api.wunderground.com/api/4dfbb04b4a67e340/forecast/q/${country}/${city}.json`)
      .done((response) => {
        $weather.append(`<p><strong>Snowfall:</strong> ${response.forecast.simpleforecast.forecastday[0].snow_allday.in} Inches</p>`);

        $.get(`https://api.wunderground.com/api/4dfbb04b4a67e340/conditions/q/${country}/${city}.json`)
        .done((response) => {
          $weather.append(`<p><strong>Temperature:</strong> ${response.current_observation.temp_c}°C</p>`);
          $weather.append(`<p><strong>Temperature:</strong> ${response.current_observation.temp_f}°F</p>`);
          $weather.append(`<p><strong>Weather:</strong> ${response.current_observation.weather}</p>`);
          $weather.append(`<p><strong>Visibility:</strong> ${response.current_observation.visibility_mi} Miles</p>`);
          $weather.append(`<p><strong>Visibility:</strong> ${response.current_observation.visibility_km} Kilometres</p>`);
          $weather.append(`<p><strong>Wind Condition:</strong> ${response.current_observation.wind_string}</p>`);
        });
      });
    });
  }
//------------------------------------MAP-------------------------------------//
  const $map = $('#map');
  let map = null;
  let infowindow = null;
  if ($map.length) initMap();

  function initMap() {
    var lat = $map.data('lat');
    var lng = $map.data('lng');
    const latLng = { lat: lat, lng: lng };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: latLng,
      scrollwheel: false,
      styles: mapStyles
    });
    addMarker(location);
  }

  function addMarker(location) {
    var lat = $map.data('lat');
    var lng = $map.data('lng');
    const latLng = { lat: lat, lng: lng };
    const marker = new google.maps.Marker({
      position: latLng,
      map: map
      // icon: '../assets/images/dot.svg'
    });

    marker.addListener('click', () => {
      markerClick(marker, location);
    });
  }

  function markerClick(marker) {
    if(infowindow) infowindow.close();

    infowindow = new google.maps.InfoWindow({
      content: `
      <div class="infowindow">
        <h3>General Assembly London</h3>
        <p><strong>Address: </strong>The Relay Building, 1 Commercial St, London E1 7PT</p>
        <p><strong>Phone: </strong>020 3308 9506</p>
      </div>
      `
    });
    infowindow.open(map, marker);
  }
});
