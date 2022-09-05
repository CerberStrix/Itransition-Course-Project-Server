const express = require("express");
const router = express.Router();
const { Collection, FieldsType, Items, Likes, ItemFields, Tags, ItemTags } = require("../models");

const { validateToken } = require("../middlewares/authMiddleware")

router.get("/:collectionId", validateToken, async (req, res) => {
  const collectionId = req.params.collectionId;
  const listOfItems = await Items.findAll({
    where: { CollectionId: collectionId }
  })
  res.json(listOfItems);
});

router.post("/createItem", validateToken, async (req, res) => {
  const { itemName, state, tags, collId } = req.body;
  const NewItem = await Items.create({
    name: itemName,
    CollectionId: collId
  });

  for (const { key, value, type } of state) {
    const newItemsField = await ItemFields.create({
      name: key,
      value: value,
      type: type,
    });
    NewItem.addItemFields(newItemsField);
  };

  for (const { name } of tags) {
    const Tag = await Tags.findOrCreate({
      where: { name: name },
      defaults: {
        name: name
      }
    }).then((tag) => { NewItem.addTags(tag)})
    
  }
  res.json(NewItem)
})

router.delete("/delete/:itemsId", validateToken, async (req, res) => {
  console.log("Delete =================")
  const itemsId = req.params.itemsId;
  await Items.destroy({
    where: { id: itemsId }
    }
  )
  res.json("SUCCESS")
});

module.exports = router;

