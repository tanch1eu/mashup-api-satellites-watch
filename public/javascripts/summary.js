// Fetch data summary of satellite descriptions from Server API

const fetchInfo = (event) => {
  const name = event.target.textContent;

  fetch(`/api/summary/${name}`)
    .then((res) => res.json())
    .then((data) => {
      const parent = event.target.parentElement;
      const p = document.createElement("p");
      p.textContent = data.summary;
      parent.append(p);
    })
    .catch((error) => console.log(error));
};

const satNames = document.getElementsByClassName("getSatInfo");

for (let name of satNames) {
  name.addEventListener("click", (event) => {
    fetchInfo(event);
  });
}
