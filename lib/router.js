// Main configuration for all routes
// Subscribe everything and load Google Maps
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  progressSpinner : false,
  waitOn: function() {
    return [

    ];
  },
  onBeforeAction: function() {
    GoogleMaps.load();
    this.next();
  },
});

//The first page the user sees
Router.route('/', {
  name: 'homepage',
});
