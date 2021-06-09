
const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
let options = new firefox.Options().setBinary(firefox.Channel.NIGHTLY);


const fs = require('fs');
const path = require('path');
const http = require('http');
//

function redLog (err) {
	console.log('\x1b[31m' + err + '\x1b[0m')
}

const seleniumTests = {
    viewCatalog: async (driver, webdriver, errors) => {
        try {
            await driver.get('http://localhost:3000/');
            const src = await driver.getPageSource();
            if (!src.includes('root')) {
                throw new Error();
            }
			 const link = await driver.wait(webdriver.until.elementLocated(webdriver.By.css("a[href = '/list']")), 5000);
          const link_text = await link.getText();
          if (link_text !== 'View catalog') {
            throw new Error();
          }

        } catch (e) {
//			errors.push(e.toString())
            errors.push('test.errors.reactDev.navigation.noLinkViewCatalog'); //Должна отрендериться ссылка на /list с текстом View catalog
        }
    },
      routing: async (driver, webdriver, errors) => {
        try {
            await driver.get('http://localhost:3000/');
            const src = await driver.getPageSource();
            if (!src.includes('root')) {
                throw new Error();
            }
			 const link = await driver.wait(webdriver.until.elementLocated(webdriver.By.css("a[href = '/list']")), 5000);
          link.click()
          await driver.manage().setTimeouts({ implicit: 2000 });
                    const loc = await driver.executeScript('return location');
           if (loc.pathname.toString() !== '/list') {
                throw new Error(loc.pathname.toString());
           }
           const title = await driver.wait(webdriver.until.elementLocated(webdriver.By.css(".country_info__2asaU")), 5000);
          const title_text = await title.getText();
          if (title_text !== 'Algeria') {
            throw new Error();
            }
        } catch (e) {
            errors.push('test.errors.reactDev.navigation.wrongRouting'); //При клике на ссылку, адрес страницы должен превратиться в http://localhost/list
        }
    }
};

async function test() {
    const errors = [];
    let driver = null;
    try {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
			.setFirefoxOptions(options)
            .build();
        for (let key in seleniumTests) {
		console.log(1)
            await seleniumTests[key](driver, webdriver, errors);
		console.log(2)
        }
    } catch (err) { }
	console.log(5)
//    try {
  //      await driver.quit();
    //} catch (err) { }
    if (errors.length)
        redLog(errors)
    process.exit(errors.length)
}

return test().catch((err) => {
    return {
      errors: ["---------"+err.toString()]
  //      errors: ['trainer.testSyntaxError']
    };
}
);

