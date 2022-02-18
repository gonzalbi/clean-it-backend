import mysql from 'mysql'
import config from 'config'
import util from 'util'

const db = config.get('db')
const pool = mysql.createPool({
  connectionLimit: 2,
  host: db.hostname,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database,
  waitForConnections: true,
  queueLimit: 0
})

pool.query = util.promisify(pool.query)

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }
  if (connection) connection.release()
  return
})

const addAuditData = (obj, operation) => {

  const CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()')
  const USER = 'root'

  // TODO: Get from header
  if (operation === 'INSERT') {
    obj.creation_date = obj.creation_date || CURRENT_TIMESTAMP
    obj.created_by = obj.created_by || USER
  }

  obj.updated_by = USER
  obj.update_date = CURRENT_TIMESTAMP

  return obj
}

const query = (qry) => {
  // add auditData if insert / update
    if (qry.sql && (qry.sql.indexOf('insert') > -1 || qry.sql.indexOf('update') > -1)) {
    qry.values = addAuditData(qry.values, qry.sql.indexOf('insert') > -1 ? 'INSERT' : 'UPDATE')
  }
  return pool.query(qry)
}

export {query}
