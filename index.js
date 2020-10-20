const db = require("./db")

const noop = (data) => {}
const notFound = "Project not found"

/**
 * Get Project version number. If no such project exists, create one
 * @param {String} project 
 * @param {Function} success_callback 
 * @param {Function} error_callback 
 */
function getOrCreateProjectVersion(project, success_callback=noop, error_callback=noop) {
  let sql = `SELECT version FROM versions WHERE project=?`
  let params = [project]
  db.get(sql, params, function (err, row) {
    if (err) { 
      error_callback(err.message)
      return err.message
    }
    if (row) {
      success_callback(String(row.version))
      return row.version
    } else {
      let insertSql = `INSERT INTO versions (project, version, created_at, updated_at) 
        VALUES (?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
      db.run(insertSql, params, function (err, row) {
        if (err) {
          error_callback(err.message)
          return err.message
        }
        db.get(sql, params, function (err, row) {
          if (err) { 
            error_callback(err.message)
            return err.message
          }
          success_callback(String(row.version))
          return row.version
        })
      })
    }
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
    if (err) {
      error_callback(err.message)
      return err.message
    }
    if (row) {
      success_callback(String(row.version))
      return row.version
    }
    else {
      error_callback(notFound)
      return notFound
    }
  })
}

module.exports = { getOrCreateProjectVersion, updateProjectVersion }