// 在lib下封装好的mysql数据库连接池
const pool = require('../lib/mysql')
// STATUS是定义的枚举对象
const { STATUS } = require('../enum')
// 封装好的数据库连接池对象
const { query } = pool
// 新添管理员
const add = (val) => {
  const { url, contentValue, type } = val
  const values = Object.values(val)
  const _sql = 'insert into reptile(url,content_value,type,create_time,status) values(?,?,?,now(),?);'
  return query( _sql, [ url, contentValue, type, STATUS.NORMAL])
}
const list = () => {
  const _sql = 'select * from reptile where status =? ;'
  return query( _sql, [STATUS.NORMAL])
}

module.exports = {
  add,
  list,
}