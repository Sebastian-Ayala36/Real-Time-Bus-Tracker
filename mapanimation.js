mapboxgl.accessToken = 'pk.eyJ1IjoiZXBhcnJhMzMiLCJhIjoiY2tvbmFvaDA2MDhuMjJvbGZsZ2kyMzhqZyJ9.MqYRnBgO1jPJwJHX8O0NiQ'; 
var markers = [];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    center: [-71.104081,42.365554],
    zoom: 14
});

async function addMarkers(){
    var locations = await getBusLocations();
    locations.forEach(function(bus){
        var marker = getMarker(bus.id);
        if(!(marker === undefined)){
            moveMarker(marker, bus);
        }
        else{
            addMarker(bus);
        }
    });
    console.log(new Date());
    setTimeout(addMarkers, 15000);
}

async function getBusLocations(){
    var url = 'https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip';
    var response = await fetch(url);
    var json = await response.json();
    return json.data;
}

function addMarker(bus){
    var marker = {markerElement: new mapboxgl.Marker()
        .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
        .addTo(map),
        id: bus.id
    }
    markers.push(marker);
}

function moveMarker(marker, bus){
    marker.markerElement.setLngLat([bus.attributes.longitude, bus.attributes.latitude]);
}

function getMarker(id){
    var marker = markers.find(function(item){
        return item.id === id;
    });
    return marker;
}

addMarkers();
