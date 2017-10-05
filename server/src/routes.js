module.exports = (app) => {
  app.use('/register',
    require('./policies/AuthenticationControllerPolicy').register,
    require('./controllers/AuthenticationController').register)

  app.use('/login',
    require('./controllers/AuthenticationController').login)

  app.use('/songs',
    require('./controllers/SongsController').index)

  app.use('/song/edit',
    require('./controllers/SongsController').put)

  app.use('/song/:songId',
    require('./controllers/SongsController').show)

  app.use('/song',
    require('./controllers/SongsController').post)

  app.use('/bookmarks',
    require('./controllers/BookmarksController').index)

  app.use('/bookmark/:bookmarkId',
    require('./controllers/BookmarksController').delete)

  app.use('/bookmark',
    require('./controllers/BookmarksController').post)

  app.get('/histories',
    require('./controllers/HistoriesController').index)

  app.post('/histories',
    require('./controllers/HistoriesController').post)
}
