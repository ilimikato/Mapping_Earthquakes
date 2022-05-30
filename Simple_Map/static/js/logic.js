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
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

//add a circle marker to the map, then edit to use circleMarker()
  //to have the radius in pixels not meters
  L.circleMarker([34.0522, -118.2437], {
    radius: 100,
    color:'black',
    fillColor: '#ffffa1'
 }).addTo(map);