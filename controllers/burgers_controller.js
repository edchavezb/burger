var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js")

router.get("/", function(req, res) {
  burger.all(function(data) {
    var handlebarsObject = {
      burgers: data
    };
    console.log(handlebarsObject);
    res.render("index", handlebarsObject);
  });
});
  
router.post("/api/burgers", function(req, res) {
  burger.create([
    "bgr_name", "devoured"
  ], [
    req.body.bgr_name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.status
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
