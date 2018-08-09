// 获取对应的数据操作服务类
const ReptileService = require('./services/reptile')
// 获得koa app入口
const app = require('./index')
// 获得无头浏览器puppeteer
const puppeteer = require('puppeteer');
// 项目匿名方法
(async() => {
  // 打开puppeteer
  const browser = await puppeteer.launch();
  // 浏览器打开新网页
  const page = await browser.newPage();
  const url = "https://open.163.com/"
  // 前往指定地址
  await page.goto(url);
  // 获得对应的数据
  const courses = await page.evaluate(() => {
    // evaluate方法是在浏览器环境下运行的一个匿名函数
    // 可以获取浏览器环境下等价的Bom操作
    // Document、 Window etc.
    
    // 分析对应的数据结构
    const coursesList = Array.from(
      document.querySelectorAll('.j-hotlist .item')
    )
    // 获取相应元素内部子元素的innerText
    const getText = (e, selector) => {
      return e.querySelector(selector) && e.querySelector(selector).innerText
    }
    // 组合数据
    const data = coursesList.map(e => {
      const obj = {
        num: getText(e, '.icon'),
        text: getText(e, 'span'),
      }
      return obj
    })
    // 返回
    return data
  })
  console.log(courses)
  // 拿到数据以后插入数据库
  await courses.map(async item => {
    const cV = JSON.stringify(item)
    // 调用service的添加
    const res = await ReptileService.add({
      url,
      contentValue: cV,
      type: 1000, // 代表是内容
    }, true)
    if (res) {
      console.log(`调用ReptileService添加对象成功,对象值为:${cV}`)
    } else {
      console.log(`调用ReptileService添加对象失败,原因为:${res}`)
    }
  })
  await page.close()
  await browser.close()
  app()
})();