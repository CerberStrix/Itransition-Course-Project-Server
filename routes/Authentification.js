const express = require('express');
const router = express.Router();
const { Users } = require('../models')  
const bcrypt = require('bcryptjs');
const { sign } = require("jsonwebtoken")
const { validateToken } = require("../middlewares/authMiddleware")

router.post('/registration', async (req, res) => {
  const { 
    name,
    email,
    password,
  } = req.body;

  const isExiting = await Users.findOne({ where: { email: email }})

  if(isExiting) {
    return res.json({ error: "User is allready exiting" });
  }
  const passHash = await bcrypt.hash(password, 10);
  const newUser = await Users.create({
      name: name,
      email: email,
      password: passHash,
      permission: "user"
    });
  res.json(newUser)
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email: email}});
  if(!user) {
    return res.json({ error: "User not exist" });
  }

  if(user.status === "Blocked") {
    return res.json({ error: "This account is blocked" });
  }
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ error: "Wrong Username or Password" });
  }
 
  const accessToken = sign({ email: user.email, name: user.name, permission: user.permission, id: user.id }, "mySecret");
  return res.json({ token: accessToken, email: email, name: user.name, permission: user.permission, id: user.id });
});

router.get("/auth", validateToken, async (req, res) => {
  const user = await Users.findOne({ where: { email: req.user.email}});
  if(!user) {
    return res.json({ error: "User not exist" });
  }
  res.json(req.user);
});


module.exports = router;

