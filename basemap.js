//Definition der Varibalen
let myMap = L.map("mapdiv"); // http://leafletjs.com/reference-1.3.0.html#map-l-map
//let myLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"); // s steht für den Subdomain

let myLayers = { //http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
    osm : L.tileLayer (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains : ["a","b","c"], //http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution : "Datenquelle: <a href='https://www.openstreetmap.org'> openstreetmap.at </a>" //http://leafletjs.com/reference-1.3.0.html#layer-attribution
        }
    ),
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'> basemap.at </a>"
        }
    ),
    bmapoverlay :  L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'> basemap.at </a>"
        }
    ),
    bmapgrau : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'> basemap.at </a>"
        }
    ),
    bmaphidpi : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href='https://www.basemap.at'> basemap.at </a>"
        }
    ),
    bmaporthofoto30cm : L.tileLayer 
    ("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'> basemap.at </a>"
        }
    ),
};




myMap.addLayer(myLayers.osm); //Hinzufügen des Layers zur Karte, dabei können verschiedene Layer nach dem .irgendwas ausgewählt werden //http://leafletjs.com/reference-1.3.0.html#layer-onadd
let myMapControl = L.control.layers({ // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    "Bmapgrau" : myLayers.bmapgrau,
    "Bmaphidpi" : myLayers.bmaphidpi,
    "Bmaporthofoto20cm" : myLayers.bmaporthofoto30cm,
}, {
    "Bmapoverlay" : myLayers.bmapoverlay,
}, {
    collapsed : false
});

myMap.addControl(myMapControl); // http://leafletjs.com/reference-1.3.0.html#map-addcontrol



myMap.setView([47.267,11.383], 11); //Koordinaten setzen // http://leafletjs.com/reference-1.3.0.html#map-setview

L.control.scale({ //http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
    position: "bottomleft",
    maxWidth: 200, // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    metric: true, // http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false, // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    }
).addTo(myMap);
