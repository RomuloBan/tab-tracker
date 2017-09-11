const router = require('express').Router()
const {User} = require('../models')

router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => {
      res.send(user)
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({
          error: 'This email account is already in use'
        })
      }
    })
})

module.exports = router
