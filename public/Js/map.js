
console.log("Listing coordinates:", listing.geometry.coordinates);

mapboxgl.accessToken = mapToken;

const coords = listing.geometry.coordinates;
const center = Array.isArray(coords) && coords.length === 2 ? [coords[0], coords[1]] : [0, 0];

const map = new mapboxgl.Map({
    container: 'map', // container ID
    // style: 'mapbox://styles/mapbox/dark-v11',
    center: center, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({color: "red"}) 
        .setLngLat(center) //Listing.geometry.coordinates
        .setPopup(
            new mapboxgl.Popup({offset :25}).setHTML(
                `<h4>${listing.location}</h4> <p>Exact Location Providing After Booking</p>`
            )
        )
        .addTo(map);

