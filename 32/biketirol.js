let myMap = L.map("map");
let bikeGroup = L.featureGroup().addTo(myMap);
let bikeLine = L.featureGroup().addTo(myMap);
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
    Summer : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
		attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
	}
), 
	Winter : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
		attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
	}
), 
	Ortho : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
		attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
	}
), 
};




myMap.addLayer(myLayers.geolandbasemap);
let myMapControl = L.control.layers({ 
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    "Sommerkarte": myLayers.Summer,
    "Winterkarte": myLayers.Winter,
    "Orthokarte": myLayers.Ortho,

}, {
    "Bmapoverlay" : myLayers.bmapoverlay,
    "Stationen" : bikeGroup, //Hinzufuegen zum Overlay
    "Route": bikeLine,
}, {
    collapsed : false
});

myMap.addControl(myMapControl);

L.control.scale({
    position: "bottomleft",
    maxWidth: 200,
    metric: true,
    imperial: false,
    }
).addTo(myMap);

const imst = [47.224,10.749];
const ehrwald = [47.398, 10.920]

const iconStart = L.icon({
    iconUrl: "data/startfinish.png"
});
const iconFinish = L.icon({
    iconUrl: "data/finish.png"
});

const markerOptions1 = {
    title: "Imst - Ehrwald", // feste Optionen für alle
    opacity: 1,
    draggable: false,
    icon: iconStart,
};
const markerOptions2 = {
    title: "Imst - Ehrwald", // feste Optionen für alle
    opacity: 1,
    draggable: false,
    icon: iconFinish,
};
L.marker(imst, markerOptions1).addTo(bikeGroup).bindPopup("<p><a href='https://de.wikipedia.org/wiki/Imst'><strong>Imst</strong></a></p><img style = 'width:200px' src='https://www.stern-imst.at/fileadmin/template/images/hotel-imst-content/Home-Hotel-Imst/Winterwandern-Tirol-Imst-Blick-02.jpg' alt='Patscherkofel' />");
L.marker(ehrwald, markerOptions2).addTo(bikeGroup).bindPopup("<p><a href='https://de.wikipedia.org/wiki/Ehrwald'><strong>Ehrwald</strong></a></p><img style = 'width:200px' src='https://www.zugspitzarena.com/website/var/tmp/image-thumbnails/120000/120661/thumb__lightbox-image/ehrwald-kirchplatz-zugspitze.jpeg' alt='Patscherkofel' />");

myMap.fitBounds(bikeGroup.getBounds());



let geojson = L.geoJSON(toGeoJSON).addTo(bikeLine);
geojson.bindPopup(function(layer) {
    //console.log("Layer for Popup:", layer.feature.geometry); 
    const props = layer.feature.geometry;
    const line = `<p>${props.coordinates}</p>`;
    return line // popupText;
});
// eine neue Leaflet Karte definieren

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen*/
