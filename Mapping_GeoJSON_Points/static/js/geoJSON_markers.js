// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// //use L.geoJSON to add the GeoJSON layer to the map
// L.geoJSON(sanFranAirport).addTo(map);

// //change above to use pointToLayer function to bind a popup 
// //grabbing the GeoJSON data
// L.geoJSON(sanFranAirport, {
//   //return each feature into a marker on the map
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     //return the marker with latlng to make the marker
//       //then chain .bindPopup to it to add the popup,
//         //use dot notation to access the city name for the popup
//     return L.marker(latlng).bindPopup("<h2>" + feature.properties.name + "<br></br>" + feature.properties.city + ", " + feature.properties.country + "</h2>");
//   }
// }).addTo(map);

//add the popup marker using the onEachFeature callback function
L.geoJSON(sanFranAirport, {
  onEachFeature: function( feature, layer) {
    console.log(layer);
    layer.bindPopup("<h2>" + feature.properties.name + "<br></br>" + feature.properties.city + ", " + feature.properties.country + "</h2>");
  }
}).addTo(map);

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