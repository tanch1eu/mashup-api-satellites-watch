const express = require("express");
const router = express.Router();
const wiki = require("wikijs").default;

router.get("/summary/:name", function (req, res) {
  let { name } = req.params;

  if (name == "SPACE STATION") {
    name = "International Space Station";
  }
  if (name == "YAOGAN 6") {
    name = "Yaogan";
  }
  if (name == "NOAA 12") {
    name = "NOAA-12";
  }
  wiki()
    .page(name)
    .then((page) => page.summary())
    .then((summary) => {
      res.json({ summary });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
