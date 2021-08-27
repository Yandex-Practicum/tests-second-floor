const puppeteer = require('puppeteer'); 
const { xPathSearch, fielfChecks, fieldRef } = require("./initData");

//console.log(fieldRef)

async function errorReturn(err, browser) {
    console.log(`\x1b[31m${err}\x1b[0m`);
    await browser.close();
    process.exit(1);
}

async function puppeteerTests () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    try {
        await page.waitForXPath(xPathSearch.noAccount, {timeout: 2000}) // ищем кнопку на ./sign-up
            .then(async (signUpLink) => {
                await signUpLink.click(); //кликаем
                try {
                    await page.waitForXPath(xPathSearch.signUp, {timeout: 2000}); // ищем кнопку на ./
                }
                catch(err){
                    await errorReturn("NO VALID \"SIGN UP\" LINK OR BUTTON", browser);
                }
            })
    }
    catch(err){
        await errorReturn("NO VALID \"SIGN UP\" LINK OR BUTTON", browser);
    }

    if ((await page.url()) !== "http://localhost:3000/sign-up") { 
        errorReturn("NO ROUTING TO http://localhost:3000/sign-up", browser);
    }

    for (const key in fieldRef) {
        try {
            const field = await page.waitForXPath(`.//input[@name='${key}']`, {timeout: 2000});
            await page.evaluate((element, value) => element.value = value, field, fieldRef[key])
        }
        catch(error) {
            //console.log(error);
        }
    }
    await page.screenshot({
        path: "./screenshot.jpg",
        type: "jpeg",
        fullPage: true
      });
      // await page.reload();

    try {
        await page.waitForXPath(xPathSearch.signUp, {timeout: 2000}) // ищем кнопку на ./sign-up
            .then(async (signUpLink) => {
                await signUpLink.click(); //кликаем
            })
    } catch (error) {
        //console.log(error)
        await errorReturn("NO VALID \"SIGN UP\" LINK OR BUTTON", browser);
    }

    try {
        if ((await page.url()) === "http://localhost:3000/sign-up") { 
            throw new Error();
        }
    }
    catch(error) {
        await errorReturn("REGISTRATION FAILED. NO ROUTING FROM http://localhost:3000/sign-up", browser);
    }
        await browser.close();
        process.exit(0);
}

puppeteerTests();
