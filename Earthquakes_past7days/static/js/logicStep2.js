
//add the tile Layers
//add in the tileLayer before the data so that the map loads in before the large data set
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //assign the maxZoom to 18 bc exists on a scale of 0-18
    maxZoom: 18,
    //add the accessToken with out API_KEY ref
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//create a base layer that holds both maps(street & dark)
let baseMaps = {
  //key is the text that appears on map: value ref the tile layer
  "Streets": streets,
  "Satellite": satelliteStreets
};

//add a map obj with a center and zoom level
let map = L.map("mapid", {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

L.control.layers(baseMaps).addTo(map);

let quakeData = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

//create function for circleMarker styling
  //put a function inside to calc the radius based on the mag of quake
function styleInfo(feature) {
  return{
    opacity: 1,
    fillOpacity: 1,
    fillColor: "orange",
    color: "#000000",
    radius: getRadius(),
    //set stroke to true to keep the boarder on markers
    stroke: true,
    weight: 0.5
  };
}

//create the getRadius function to calc radius based on mag of quake
function getRadius(magnitude) {
  //if mag is 0 return 1 so it shows up as a dot on the map
    //want all info displayed
  if (magnitude === 0) {
    return 1;
  }
  //else mult the mag by 4 for the radius
    //need to scale up so they can be seen
  return magnitude*4;
}

// Grabbing our GeoJSON data.
d3.json(quakeData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
//change the markers to a circleMarker using the pointToLayer function
L.geoJSON(data, {
  pointToLayer: function(feature, latlng) {
    console.log(data);
    return L.circleMarker(latlng);
  },
  style: styleInfo
}).addTo(map);
});