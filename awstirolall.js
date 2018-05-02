
let myMap = L.map("mapdiv");
//let myLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"); // s steht für den Subdomain

let myLayers = {
    osm : L.tileLayer (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains : ["a","b","c"], 
            attribution : "Datenquelle: <a href='https://www.openstreetmap.org'> openstreetmap.at </a>"
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




myMap.addLayer(myLayers.osm);
let myMapControl = L.control.layers({ 
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    "Bmapgrau" : myLayers.bmapgrau,
    "Bmaphidpi" : myLayers.bmaphidpi,
    "Bmaporthofoto20cm" : myLayers.bmaporthofoto30cm,
}, {
    "Bmapoverlay" : myLayers.bmapoverlay,
}, {
    collapsed : true
});

myMap.addControl(myMapControl);



myMap.setView([47.267,11.383], 11);

L.control.scale({
    position: "bottomleft",
    maxWidth: 200,
    metric: true,
    imperial: false,
    }
).addTo(myMap);
