const express = require('express')
const cors = require('cors')
const app = express()
const db = require("./db")
const standalone = require("./standalone")


const port = process.env.PORT || 8000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Small service for incrementing build versions')
})

app.get('/:project/get', (req, res) => {
  const { project } = req.params;
  standalone.getProjectVersion(project, (data) => {
    res.send(data)
  }, (err) => {
    res.send(err)
  })
})

app.get('/:project', (req, res) => {
  const { project } = req.params;
  standalone.updateProjectVersion(project);
  standalone.getProjectVersion(project, (data) => {
    res.send(data)
  }, (err) => {
    res.send(err)
  })
})

// app.get('/:identifier/set/:numberstr', async (req, res) => {
	
// });

app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}`)
})