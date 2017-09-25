module.exports = (app) => {
  app.use('/register',
    require('./policies/AuthenticationControllerPolicy').register,
    require('./controllers/AuthenticationController').register)

  app.use('/login',
    require('./controllers/AuthenticationController').login)

  app.use('/songs',
    require('./controllers/SongsController').index)

  app.use('/song/:songId',
    require('./controllers/SongsController').show)

  app.use('/song',
    require('./controllers/SongsController').post)
}
