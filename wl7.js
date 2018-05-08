
//https://mapicons.mapsmarker.com icon raussuchen
let myMap = L.map("mapdiv");
const wienGroup = L.featureGroup().addTo(myMap)
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
    "Stationen" : wienGroup, //Hinzufuegen zum Overlay
}, {
    collapsed : true
});

myMap.addControl(myMapControl);

L.control.scale({
    position: "bottomleft",
    maxWidth: 200,
    metric: true,
    imperial: false,
    }
).addTo(myMap);

const myIcon = L.icon({
    iconUrl: "/icons/robbery.png"
});

async function addGeojson(url) {
    const response = await fetch(url);
    const wienData = await response.json();
    const geojson = L.geoJSON(wienData, {
        style: function(feature){
            return{color: "#ff0000"};
        }, 
        pointToLayer: function(geoJsonPoint, latlng) {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: "icons/robbery.png"
                })
            });
        }
    });
    wienGroup.addLayer(geojson);
    myMap.fitBounds(wienGroup.getBounds());
}


const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:SPAZIERPUNKTOGD,ogdwien:SPAZIERLINIEOGD"

addGeojson(url);

