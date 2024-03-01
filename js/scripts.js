// Swap background images
// Array of image URLs
const preloadImages = [
  "https://live.staticflickr.com/65535/51805630931_047e3c1719_4k.jpg",
  "https://live.staticflickr.com/65535/51806542085_d4936f74ca_4k.jpg",
  "https://live.staticflickr.com/65535/52598757364_60eb45e668_5k.jpg",
  "https://live.staticflickr.com/65535/51486412718_4625ecd8e3_4k.jpg",
  "https://live.staticflickr.com/65535/52598487121_7b3223e3e3_5k.jpg",
  "https://live.staticflickr.com/65535/52351816399_0866412818_5k.jpg",
  "https://live.staticflickr.com/65535/52225137705_0d63e381f6_5k.jpg",
  "https://live.staticflickr.com/65535/51263864210_e17fb96035_4k.jpg",
  "https://live.staticflickr.com/65535/50391587553_3c327f31ba_3k.jpg",
  "https://live.staticflickr.com/65535/50101543461_2d66f880f6_3k.jpg",
];

images = [];

for (let i = 0; i < preloadImages.length; i++) {
  const img = new Image();
  img.src = preloadImages[i];
  images.push(img.src);
}


// Function to cycle through header background images
function cycleImages(seconds, startOpacity, endOpacity) {
  const imageContainer = document.querySelector("header");
  let index = 0;
  let image = images[index];
  const gradient = `linear-gradient(45deg, rgba(22, 22, 22, ${startOpacity}) 0%, rgba(56, 56, 56, ${endOpacity}) 100%)`;
  setInterval(() => {
    image = images[index];
    imageContainer.style.background = `${gradient}, url(${image})`;
    imageContainer.style.backgroundSize = "cover";
    imageContainer.style.backgroundPosition = "center";
    index = (index + 1) % images.length;
  }, seconds * 1000);
}

// Call the function to start cycling through images
cycleImages(7, 0.8, 0.9);

// Leaflet Map
const options = {
  center: [38, -97],
  zoom: 4,
  zoomSnap: 0.5,
  zoomControl: false,
  attributionControl: false,
};

// Create Leaflet map and apply options
const map = L.map("map", options);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Fetch GeoJSON data and add to map
fetch("data/travels.geojson")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    drawMap(data);
  });
// Function to draw map
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
