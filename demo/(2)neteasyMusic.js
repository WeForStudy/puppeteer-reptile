const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://music.163.com/");
  const res = await page.evaluate(() => {
    const getText = (e, selector) => {
      const ele = e.querySelector(selector)
      return ele && ele.innerText
    }
    const coursesList = Array.from(
      document.querySelectorAll('.m-cvrlst li')
    )
    const getAttr = (e, selector, attr) => {
      const ele = e.querySelector(selector)
      return ele && ele.getAttr(attr)
    }
    const getEle = (e, selector) => {
      const ele = e.querySelector(selector)
      return ele
    }
    const data = coursesList.map(e => {
      const obj = {
        title: getAttr(e, '.msk', 'title'),
        number: getText(e, '.nb'),
      }
      return obj
    })
    return {
      data,
    }
  })
  console.log(res)
  await page.close()
  browser.close()
})();