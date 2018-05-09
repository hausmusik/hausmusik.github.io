
//https://mapicons.mapsmarker.com icon raussuchen
//plugin: leaflet-hash, leaflet markercluster
//Variblen erstellen
let myMap = L.map("mapdiv");
const url1 = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json";
const url2 = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json"
const citybike = L.featureGroup().addTo(myMap)
const sehenswuerdigkeiten = L.featureGroup().addTo(myMap)
var clusterBike = L.markerClusterGroup();
myMap.addLayer(clusterBike);
var clusterSehenswuerdigkeiten = L.markerClusterGroup();
myMap.addLayer(clusterSehenswuerdigkeiten);


let myLayers = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: "Datenquelle: <a href='https://www.openstreetmap.org'> openstreetmap.at </a>"
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'> basemap.at </a>"
        }
    ),
    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'> basemap.at </a>"
        }
    ),
    bmaporthofoto30cm: L.tileLayer
        ("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'> basemap.at </a>"
        }
        ),
};




myMap.addLayer(myLayers.osm);
let myMapControl = L.control.layers({
    "Openstreetmap": myLayers.osm,
    "Geolandbasemap": myLayers.geolandbasemap,
    "Bmaporthofoto30cm": myLayers.bmaporthofoto30cm,
}, {
        "Bmapoverlay": myLayers.bmapoverlay,
        //"Citybike Stationen" : citybike, //Hinzufuegen zum Overlay
        //"Sehenwuerdigkeiten" : sehenswuerdigkeiten,
        "Citybike Cluster": clusterBike,
        "Sehenswuerdigkeiten Cluster": clusterSehenswuerdigkeiten,
    }, {
        collapsed: true
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
const myIcon2 = L.icon({
    iconUrl: "/icons/sehenswuerdigkeit.png"
});

//Citybike
async function addGeojson(url1) {
    const response = await fetch(url1);
    const citybikeData = await response.json();
    const geojson = L.geoJSON(citybikeData, {
        style: function (feature) {
            return { color: "#ff0000" };
        },
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: "icons/cycling.png"
                })
            });
        }
    });
    /*geojson.bindPopup(function(layer){
        const props = layer.feature.properties;
        const popupText= `<h1>${props.STATION}</h1>`;
        return popupText;
    });*/
    clusterBike.addLayer(geojson);
    //citybike.addLayer(geojson);
    myMap.fitBounds(clusterBike.getBounds());

    myMap.addControl(new L.Control.Search({
        layer: clusterBike,
        propertyName: "STATION",
    }));

};
addGeojson(url1);
//leaflet - Hash
var hash = new L.Hash(myMap);

//Sehenswuerdigkeiten
async function addGeojson2(url2) {
    const response2 = await fetch(url2);
    const sehenswuerdigkeitenData = await response2.json();
    const geojson2 = L.geoJSON(sehenswuerdigkeitenData, {
        style: function (feature) {
            return { color: "#ff0000" };
        },
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: "icons/sehenswuerdigkeit.png"
                })
            });
        }
    });
    clusterSehenswuerdigkeiten.addLayer(geojson2);
    //sehenswuerdigkeiten.addLayer(geojson2);
    //myMap.fitBounds(sehenswuerdigkeiten.getBounds());
};
addGeojson2(url2);


