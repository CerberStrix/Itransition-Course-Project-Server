const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/authMiddleware")

const { Tags } = require("../models");

router.get("/get", validateToken, async (req, res) => {
  const listOfTags = await Tags.findAll();
  res.json(listOfTags);
});

module.exports = router;
