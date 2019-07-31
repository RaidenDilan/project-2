"use strict";

// var resort = resort || {};
$(function () {
  var $links = $('nav a');
  var $map = $('#map');
  var $weather = $('#weather');
  var $menu = $('.menu');
  var $input = $('.autocomplete');
  var successMessage = $('.flash-messages');
  var closeMessageBtn = $('.close-message');
  var map = null;
  var infowindow = null;
  if ($map.length !== 0) initMap();
  if ($input.length !== 0) resortAutocomplete();
  if ($weather.length !== 0) resortWeather();
  if ($links.length !== 0) $links.on('click');
  if ($menu.length !== 0) $menu.on('click', toggleMenu);
  if (closeMessageBtn.length) closeMessageBtn.on('click', function () {
    return successMessage.css({
      opacity: '0',
      transform: 'translateY(-26px)',
      transition: 'transform 250ms linear, opacity 250ms linear'
    });
  }); // $('#myModal').on('shown.bs.modal', () => $('#myInput').trigger('focus'));

  function resortWeather() {
    var lat = $weather.data('lat');
    var lng = $weather.data('lng');
    $.get('/weather', {
      lat: lat,
      lng: lng
    }).done(function (response) {
      // PERHAPS CHANGE THESE CONDITIONALS TO A SWITCH STATEMENT
      if (response.hasOwnProperty(response.weather[0].description) !== null) $weather.append("<p><strong>Cloudiness:</strong> ".concat(response.weather[0].description, "</p>"));
      if (response.hasOwnProperty(response.main.temp) !== null) $weather.append("<p><strong>Temperature:</strong> ".concat(response.main.temp, "\xB0C</p>"));
      if (response.hasOwnProperty(response.main.humidity) !== null) $weather.append("<p><strong>Humidity:</strong> ".concat(response.main.humidity, "%</p>"));
      if (response.hasOwnProperty(response.main.pressure) !== null) $weather.append("<p><strong>Pressure:</strong> ".concat(response.main.pressure, " mb</p>"));
      if (response.hasOwnProperty(response.wind.speed) !== null) $weather.append("<p><strong>Wind Speed:</strong> ".concat(response.wind.speed, " mph</p>"));
      if (response.hasOwnProperty(response.wind.deg) !== null && response.wind.deg !== undefined) $weather.append("<p><strong>Wind Direction:</strong> ".concat(response.wind.deg, "\xB0</p>"));else if (response.wind.deg === undefined) $weather.append("<p><strong>Wind Direction:</strong> N/A</p>");
      if (response.hasOwnProperty(response.wind.gust) !== null && response.wind.gust !== undefined) $weather.append("<p><strong>Wind Gust:</strong> ".concat(response.wind.gust, " mph</p>"));else if (response.wind.gust === undefined) $weather.append("<p><strong>Wind Gust:</strong> N/A</p>");
    });
  }

  function resortAutocomplete() {
    var autocomplete = new google.maps.places.Autocomplete($input[0]);
    var $lat = $('input[name=lat]');
    var $lng = $('input[name=lng]');
    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      var location = place.geometry.location.toJSON();
      $lat.val(location.lat);
      $lng.val(location.lng);
    });
  }

  function initMap() {
    var lat = $map.data('lat');
    var lng = $map.data('lng');
    var latLng = {
      lat: lat,
      lng: lng
    };
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
    var latLng = {
      lat: lat,
      lng: lng
    };
    var marker = new google.maps.Marker({
      position: latLng,
      map: map // icon: '../assets/images/dot.svg'

    });
    marker.addListener('click', function () {
      return markerClick(marker, location);
    });
  }

  function markerClick(marker) {
    if (infowindow) infowindow.close();
    infowindow = new google.maps.InfoWindow({
      content: "<div class=\"infowindow\">\n        <h3>General Assembly London</h3>\n        <p><strong>Address: </strong>The Relay Building, 1 Commercial St, London E1 7PT</p>\n        <p><strong>Phone: </strong>020 3308 9506</p>\n      </div>"
    });
    infowindow.open(map, marker);
  }

  function toggleMenu() {
    $('.dropdown').slideToggle();
  }
});