const controller = require('../controller/reptile')
const pojo = require('../helper/pojo')
const model = require('./model')
const { success, failed, filterUnderLine }  = pojo
const m  = model([
  'list',
], 'reptile')
/**
 * @description 重写add，为了给爬虫新添一些逻辑
 * @param {*} ctx   如果是node环境调用就是params
 * @param {*} isNode 如果是node环境调用（非api）
 */
const add = async (ctx, isNode = false) => {
  let res;
  try {
    let val;
    if (isNode) {
      val = ctx
    } else {
      val = ctx.request.body
    }
    // 调用controller的add方法
    await controller.add(val).then(result => {
      if (isNode) {
        // node调取返回影响的行数
        res = result.affectedRows
        return
      }
      if(result.length === 0 || result === null || result === undefined)  
        res = failed('操作失败')
      else 
        res = success(filterUnderLine(result[0]))
    })
  } catch(err) {
    res = failed(err)
  }
  if (isNode) {
    // node调取返回bool
    return res >= 1
  } else {
    ctx.body = res
  }
}
module.exports = {
  ...m,
  add,
}