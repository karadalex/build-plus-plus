const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Small service for incrementing build versions')
})

app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}`)
})
