const express = require('express')
const cors = require('cors')
const app = express()
const db = require("./db")


const port = process.env.PORT || 8000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Small service for incrementing build versions')
})

app.get('/:project/get', (req, res) => {
  const { project } = req.params;
  let sql = `SELECT version FROM versions WHERE project=?`
  let params = [project]
  db.get(sql, params, function (err, row) {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    if (row) res.end(String(row.version))
    else res.end("Project not found")
  })
})

app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}`)
})