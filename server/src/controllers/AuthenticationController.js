const router = require('express').Router()

router.get('/', (req, res) =>
  res.send({
    message: `Hello ${req.body.email}! Your user was registered! Have fun!`
  })
)

module.exports = router
