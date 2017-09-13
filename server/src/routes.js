module.exports = (app) => {
  app.use('/register',
    require('./policies/AuthenticationControllerPolicy').register,
    require('./controllers/AuthenticationController'))
}
