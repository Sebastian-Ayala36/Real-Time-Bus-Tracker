mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYXN0aWFuLWF5YWxhMzYiLCJhIjoiY2tva3V4M2F2MGZxajJwbzdoeTNkdjdjZCJ9.X5ICzEbVe82-llwPx_kW6w';
var markers = [];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mmapbox://styles/mapbox/navigation-night-v1',
    //'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081,42.365554],
    zoom: 15
});

async function addMarkers(){
    var locations = await getBusLocations();
    locations.forEach(function(bus){
        var marker = getMarker(bus.id);
        if(marker){
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
    var marker = new mapboxgl.Marker()
        .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
        .addTo(map);
    markers.push(marker);
}

function moveMarker(marker, bus){
    marker.setLngLat([bus.attributes.longitud, bus.attributes.latitude]);
}

function getMarker(id){
    var marker = markers.find(function(item){
        return item.id === id;
    });
    return marker;
}

addMarkers();
