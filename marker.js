//Definition der Varibalen
let myMap = L.map("mapdiv"); // http://leafletjs.com/reference-1.3.0.html#map-l-map
//let myLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"); // s steht für den Subdomain
let markerGroup = L.featureGroup();

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
myMap.addLayer(markerGroup);

let myMapControl = L.control.layers({ // http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    "Bmapgrau" : myLayers.bmapgrau,
    "Bmaphidpi" : myLayers.bmaphidpi,
    "Bmaporthofoto20cm" : myLayers.bmaporthofoto30cm,
}, {
    "Bmapoverlay" : myLayers.bmapoverlay,
    "Marker": markerGroup,
}, {
    collapsed : true // http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
});

myMap.addControl(myMapControl); // http://leafletjs.com/reference-1.3.0.html#map-addcontrol



//myMap.setView([47.267,11.383], 11); //Koordinaten setzen // http://leafletjs.com/reference-1.3.0.html#map-setview

L.control.scale({ //http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
    position: "bottomleft", // http://leafletjs.com/reference-1.3.0.html#control-position
    maxWidth: 200, // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    metric: true, // http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false, // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    }
).addTo(myMap);

//Session 6
const uni = [47.264, 11.385]; //feste Koordinate
const usi = [47.257, 11.356];
const technik = [47.263, 11.343];
const patscher =[47.208, 11.461];
const iglis =[47.230, 11.411];
const markerOptions = {
    title: "Universität Innsbruck", // feste Optionen für alle
    opacity: 1,
    draggable: false,
};
const markerOptions2 = {
    title: "Nicht Uni", // feste Optionen für alle
    opacity: 1,
    draggable: false,
};

L.marker(uni, markerOptions).addTo(markerGroup); //Marker Koordinate und Marker zur Map adden
L.marker(usi, markerOptions).addTo(markerGroup);
L.marker(technik, markerOptions).addTo(markerGroup);
L.marker(patscher, markerOptions2).addTo(markerGroup).bindPopup("<p>Patscherkofel</p><img style = 'width:200px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/12-06-05-innsbruck-by-ralfr-014.jpg/1920px-12-06-05-innsbruck-by-ralfr-014.jpg' alt='Patscherkofel' />"); // so geht es in kurz
L.marker(iglis, markerOptions2).addTo(markerGroup);


//let patscherKofelMarker = L.marker (patscher).addTo(markerGroup);
//patscherKofelMarker.bindPopup("<p>Patscherkofel</p><img style = 'width:200px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/12-06-05-innsbruck-by-ralfr-014.jpg/1920px-12-06-05-innsbruck-by-ralfr-014.jpg' />"); //so geht es in lange

myMap.fitBounds(markerGroup.getBounds());

let line = L.polyline (
    [patscher, iglis], {
        color: 'red',
        weigth: 5,
    });
myMap.addLayer(line);

let uniPolygon = L.polygon([uni, usi, technik]);
myMap.addLayer (uniPolygon)

uniPolygon.bindPopup("Ende")