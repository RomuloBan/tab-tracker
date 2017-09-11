module.exports = (app) => {
  app.use('/register', require('./controllers/AuthenticationController'))
}
