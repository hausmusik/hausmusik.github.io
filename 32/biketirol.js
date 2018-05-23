let myMap = L.map("map", {
    fullscreenControl: true
});
let bikeGroup = L.featureGroup().addTo(myMap);
let bikeLine = L.featureGroup().addTo(myMap);
let overlaySteigung = L.featureGroup().addTo(myMap);
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
    Summer: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        attribution: "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
    }
    ),
    Winter: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        attribution: "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
    }
    ),
    Ortho: L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        attribution: "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
    }
    ),
};




myMap.addLayer(myLayers.geolandbasemap);
let myMapControl = L.control.layers({
    "Openstreetmap": myLayers.osm,
    "Geolandbasemap": myLayers.geolandbasemap,
    "Sommerkarte": myLayers.Summer,
    "Winterkarte": myLayers.Winter,
    "Orthokarte": myLayers.Ortho,

}, {
        "Bmapoverlay": myLayers.bmapoverlay,
        "Stationen": bikeGroup,
        "Route": bikeLine,
        "Steigung": overlaySteigung,
    }, {
        collapsed: false
    });

myMap.addControl(myMapControl);

L.control.scale({
    position: "bottomleft",
    maxWidth: 200,
    metric: true,
    imperial: false,
}
).addTo(myMap);

const imst = [47.224, 10.749];
const ehrwald = [47.398, 10.920]

const iconStart = L.icon({
    iconUrl: "images/startfinish.png",
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
});
const iconFinish = L.icon({
    iconUrl: "images/finish.png",
    iconAnchor: [16, 37],
    popupAnchor: [0, -37],
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



//Hilfe fuer leaflet.gpx: https://github.com/mpetazzoni/leaflet-gpx
let gpxTrack = new L.GPX("data/etappe32.gpx", {
    async: true,
}); //.addTo(myMap);
gpxTrack.on("loaded", function (evt) {
    //console.log(evt.target.get_distance().toFixed(0));
    //console.log(evt.target.get_elevation_min());
    let laenge = evt.target.get_distance().toFixed(0);
    document.getElementById("laenge").innerHTML = laenge;
    let tiefsterP = evt.target.get_elevation_min().toFixed(0);
    document.getElementById("tiefsterP").innerHTML = tiefsterP;
    let hoechsterP = evt.target.get_elevation_max().toFixed(0);
    document.getElementById("hoechsterP").innerHTML = hoechsterP;
    let aufstieg = evt.target.get_elevation_gain().toFixed(0)
    document.getElementById("aufstieg").innerHTML = aufstieg;
    let abstieg = evt.target.get_elevation_loss().toFixed(0)
    document.getElementById("abstieg").innerHTML = abstieg;

    myMap.fitBounds(evt.target.getBounds());
});

//Elevation Control
var hoehenProfilKontrolle = L.control.elevation({
    position: "topleft",
    theme: "steelblue-theme",
    collapsed: true,
}).addTo(myMap)


//Elevation Zeichnen
let hoehenProfil = new L.GPX("data/etappe32.gpx", {
    async: true,
});
hoehenProfil.on('loaded', function (evt) {
    //map.fitBounds(evt.target.getBounds());
});
hoehenProfil.on("addline", function (evt) {
    hoehenProfilKontrolle.addData(evt.line);
    /*console.log(evt.line);
    console.log(evt.line.getLatLngs());
    console.log(evt.line.getLatLngs()[0]); 
    console.log(evt.line.getLatLngs()[0].meta); 
    console.log(evt.line.getLatLngs()[0].lat);    
    console.log(evt.line.getLatLngs()[0].lng);
    console.log(evt.line.getLatLngs()[0].meta.ele);*/

    //alle Segmente der Steigungslinie hinzufügen
    let gpxLinie = evt.line.getLatLngs();
    for (let i = 1; i < gpxLinie.length; i++) {
        let p1 = gpxLinie[i - 1];
        let p2 = gpxLinie[i];

        //Entfernung zwischen Punkten Berechnen
        let dist = myMap.distance(
            [p1.lat, p1.lng],
            [p2.lat, p2.lng]
        );

        //Hoehenunterschied berechnen
        let delta = p2.meta.ele - p1.meta.ele;

        //Steigung in %
        /*let proz = 0;
        if (dist > 0) {
            let proz = (delta / dist * 100.0).toFixed(1);
        };*/

        //Andere Schreibweise: Bedingung ? ausdruck1 : Ausdruck2
        let proz = (dist > 0) ? (delta / dist * 100.0).toFixed(1) : 0;

        //console.log(p1.lat, p1.lng, p2.lat, p2.lng, dist, delta, proz);

        //Zuteilung der Farbe URL: http://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3
        let farbe = 
            (proz > 10)  ? "#cb181d" :
            (proz > 6)   ? "#fb6a4a" : 
            (proz > 2)   ? "#fcae91" : 
            (proz > 0)   ? "#fee5d9" : 
            (proz > -2)  ? "#edf8e9" :
            (proz > -6)  ? "#bae4b3" : 
            (proz > -10) ? "#74c476" :  
                           "#238b45";

        let segment = L.polyline(
            [
                [p1.lat, p1.lng],
                [p2.lat, p2.lng],
            ], {
                color: farbe,
                weight: 10,
            }
        ).addTo(overlaySteigung);
    }
});
hoehenProfil.addTo(bikeLine);


//myMap.fitBounds(bikeGroup.getBounds());

/*let geojson = L.geoJSON(toGeoJSON).addTo(bikeLine);
geojson.bindPopup(function(layer) {
    //console.log("Layer for Popup:", layer.feature.geometry); 
    const props = layer.feature.geometry;
    const line = `<p>${props.coordinates}</p>`;
    return line // popupText;
});*/

