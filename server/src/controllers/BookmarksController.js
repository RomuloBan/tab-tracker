const {Bookmark, Song} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const { songId, userId } = req.query
      let where = {
        UserId: userId
      }
      if(songId) {
        where.SongId = songId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend(
          {},
          bookmark.Song,
          bookmark
        ))

      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get the bookmark.'
      })
    }
  },
  async post (req, res) {
    try {
      const {songId, userId} = req.body

      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      console.log('Bookmark', bookmark)
      if(bookmark) {
        return res.status(400).send({
          error: 'An error occured trying to check if bookmark exists.'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the bookmark.'
      })
    }
  },
  async delete (req, res) {
    try {
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findById(bookmarkId)
      bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete the bookmark.'
      })
    }
  }
}
