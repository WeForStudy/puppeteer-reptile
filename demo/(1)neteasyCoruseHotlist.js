const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://open.163.com/");
  const res = await page.evaluate(() => {
    const getText = (e, selector) => {
      return e.querySelector(selector) && e.querySelector(selector).innerText
    }
    const coursesList = Array.from(
      document.querySelectorAll('.j-hotlist .item')
    )
    const data = coursesList.map(e => {
      const obj = {
        num: getText(e, '.icon'),
        text: getText(e, 'span'),
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