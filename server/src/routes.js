module.exports = (app) => {
  app.use('/register',
    require('./policies/AuthenticationControllerPolicy').register,
    require('./controllers/AuthenticationController').register)

  app.use('/login',
    require('./controllers/AuthenticationController').login)
}
