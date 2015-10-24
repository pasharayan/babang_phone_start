Template['checkoutFlow/deliveryDetails'].events({
  'submit .delivery-form': function(e) {
    e.preventDefault();
    Router.go('RouteNav.next');
  }
});
