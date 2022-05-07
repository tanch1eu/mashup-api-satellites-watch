// Mapping satellites using Leaflet.js and OpenStreetMap
const fetchMap = () => {
  // initial map, set tiles, satellite icons, at attributor as a reference
  const mymap = L.map("mapid").setView([0, 0], 2);
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const iconISS = L.icon({
    iconUrl: "../images/ISS.png",
    iconSize: [200, 100],
    iconAnchor: [25, 16],
  });
  // const iconNOAA = L.icon({
  //   iconUrl: "../images/NOAA.png",
  //   iconSize: [100, 80],
  //   iconAnchor: [25, 16],
  // });
  // const iconYAOGAN = L.icon({
  //   iconUrl: "../images/YAOGAN.png",
  //   iconSize: [110, 70],
  //   iconAnchor: [25, 16],
  // });
  const tile_url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tiles = L.tileLayer(tile_url, { attribution });
  tiles.addTo(mymap);

  const ISS = L.marker([0, 0], { icon: iconISS }).addTo(mymap);
  // const NOAA = L.marker([0, 0], { icon: iconNOAA }).addTo(mymap);
  // const YAOGAN = L.marker([0, 0], { icon: iconYAOGAN }).addTo(mymap);

  // get ISS actual positions
  let initial_state = true;
  const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
  async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;
    // const api_url2 = `https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`;
    // const response2 = await fetch(api_url2);
    // const location = await response2.json();
    // const { timezone_id } = location;
    // document.getElementById("latISS").textContent = latitude.toFixed(2);
    // document.getElementById("longISS").textContent = longitude.toFixed(2);
    // document.getElementById("locationISS").textContent = timezone_id;
    ISS.setLatLng([latitude, longitude]);
    if (initial_state == true) {
      mymap.setView([latitude, longitude], 5);
      initial_state = false;
    }
  }
  getISS();
  setInterval(getISS, 1000);
};

const positionISS = document.getElementsByClassName("mapISS");

for (let i of positionISS) {
  i.addEventListener("click", () => {
    fetchMap();
  });
}
