
//add the tile Layers
//add in the tileLayer before the data so that the map loads in before the large data set
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //assign the maxZoom to 18 bc exists on a scale of 0-18
    maxZoom: 18,
    //add the accessToken with out API_KEY ref
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//create a base layer that holds both maps(street & dark)
let baseMaps = {
  //key is the text that appears on map: value ref the tile layer
  Light: light,
  Dark: dark
};

//add a map obj with a center and zoom level
let map = L.map("mapid", {
  center: [44.0, -80.0],
  zoom: 3,
  layers: [light]
});

L.control.layers(baseMaps).addTo(map);

let torontoData = 'https://raw.githubusercontent.com/shumph10/Mapping_Earthquakes/main/Mapping_GeoJSON_Linestrings/torontoRoutes.json'

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data).addTo(map);
});