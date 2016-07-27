$('#tdTulsaUp-to-date').ready(function() {

  setTimeout(function() {
    $('[data-toggle="tooltip"]').tooltip();
  }, 2000)

  // Event listenisers for resize event
  window.addEventListener("resize", function() {
      // Fixed relay from mobile to web view
      $('[data-toggle="tooltip"]').tooltip();
  });

});
