const express = require('express')
const app = express()
const connectToMongo = require('./db')
const port = 5000
const cookieparser = require('cookie-parser')
const cors = require('cors')
connectToMongo()
// that will make json file as obj
app.use(cors())
app.use(express.json())
app.use(cookieparser())
// link to connect router
app.use(require('./router/auth'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App Listening on http://localhost:${port}`)
})