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
}

// A function to load the JSON data based on the user's selection
function loadJSONData() {
  // Get the values from the dropdown menus
  var company = document.getElementById("company").value;
  var vehicle = document.getElementById("vehicle").value;
  var year = document.getElementById("year").value;
  var month = document.getElementById("month").value;
  var day = document.getElementById("day").value;

  // Construct the URL for the JSON file based on the values
  var jsonURL =
    "/rawdata/" +
    company +
    "/" +
    vehicle +
    "/" +
    year +
    "/" +
    month +
    "/" +
    day +
    "/json.json";
  // console.log(jsonURL);

  // Create a new XMLHttpRequest object and send a GET request to the URL
  var xhr = new XMLHttpRequest();
  xhr.open("GET", jsonURL);
  xhr.responseType = "json";
  // console.log(xhr.response);
  xhr.onload = function () {
    // Get the response data as a JSON object
    var data = this.response;
    console.log(data);
    // console.log(data[0].lat);
    // Check if the data is valid
    if (data && data.lat && data.lng && data.name) {
      // Create a new marker object with the data
      var marker = new google.maps.Marker({
        position: { lat: data.lat, lng: data.lng },
        map: map,
        title: data.name,
      });
      console.log(marker);

      // Clear the previous markers from the map and the array
      clearMarkers();

      // Add the new marker to the map and the array
      markers.push(marker);

      // Set the map center and zoom level to the marker position
      map.setCenter(marker.getPosition());
      map.setZoom(8);
    }
  };
  xhr.send();
}

// A function to clear all markers from the map and the array
function clearMarkers() {
  // Loop through the array of markers
  for (var i = 0; i < markers.length; i++) {
    // Set the marker visibility to false
    markers[i].setVisible(false);
  }
  // Empty the array of markers
  markers = [];
}

// Add a listener to the company dropdown menu to handle the change event
document.getElementById("company").addEventListener("change", function () {
  // Get the selected value from the company dropdown menu
  var company = this.value;

  // Update the vehicle dropdown menu options based on the company value
  updateVehicleOptions(company);
});

// A function to update the vehicle dropdown menu options based on the company value
function updateVehicleOptions(company) {
  // Get the vehicle dropdown menu element
  var vehicle = document.getElementById("vehicle");

  // Define an object that maps each company value to an array of vehicle values
  var vehicleOptions = {
    a: [1, 2, 3],
    b: [4, 5, 6],
    c: [7, 8, 9],
  };

  // Clear the previous options from the vehicle dropdown menu
  vehicle.innerHTML = "";

  // Loop through the array of vehicle values for the given company value
  for (var i = 0; i < vehicleOptions[company].length; i++) {
    // Create a new option element with the vehicle value and text
    var option = document.createElement("option");
    option.value = vehicleOptions[company][i];
    option.text = vehicleOptions[company][i];

    // Append the option element to the vehicle dropdown menu
    vehicle.appendChild(option);
  }
}

// Add a listener to the month dropdown menu to handle the change event
document.getElementById("month").addEventListener("change", function () {
  // Get the selected value from the month dropdown menu
  var month = this.value;

  // // Get the day dropdown menu element
  var day = document.getElementById("day");

  // // Get the template element from the HTML file
  var templateElement = document.getElementById("day");

  // // Get the template string from the template element
  var templateString = templateElement.innerHTML;

  // // Compile the template string into a function
  // var templateFunction = _.template(templateString);

  // Loop through the days of the month and generate the HTML options
  day.innerHTML = "";
  // for (var i = 1; i <= 10; i++) {
  for (var i = 1; i <= getDaysInMonth(month); i++) {
    // Pass the value of i to the template function and get the HTML option

    var option = document.createElement("option");
    option.value = i;
    option.text = i;

    // Append the option element to the vehicle dropdown menu
    // vehicle.appendChild(option);
  // }
    // var htmlOption = templateFunction({ i: i });

    // Append the HTML option to the HTML options
    day.appendChild(option)
    // htmlOptions += htmlOption;
  }

  // Replace the inner HTML of the day dropdown menu with the HTML options
  // day.innerHTML = htmlOptions;
  // day.innerHTML = "1";
});

// A function to get the number of days in a given month
function getDaysInMonth(month) {
  // Create a date object with the given month and year
  var date = new Date(document.getElementById("year").value, month, 0);

  // Return the number of days in that month
  return date.getDate();
}

// Add a listener to the submit button to handle the click event
document.getElementById("submit").addEventListener("click", function () {
  // Call the loadJSONData function to load the JSON data based on the user's selection
  loadJSONData();
});
