
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

// Create the earthquake layer for our map.
  //want to add the quakes layer so people can turn
  //the data depiction on/off
let earthquakes = new L.layerGroup();

//then def an obj that contains the overlays
  //this overlay will be visable at all times
let overlays = {
  Earthquakes: earthquakes
}

//edit the layers control obj by adding the overlays obj
  //makes it so the overlays obj will show up on the tile layers control
L.control.layers(baseMaps, overlays).addTo(map);

// L.control.layers(baseMaps).addTo(map);

let quakeData = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

//create function for circleMarker styling
  //put a function inside to calc the radius based on the mag of quake
function styleInfo(feature) {
  return{
    opacity: 1,
    fillOpacity: 1,
    //replace color code with funct to get color based on mag
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    //ref the function and mag from data to calc the radius
    radius: getRadius(feature.properties.mag),
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

//create the function w/ conditionals to get the 
  //color of marker based on mag of quake
  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
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
  style: styleInfo,
  //create a popup for each circleMarker to display
    //mag and location after the marker has been 
    //created and styles
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    //edit to add to the earthquakes layer rather than the map
}).addTo(earthquakes);

  //then add the earthquakes layer to the map
    //makes it so our earthquakes layer is "on" when the page loads
  earthquakes.addTo(map);
});