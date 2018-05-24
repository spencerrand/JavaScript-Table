// Get references to the body, inputs and buttons
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countrySelect = document.querySelector("#country");
var $shapeSelect = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $clearBtn = document.querySelector("#clear");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Add an event listener to the clearButton, call handleClearButtonClick when clicked
$clearBtn.addEventListener("click", handleClearButtonClick);

// Assign a variable to the full dataset
var sightings = dataSet;

// renderTable loops through the dataset and adds each row to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  // sightings.length
  for (var i = 0; i < sightings.length; i++) {
    // Get get the current object and its fields
    var sighting = sightings[i];
    var fields = Object.keys(sighting);
    // Create a new row in the tbody
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell
      var field = fields[j];
      var $cell = $row.insertCell(j);
      // Set the cell's text to be each sighting's field
      $cell.innerText = sighting[field];
    }
  }
}

function handleSearchButtonClick() {
  // Assign variables to each input value
  var filterDateValue = $dateInput.value;
  var filterStateValue = $stateInput.value.trim().toLowerCase();
  var filterCountryValue = $countrySelect.value;
  var filterCityValue = $cityInput.value.trim().toLowerCase();
  var filterShapeValue = $shapeSelect.value.trim().toLowerCase();

  // Filter the dataset
  sightings = dataSet.filter(function(sighting) {
    var sightingDate = sighting.datetime;
    var sightingState = sighting.state.toLowerCase();
    var sightingCity = sighting.city.toLowerCase();
    var sightingCountry = sighting.country.toLowerCase();
    var sightingShape = sighting.shape.toLowerCase();

    // If the input value is blank or empty, then make the filter match the element to avoid exlcuding it
    if (filterDateValue == '') {
      filterDate = sighting.datetime;
    }
    else{
      filterDate = filterDateValue;
    }

    if (filterCityValue == '') {
      filterCity = sighting.city;
    }
    else{
      filterCity = filterCityValue;
    }

    if (filterStateValue == '') {
      filterState = sighting.state;
    }
    else{
      filterState = filterStateValue;
    }

    if (filterCountryValue == '') {
      filterCountry = sighting.country;
    }
    else{
      filterCountry = filterCountryValue;
    }

    if (filterShapeValue == '') {
      filterShape = sighting.shape;
    }
    else{
      filterShape = filterShapeValue;
    }

    // Return that row if it's a match
    return (sightingDate === filterDate && sightingState === filterState && sightingCity === filterCity && sightingCountry === filterCountry && sightingShape === filterShape);
  });
  renderTable();
}

// Reset all input values to blank
function handleClearButtonClick() {
  sightings = dataSet;
  $dateInput.value = "";
  $cityInput.value = "";
  $stateInput.value = "";
  $countrySelect.value = "(Country)";
  $shapeSelect.value = "(Shape)";
  renderTable();
}

// Render the table for the first time on page load
renderTable();

// Code to get unique values in dataset
// var myList = dataSet;
// var countries = [];
// var shapes = [];
// for (var i = 0; i < myList.length; i++) {  
//   countries.push(myList[i].country);
//   shapes.push(myList[i].shape);
// }

// Array.prototype.unique = function() {
//   return this.filter(function (value, index, self) { 
//     return self.indexOf(value) === index;
//   });
// }