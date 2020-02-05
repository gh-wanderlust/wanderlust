const express = require("express")
const router = express.Router()
const {User} = require('../db/models')

router.get("/users", async (req, res) => {
  const allUsers = await User.findAll()
  res.send(allUsers)
})


module.exports = router
