// Swap background images

// Array of image URLs
const images = [
  "https://live.staticflickr.com/65535/52598489411_221279d23a_k.jpg",
  "https://live.staticflickr.com/65535/52599013293_1028bf8f6c_k.jpg",
  "https://live.staticflickr.com/65535/52598489411_221279d23a_k.jpg",
  "https://live.staticflickr.com/65535/52599013293_1028bf8f6c_k.jpg",
];

// Function to cycle through images
function cycleImages() {
    const gradient = (opacity1, opacity2) => {
        return `linear-gradient(45deg, rgba(22, 22, 22, ${opacity1}) 0%, rgba(56, 56, 56, ${opacity2}) 100%)`
    };
//  const gradient = `linear-gradient(45deg, rgba(22, 22, 22, 0.8) 0%, rgba(56, 56, 56, 0.9) 100%)`;
  let index = 0;
  let image = images[index];
  const imageContainer = document.querySelector('header');


  setInterval(() => {
    image = images[index];
    imageContainer.style.background = `${gradient(0.8, 0.8)}, url(${image})`;
    imageContainer.style.backgroundSize = "cover";
    imageContainer.style.backgroundPosition = "center";
    index = (index + 1) % images.length;
  }, 7000);
}

// Call the function to start cycling through images
cycleImages();

const options = {
  center: [38, -97],
  zoom: 4,
  zoomSnap: 0.5,
  zoomControl: false,
  attributionControl: false,
};
// create Leaflet map and apply options
const map = L.map("map", options);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

fetch("data/travels.geojson")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    drawMap(data);
  });

function drawMap(data) {
  const travelsLayer = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 10,
        fillColor: "#FFD700",
        color: "#FFD700",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.5,
      });
    },
    onEachFeature: function (feature, layer) {
      const popupContent = `<h2>${feature.properties.Name}</h2>`;
      layer.bindPopup(popupContent);
      layer.on("mouseover", function () {
        layer
          .setStyle({
            color: "#ff83ec",
            fillColor: "#ff83ec",
          })
          .bringToFront();
      });

      // on mousing off layer
      layer.on("mouseout", function () {
        // reset the layer style to its original stroke color
        layer.setStyle({
          color: "#FFD700",
          fillColor: "#FFD700",
        });
      });
    },
  }).addTo(map);
}
