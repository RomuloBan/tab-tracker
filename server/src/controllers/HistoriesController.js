const {History, Song} = require('../models')
const _ = require('lodash')

module.exports = {

  async index (req, res) {
    try {
      const userId = req.user.id
      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        distinct: 'UserId',
        include: [
          {
            model: Song
          }
        ]
      })
        .map(historyItem => historyItem.toJSON())
        .map(historyItem => Object.assign(
          {},
          historyItem,
          historyItem.Song
        ))
      res.send(_.uniqBy(histories, history => history.SongId))
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get the history.'
      })
    }
  },

  async post (req, res) {
    try {
      const userId = req.user.id
      const { songId } = req.body
      const history = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(history)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured trying to create history object'
      })
    }
  }
}
