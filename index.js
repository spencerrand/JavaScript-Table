// Get references to the tbody element
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $clearBtn = document.querySelector("#clear");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

$clearBtn.addEventListener("click", handleClearButtonClick);

var sightings = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  // sightings.length
  for (var i = 0; i < 50; i++) {
    // Get get the current object and its fields
    var sighting = sightings[i];
    var fields = Object.keys(sighting);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace
  var filterDateValue = $dateInput.value;
  var filterStateValue = $stateInput.value.trim().toLowerCase();
  var filterCityValue = $cityInput.value.trim().toLowerCase();
  var filterCountryValue = $countryInput.value.trim().toLowerCase();
  var filterShapeValue = $shapeInput.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
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

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return (sightingDate === filterDate && sightingState === filterState && sightingCity === filterCity && sightingCountry === filterCountry && sightingShape === filterShape);
  });
  renderTable();
}

function handleClearButtonClick() {
  sightings = dataSet;
  $dateInput.value = "";
  $cityInput.value = "";
  $stateInput.value = "";
  $countryInput.value = "";
  renderTable();
}

// Render the table for the first time on page load
renderTable();

