// Declare a global variable to store the map object
var map;

// Declare a global variable to store an array of markers
var markers = [];

// A function to initialize the map
function initMap() {
  // Create a new map object
  map = new google.maps.Map(document.getElementById("map"), {
    // Set the center and zoom level of the map
    center: { lat: 40, lng: -100 },
    zoom: 4,
  });

  // Call the loadJSONData function to load the JSON files
  loadJSONData();
}

// A function to load the JSON files
function loadJSONData() {
  // Define an array of URLs for the JSON files
  var jsonURLs = [
    "json1.json",
    "json2.json",
    "json3.json",
    "json4.json",
    "json5.json",
    "json6.json",
    "json7.json",
    "json8.json",
    "json9.json",
    "json10.json",
  ];

  // Loop through the array of URLs
  for (var i = 0; i < jsonURLs.length; i++) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Open a GET request to the URL
    xhr.open("GET", jsonURLs[i]);

    // Set the response type to JSON
    xhr.responseType = "json";

    // Define a callback function to handle the response
    xhr.onload = function () {
      // Get the response data as a JSON object
      var data = this.response;

      // Check if the data is valid
      if (data && data.lat && data.lng) {
        // Create a new marker object with the data
        var marker = new google.maps.Marker({
          position: { lat: data.lat, lng: data.lng },
          map: map,
          title: data.name,
        });

        // Add the marker to the array of markers
        markers.push(marker);
      }
    };

    // Send the request
    xhr.send();
  }
}
