const express = require("express");
const router = express.Router();
const axios = require("axios");
/* GET home page. */
router.get("/", function (req, res, next) {
  const id = ["25544", "21263", "34839"];
  let collection = [];
  for (let num = 0; num < id.length; num++) {
    const sat_api_url = `http://api.n2yo.com/rest/v1/satellite/positions/${id[num]}/-27.46794/153.02809/0/1&apiKey=69JS9M-ANK6RH-GFRMTS-4RUC`;
    axios
      .get(sat_api_url)
      .then((response) => {
        const { data } = response;
        // console.log(data);
        satellite = {};
        satellite.name = data.info.satname;
        satellite.lat = data.positions[0].satlatitude.toFixed(2);
        satellite.long = data.positions[0].satlongitude.toFixed(2);
        collection.push(satellite);
        // console.log(satellite);
        if (collection.length == id.length) {
          // console.log(collection);
          res.render("index", { satellites: collection });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

module.exports = router;
