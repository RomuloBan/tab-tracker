const router = require('express').Router()
const {User} = require('../models')

const createUser = async (user) => {
  try {
    const r = await User.create(user)
    return r.toJSON()
  } catch (err) {
    return {
      error: 'This email account is already in use.'
    }
  }
}

router.post('/', (req, res) => {
  createUser(req.body).then((user) => {
    res.send(user)
  })
})

module.exports = router
