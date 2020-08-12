// var resort = resort || {};

$(() => {
  var $links = $('nav a');
  var $map = $('#map');
  var $weather = $('#weather');
  var $menu = $('.menu');
  var $input = $('.autocomplete');
  var successMessage = $('.flash-messages');
  var closeMessageBtn = $('.close-message');
  let map = null;
  let infowindow = null;

  if ($map.length !== 0) initMap();
  if ($input.length !== 0) resortAutocomplete();
  if ($weather.length !== 0) resortWeather();
  if ($links.length !== 0) $links.on('click');
  if ($menu.length !== 0) $menu.on('click', toggleMenu);
  if (closeMessageBtn.length) closeMessageBtn.on('click', () => successMessage.css({
    opacity: '0',
    transform: 'translateY(-26px)',
    transition: 'transform 250ms linear, opacity 250ms linear'
  }));

  // $('#myModal').on('shown.bs.modal', () => $('#myInput').trigger('focus'));

  function resortWeather() {
    const lat = $weather.data('lat');
    const lng = $weather.data('lng');

    $.get('/weather', { lat, lng })
      .done((response) => {

        // PERHAPS CHANGE THESE CONDITIONALS TO A SWITCH STATEMENT
        if (response.hasOwnProperty(response.weather[0].description) !== null) $weather.append(`<p><strong>Cloudiness:</strong> ${response.weather[0].description}</p>`);
        if (response.hasOwnProperty(response.main.temp) !== null) $weather.append(`<p><strong>Temperature:</strong> ${response.main.temp}°C</p>`);
        if (response.hasOwnProperty(response.main.humidity) !== null) $weather.append(`<p><strong>Humidity:</strong> ${response.main.humidity}%</p>`);
        if (response.hasOwnProperty(response.main.pressure) !== null) $weather.append(`<p><strong>Pressure:</strong> ${response.main.pressure} mb</p>`);
        if (response.hasOwnProperty(response.wind.speed) !== null) $weather.append(`<p><strong>Wind Speed:</strong> ${response.wind.speed} mph</p>`);

        if (response.hasOwnProperty(response.wind.deg) !== null && response.wind.deg !== undefined) $weather.append(`<p><strong>Wind Direction:</strong> ${response.wind.deg}°</p>`);
        else if (response.wind.deg === undefined) $weather.append('<p><strong>Wind Direction:</strong> N/A</p>');

        if (response.hasOwnProperty(response.wind.gust) !== null && response.wind.gust !== undefined) $weather.append(`<p><strong>Wind Gust:</strong> ${response.wind.gust} mph</p>`);
        else if (response.wind.gust === undefined) $weather.append('<p><strong>Wind Gust:</strong> N/A</p>');
      });
  }

  function resortAutocomplete() {
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
    var latLng = { lat: lat, lng: lng };

    const marker = new google.maps.Marker({
      position: latLng,
      map: map
      // icon: '../assets/images/dot.svg'
    });

    marker.addListener('click', () => markerClick(marker, location));
  }

  function markerClick(marker) {
    if (infowindow) infowindow.close();

    infowindow = new google.maps.InfoWindow({
      content:
      `<div class="infowindow">
        <h3>General Assembly London</h3>
        <p><strong>Address: </strong>The Relay Building, 1 Commercial St, London E1 7PT</p>
        <p><strong>Phone: </strong>020 3308 9506</p>
      </div>`
    });

    infowindow.open(map, marker);
  }

  function toggleMenu() {
    $('.dropdown').slideToggle();
  }
});
