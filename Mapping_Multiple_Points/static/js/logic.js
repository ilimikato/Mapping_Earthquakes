// Add console.log to check to see if our code is working.
console.log("working");

//add a map obj with a center and zoom level
let map = L.map("mapid", {
    center: [
      40.7, -94.5
    ],
    zoom: 4
  });

// We create the tile layer that will be the background of our map.
  //Leaflet doc provided code - leaflet doesnt offer tile layer but does offer
  //various tile layer APIs
  //had urls for (1st) the API w. a ref to the accessToken
    //and (2nd) the openstreetmap URL inside the {} 
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //assign the maxZoom to 18 bc exists on a scale of 0-18
    maxZoom: 18,
    //add this id bc it will show the streets on the map
    id: 'mapbox/streets-v11',
    //
    tileSize: 512,
    zoomOffset: -1,
    //add the accessToken with out API_KEY ref
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//add a marker to the map for Los Angeles, CA
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// //use a circle marker instead to mark LA
//   //adjust the radius so its not a little dot
// L.circleMarker([34.0522, -118.2437], {
//   radius: 300,
//   color: 'black',
//   fillColor: '#ffffa1'
// }).addTo(map);

// An array containing each city's location, state, and population.
    //moved to a sep file bc neater and more efficient usually
    //so need to get the data from the file first rather than just
    //directly ref the data array
        //have to update the HTML file to be able to find it 
          //since its in another folder

let cityData = cities

//loop through the cities array and create one marker for each city
  //to make the marker for each city add the l.marker() func inside
  //the forEach loop
    //update to ref the new cityData variable rather than the 
      //directly ref the array
cityData.forEach(function(city) {
  console.log(city)
  //update to add the .bindPopup() method before the .addTo()
    //need to use HTMl in the method for it to properly insert and display
      //add the toLocaleString() method to the population to
      //to format with a thousand seperator
    //then add in the radius as the population and change marker
    //to a circle and divide the pop by 10k so the markers are scalled correctly
      //if you dont one marker will cover the whole world map
  L.circleMarker(city.location, {
    radius: city.population/100000
  })
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  .addTo(map);
  
});