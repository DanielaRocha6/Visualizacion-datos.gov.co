var createError = require('http-errors')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index')
var historico = require('./routes/historico')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('front/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'))
  })
}

app.use('/', indexRouter)
app.use('/historico', historico)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
