const db = require("./db")

const noop = (data) => {}

/**
 * 
 * @param {String} project 
 * @param {Function} success_callback 
 * @param {Function} error_callback 
 */
function getProjectVersion(project, success_callback=noop, error_callback=noop) {
  let sql = `SELECT version FROM versions WHERE project=?`
  let params = [project]
  db.get(sql, params, function (err, row) {
    if (err) error_callback(err.message)
    if (row) success_callback(String(row.version))
    else error_callback("Project not found")
  })
}

module.exports = { getProjectVersion }