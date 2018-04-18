//Definition der Varibalen
let myMap = L.map("mapdiv"); 
//let myLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"); // s steht für den Subdomain

let myLayers = {
    osm : L.tileLayer ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    geolandbasemap : L.tileLayer ("https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png"),
    bmapoverlay :  L.tileLayer ("https://maps.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png"),
    bmapgrau : L.tileLayer ("https://maps.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png"),
    bmaphidpi : L.tileLayer ("https://maps.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg"),
    bmaporthofoto30cm : L.tileLayer ("https://maps.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg"),
};




myMap.addLayer(myLayers.geolandbasemap); //Hinzufügen des Layers zur Karte, dabei können verschiedene Layer nach dem .irgendwas ausgewählt werden
myMap.setView([47.267,11.383], 11); //Koordinaten setzen
