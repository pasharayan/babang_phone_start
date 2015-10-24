Template.deliveryMap.helpers({
  confirmMapOptions: function() {
    var geocodeAddress = Session.get('geocodeAddress');

    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options

      return {
        center: new google.maps.LatLng(
                          geocodeAddress.latitude,
                          geocodeAddress.longitude
                ),
        disableDefaultUI: true,
        //draggable: false,
        scrollwheel: false,
        //navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        //zoomControl: false,
        //disableDoubleClickZoom: true,
        zoom: 15
      };
    }
  },

  geocodeAddress: function() {
    return Session.get('geocodeAddress');
  },

  pickupGeocode: function() {
    return Session.get('pickupGeocode');
  },

  deliveryData: function(){
    return Session.get('deliveryData');
  },

  deliveryGeocode: function(){
    return Session.get('geocodeAddress');
  },

  pickupData: function(){
    return Session.get('pickupData');
  },

  estimatedTime: function() {

    //Return when the packpage should be picked up
    //Currently not connected to deliveries, so just
    //returning 15 minutes + now

    //Get current time
    var date = new Date();

    //15 for 15 minutes, 60000 for 60 seconds in miliseconds
    var estimatedTime = new Date(date.getTime() + 15 * 60000);

    //Return a readable String
    return moment(estimatedTime).format('h:mm a');
  },

  estimatedArrivalTime: function(){
    //Return when the packpage should be picked up
    //Currently not connected to deliveries, so just
    //returning 15 minutes + now

    //Get current time
    var date = new Date();

    //15 for 15 minutes, 60000 for 60 seconds in miliseconds
    var estimatedTime = new Date(date.getTime() + 45 * 60000);

    //Return a readable String
    return moment(estimatedTime).format('h:mm a');
  },



});

Template.deliveryMap.rendered = function(){

  // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('confirmMap', function(map) {


      var markersArray = [];

      //Clear out any existing markers
      function clearOverlays() {
        for (var i = 0; i < markersArray.length; i++ ) {
          markersArray[i].setMap(null);
        }
        markersArray.length = 0;
      }

      // Get Icons
      var crossItem = {
        url: "http://s3-ap-southeast-2.amazonaws.com/staticassetspasha/pigeonMarker_cross.png",
        size: new google.maps.Size(45,65), // the orignal size
        scaledSize: new google.maps.Size(45,65) // the new size you want to use
      }

      var homeIcon = {
        url: "http://s3-ap-southeast-2.amazonaws.com/staticassetspasha/pigeonMarker_home.png",
        size: new google.maps.Size(45,65), // the orignal size
        scaledSize: new google.maps.Size(45,65) // the new size you want to use
      }


      //
      function addMarkers(){

        // Add a marker for each drop point
        $('.address').each(function(){


          //Format address for google maps latitude/longitude
          var lat = $(this).data('lat');
          var lng = $(this).data('lng');
          var type = $(this).data('type');

          var geoposition = new google.maps.LatLng(lat, lng);


          markerIcon = crossItem;
          
          //Place onto map
          var marker = new google.maps.Marker({
            position: geoposition,
            map: map.instance,
            icon: markerIcon,
            animation: google.maps.Animation.DROP
          });

          markersArray.push(marker);

        });

      }


      Tracker.autorun(function() {

        clearOverlays();

        //Let new divs load after session variable changes
        setTimeout(function(){
          addMarkers();
        }, 100);

      });

    });

};
