'use strict';

// 'use strict';
/* global google:ignore mapStyles :ignore */

$(function () {
  // var $header = $('header');
  // var $window = $(window);
  var $links = $('nav a');
  var $menu = $('.menu');
  // initMap();

  // $window.scroll(updateHeader).trigger('scroll');
  $links.on('click');
  $menu.on('click', toggleMenu);

  function toggleMenu() {
    $('.dropdown').slideToggle();
  }

  // function updateHeader() {
  //   var bottomOfHeader = $header.offset().top + $header.height();
  //   var h2Height = $window.height();
  //
  //   if (bottomOfHeader >= h2Height) {
  //     $header.addClass('opaque');
  //   } else {
  //     $header.removeClass('opaque');
  //   }
  // }
  //--------------------------------AUTOCOMPLETE--------------------------------//
  var $input = $('.autocomplete');

  if ($input.length) {
    var autocomplete = new google.maps.places.Autocomplete($input[0]);

    var $lat = $('input[name=lat]');
    var $lng = $('input[name=lng]');

    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      var location = place.geometry.location.toJSON();
      $lat.val(location.lat);
      $lng.val(location.lng);
      // console.log($lat.val(), $lng.val());
    });
  }
  //-----------------------------------WEATHER----------------------------------//
  // const weather = $('#weather').data('resort');
  // console.log(weather);
  var $weather = $('#weather');

  if ($weather.length > 0) {
    var lat = $weather.data('lat');
    var lng = $weather.data('lng');
    // console.log(lat, lng);

    $.get('https://api.wunderground.com/api/4dfbb04b4a67e340/geolookup/q/' + lat + ',' + lng + '.json').done(function (response) {
      // console.log(response);
      var country = response.location.country;
      var city = response.location.city;

      $.get('https://api.wunderground.com/api/4dfbb04b4a67e340/forecast/q/' + country + '/' + city + '.json').done(function (response) {
        // console.log(response);
        // const location = `${country}, ${city}`;
        // const snowfall = response.forecast.simpleforecast.forecastday[0].snow_allday.in;
        $weather.append('<p><strong>Snowfall:</strong> ' + response.forecast.simpleforecast.forecastday[0].snow_allday.in + ' Inches</p>');
        // console.log(response.forecast.simpleforecast.forecastday[0].snow_allday.in);

        $.get('https://api.wunderground.com/api/4dfbb04b4a67e340/conditions/q/' + country + '/' + city + '.json').done(function (response) {
          // console.log(response);
          $weather.append('<p><strong>Temperature:</strong> ' + response.current_observation.temp_c + '\xB0C</p>');
          // console.log(response.current_observation.temp_c);
          $weather.append('<p><strong>Temperature:</strong> ' + response.current_observation.temp_f + '\xB0F</p>');
          // console.log(response.current_observation.temp_f);
          $weather.append('<p><strong>Weather:</strong> ' + response.current_observation.weather + '</p>');
          // console.log(response.current_observation.weather);
          $weather.append('<p><strong>Visibility:</strong> ' + response.current_observation.visibility_mi + ' Miles</p>');
          // console.log(response.current_observation.visibility_mi);
          $weather.append('<p><strong>Visibility:</strong> ' + response.current_observation.visibility_km + ' Kilometres</p>');
          // console.log(response.current_observation.visibility_km);
          $weather.append('<p><strong>Wind Condition:</strong> ' + response.current_observation.wind_string + '</p>');
          // console.log(response.current_observation.wind_string);
        });
      });
    });
  }
  //------------------------------------MAP-------------------------------------//
  var $map = $('#map');
  var map = null;
  var infowindow = null;
  if ($map.length) initMap();

  function initMap() {
    var lat = $map.data('lat');
    var lng = $map.data('lng');
    var latLng = { lat: lat, lng: lng };
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
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
      // icon: '../assets/images/dot.svg'
    });

    marker.addListener('click', function () {
      markerClick(marker, location);
    });
  }

  function markerClick(marker) {
    if (infowindow) infowindow.close();

    infowindow = new google.maps.InfoWindow({
      content: '\n      <div class="infowindow">\n        <h3>General Assembly London</h3>\n        <p><strong>Address: </strong>The Relay Building, 1 Commercial St, London E1 7PT</p>\n        <p><strong>Phone: </strong>020 3308 9506</p>\n      </div>\n      '
    });
    infowindow.open(map, marker);
  }
});