const express = require("express");
const router = express.Router();
const { Collection, FieldsType, Items, Likes } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfItems = await Items.findAll();
  const listOfCollection = await Collection.findAll();
  const listOfLikes = await Likes.findAll();
  listOfItems.map((item) => {
    const { name } = listOfCollection.find(collection => collection.id === item.CollectionId);
    const likesCount = listOfLikes.filter(like => like.CollectionId === item.CollectionId).length - 1;
    item.author = name;
    item.likesCount = likesCount;
  })
  res.json({ listOfItems: listOfItems });
});

module.exports = router;
