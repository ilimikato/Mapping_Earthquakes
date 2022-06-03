// Create the map object with center and zoom level.
// let map = L.map('mapid').setView([40.7, -90.5], 4);

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
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//create a base layer that holds both maps(street & dark)
let baseMaps = {
    //key is the text that appears on map: value ref the tile layer
    Street: streets,
    Dark: dark
};

//use the alt method to declare a map obj
let map = L.map("mapid", {
    center: [40.7, -94.5],
    zoom: 4,
    //add the base layer in 
    layers: [streets]
});

//pass our map layers into our layers control and add the layers control to the map
    //use the baseMaps var we def earlier that holds all the maps layers
    //allows the 2 diff map stules to be shown on the index.html file
    //appears as a button with like 3 stacked things
L.control.layers(baseMaps).addTo(map);

//accessing the GeoJSON URL
let airportData = "https://raw.githubusercontent.com/shumph10/Mapping_Earthquakes/main/majorAirports.json"

//use d3 to grab the data
    //use .then to return a promise so that d3 will 
    //wait for the data to load in b4 continuing
    //use anon function with the parameter data
        //to reference the airportData
d3.json(airportData).then(function(data) {
    console.log(data);
    //creating the GeoJSON layer with the retrieved data
    let datapoints = L.geoJSON(data).addTo(map);
});