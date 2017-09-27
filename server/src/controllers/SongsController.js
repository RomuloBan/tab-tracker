const {Song} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let songs = null
      const search = req.query.search
      if (search) {
        const query = [
          'title', 'artist', 'album', 'genre'
        ].map(key => ({ [key]: { $like: `%${search}%` } }))
        console.log('RES', query)
        songs = await Song.findAll({
          where: {
            $or: query
          }
        })
      } else {
        songs = await Song.findAll({
          limit: 10
        })
      }
      res.send(songs)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the songs.'
      })
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      console.log('Song', req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the song.'
      })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findById(req.params.songId)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to show the song.'
      })
    }
  },
  async put (req, res) {
    try {
      console.log('Request put', req.body)
      const song = await Song.update(req.body,
        {
          where: {
            id: req.body.id
          }
        })
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to update the song.'
      })
    }
  }
}
