const express = require('express');
const app = express();
const cors = require("cors")
require("dotenv").config();

app.use(cors())
app.use(express.json());
const db = require("./models");

const authentification = require("./routes/Authentification");
app.use("/authentification", authentification);

const collection = require("./routes/Collection");
app.use("/collection", collection);


db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server running on port 3001")
  });
})