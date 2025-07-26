// Initialize the map
const map = L.map('map').setView([17.385044, 78.486671], 12);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Extended list of locations with detailed info
const locations = [
  { name: "Charminar", lat: 17.3616, lng: 78.4747,
    desc: "Famous historical monument and mosque, built in 1591.",
    image: "assets/images/charminar.jpg" },
  { name: "Hussain Sagar", lat: 17.4239, lng: 78.4738,
    desc: "Heart-shaped lake with a giant Buddha statue.",
    image: "assets/images/hussain.jpg" },
  { name: "Golconda Fort", lat: 17.3833, lng: 78.4011,
    desc: "Historic fort famous for its architecture and acoustics.",
    image: "assets/images/golconda.jpg" },
  { name: "Salar Jung Museum", lat: 17.3713, lng: 78.4804,
    desc: "One of the largest museums in India with rare art collections.",
    image: "assets/images/salarjung.jpg" },
  { name: "Nehru Zoological Park", lat: 17.3507, lng: 78.4510,
    desc: "One of the largest zoos in India, home to many species.",
    image: "assets/images/nehru-zoological-park.jpg" },
  { name: "Birla Mandir", lat: 17.4062, lng: 78.4691,
    desc: "White marble Hindu temple built on a hill.",
    image: "assets/images/birlamandir.jpg" },
  { name: "Ramoji Film City", lat: 17.2543, lng: 78.6808,
    desc: "World’s largest integrated film studio complex.",
    image: "assets/images/ramoji.jpg" },
  { name: "Shilparamam", lat: 17.4526, lng: 78.3678,
    desc: "Arts and crafts village showcasing traditional Indian culture.",
    image: "assets/images/shilparamam.jpg" },
  { name: "IKEA Hyderabad", lat: 17.4399, lng: 78.3785,
    desc: "World-famous IKEA furniture store in Hyderabad.",
    image: "assets/images/ikea.jpg" },
  { name: "Botanical Garden", lat: 17.4375, lng: 78.3611,
    desc: "Garden with various plants, trees, and a peaceful environment.",
    image: "assets/images/botanical.jpg" }
];

// Markers array
const markers = [];

// Function to create popup HTML
function createPopup(loc) {
  return `
    <div style="text-align:center;">
      <h3>${loc.name}</h3>
      <img src="${loc.image}" alt="${loc.name}" style="width:100%;max-width:200px;border-radius:5px;">
      <p>${loc.desc}</p>
    </div>
  `;
}

// Add markers
locations.forEach(loc => {
  const marker = L.marker([loc.lat, loc.lng])
    .addTo(map)
    .bindPopup(createPopup(loc));
  markers.push({ marker, name: loc.name.toLowerCase() });
});

// Search and display results
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

// Function to search locations
function searchLocations() {
  const query = searchInput.value.toLowerCase();
  resultsDiv.innerHTML = "";

  if (!query) {
    resultsDiv.style.display = "none";
    return;
  }

  const matched = markers.filter(m => m.name.includes(query));

  if (matched.length === 0) {
    resultsDiv.innerHTML = "<div>No locations found</div>";
    resultsDiv.style.display = "block";
    return;
  }

  matched.forEach(m => {
    const resultItem = document.createElement("div");
    resultItem.textContent = m.name.charAt(0).toUpperCase() + m.name.slice(1);
    resultItem.addEventListener("click", () => {
      map.setView(m.marker.getLatLng(), 15);
      m.marker.openPopup();
      resultsDiv.style.display = "none";
    });
    resultsDiv.appendChild(resultItem);
  });

  resultsDiv.style.display = "block";
}

// When search button is clicked
searchBtn.addEventListener("click", searchLocations);

// Optional: search as you type
searchInput.addEventListener("input", searchLocations);
