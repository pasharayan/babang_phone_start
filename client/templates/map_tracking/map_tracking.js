Template.mapTracking.helpers({

  address: function(){
    return Session.get('address');
  },

  //Limit tracking to the page
  trackMap: function(){
    Meteor.setInterval(function() {
      //Get the latitude & longitude from the phone
      Session.set('lat', Geolocation.currentLocation().coords.latitude);
      Session.set('lon', Geolocation.currentLocation().coords.longitude);


      /**
      * Get the address assigned to a lat/lng set of co-ordinates
      *
      * Data in:
      *
      * To do:
      *   - clean up the http call used
      *   - make code more dynamic and secure
      *
      */

      //Messy Google Maps API Call
      var apiURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
      //console.log(apiURL+Session.get('lat')+','+Session.get('lon')+'&key=AIzaSyDQQMkEGcfkf2RwcUoSeOim_Po8EPUKJ6o');

      var geocoder = Meteor.http.call("GET", apiURL+Session.get('lat')+','+Session.get('lon')+'&key=AIzaSyDQQMkEGcfkf2RwcUoSeOim_Po8EPUKJ6o', {}, function(err, result){
        var outcomes = JSON.parse(result.content);
        console.log(outcomes.results[0].formatted_address)
        Session.set('address', outcomes.results[0].formatted_address);
      });

    }, 5000);
  },

  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        //Set the user's position to center of map
        center: new google.maps.LatLng(Session.get('lat'), Session.get('lon')),
        disableDefaultUI: true,
        zoom: 15
      };
    }
  },

  currentLocation: function(){
    return Geolocation.currentLocation();
  },

  loc: function () {
    // Default to 0, 0 if the location isn't ready
    return Geolocation.latLng() || { lat: 0, lng: 0 };
  },

  lat: function() {
    return Session.get('lat');
  },

  lon: function() {
    return Session.get('lon');
  }
});


Template.mapTracking.rendered = function(){

  //Reload map everytime the phone polls new geolocaiton
  Tracker.autorun(function() {

    //Get saved geolocation from phone data
    lat = Session.get('lat');
    lon = Session.get('lon');

    GoogleMaps.ready('exampleMap', function(map) {
      // Add a marker to the map once it is loaded
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });

    });
  });

};
