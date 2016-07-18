console.log('in main.js');

function initMap() {
  console.log('in initMap');
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: geo.lat, lng: geo.lng},
    zoom: 10
  });
  var infoWindow = new google.maps.InfoWindow({map: map});
  var currentLocationMarker = new google.maps.Circle({
    strokeColor: '#0000FF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#0000FF',
    fillOpacity: 0.35,
    radius: 50,
    clickable: true,
    map:map});
  currentLocationMarker.addListener('click', function(ev) {
    infoWindow.setPosition(ev.latLng);
    //infoWindow.open(map,currentLocationMarker);
  });
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('We found your location.');
      currentLocationMarker.setCenter(pos);
      map.setCenter(pos);
      map.setZoom(18);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
      //handleLocationError(true, currentLocationMarker, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
    //handleLocationError(false, currentLocationMarker, map.getCenter());
  }
}
 function handleLocationError(browserHasGeolocation, currentLocationMarker, pos) {
  currentLocationMarker.setPosition(pos);
  currentLocationMarker.setContent(browserHasGeolocation ?
                        'Error: We could not find your location' :
                        '<p><b>Error:</b> Your browser doesn\'t support geolocation.<br/><br/>Our best guess is that you\'re somewhere<br/>around here, which is not precise enough<br/>to invite you to rooms.<br/><br/>You could try opening Spark Locations<br/>in your operating system\'s native browser.</p>');
}
