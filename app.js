const express = require('express')
const bodyParser = require('body-parser')
const webRouter = require('./routes/webRoutes')
const apiRouter = require('./routes/apiRoutes')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', webRouter)
app.use('/api', apiRouter)

app.listen(3000, function () {
  console.log('App listening on port 3000')
})
