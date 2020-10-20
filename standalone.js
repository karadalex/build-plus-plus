const db = require("./db")

const noop = (data) => {}

/**
 * Get Project version number
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

/**
 * Increment project version number
 * @param {String} project 
 * @param {Function} success_callback 
 * @param {Function} error_callback 
 */
function updateProjectVersion(project, success_callback=noop, error_callback=noop) {
  let sql = `UPDATE versions
    SET version = version + 1, updated_at = CURRENT_TIMESTAMP
    WHERE project = ?`
  let params = [project]
  db.get(sql, params, function (err, row) {
    if (err) error_callback(err.message)
    if (row) success_callback(String(row.version))
    else error_callback("Project not found")
  })
}

module.exports = { getProjectVersion, updateProjectVersion }