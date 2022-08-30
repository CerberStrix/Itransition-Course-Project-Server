const express = require("express");
const router = express.Router();
const { Collection, FieldsType, Items } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware")

router.post("/createCollection", async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    theme,
    UserId,
    fields,
  } = req.body;
  
  const newCollection = await Collection.create({
    name: name,
    description: description,
    imageUrl: imageUrl,
    theme: theme,
    UserId: UserId,
  })

  for (const { name, type } of fields) {
    const newField = await FieldsType.create({
      name: name,
      type: type,
    });
    newCollection.addFieldsType(newField);
  };
  res.json(newCollection);
});

router.get("/byuser", validateToken,  async (req, res) => {
  const collections = await Collection.findAll({
    where: {
      userId: req.user.id,
    }
  })
  res.json(collections);
});

router.get("/:collectionId", validateToken, async (req, res) => {
  const collectionId = req.params.collectionId;
  const collection = await Collection.findByPk(collectionId);
  const collectionFields = await FieldsType.findAll({
    where: {
      CollectionId: collectionId,
    }
  })
  const items = await Items.findAll({
    where: {
      CollectionId: collectionId,
    }
  })
  
  res.json({
    collection,
    collectionFields,
    items,
  });
})

router.delete("/delete/:collectionId", async (req, res) => {
  const collectionId = req.params.collectionId;
  console.log(collectionId)
  await Collection.destroy({
    where: {
      id: collectionId,
    }
  })

  res.json("DELETED SUCCESSFULLY");
})

router.patch("/edit/:collectionId", async (req, res) => {
  const collectionId = req.params.collectionId;
  const {
    name,
    description,
    imageUrl,
    theme,
    UserId,
    fields,
  } = req.body;

  const collection = await Collection.findByPk(collectionId);

  await Collection.update({
    name: name,
    description: description,
    imageUrl: imageUrl,
    theme: theme,
   }, {
      where: { id: collectionId }
    });
  await FieldsType.destroy({
    where: {
      CollectionId: collectionId,
    }
  })
  for (const { name, type } of fields) {
    const newField = await FieldsType.create({
      name: name,
      type: type,
    });
    collection.addFieldsType(newField);
  };
  res.json("EDITED SUCCESSFULLY");
})

module.exports = router;