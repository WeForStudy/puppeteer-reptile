let $util = {}, $config;
const getText = (e, selector) => {
  return e.querySelector(selector) && e.querySelector(selector).innerText
}
const getAttr = (e, selector, attr) => {
  const ele = e.querySelector(selector)
  return ele && ele.getAttr(attr)
}
const getEle = (e, selector) => {
  const ele = e.querySelector(selector)
  return ele
}
$util.getText  = getText
$util.getAttr  = getAttr
$util.getTitle = (e, selector) => getAttr(e, selector, 'title')
$util.getEle   = getEle

module.exports = $util