const webdriver = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const fs = require("fs");
const path = require("path");
const http = require("http");
const { xPathSignUpSearch, fielfChecks, fieldRef } = require("./initData");

function redLog(err) {
    console.log(`\x1b[31m${err}\x1b[0m`);
}

const options = new firefox.Options(); // .setBinary(firefox.Channel.NIGHTLY);
options.headless();

const delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const seleniumTests = {
    signUpRoute: async (driver, webdriver, errors) => {
        try {
            await driver.get("http://localhost:3000/");
            const src = await driver.getPageSource();
            try {
                const link = await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath(xPathSignUpSearch)), 5000);
                link.click();
            } catch (e) {
                throw Error("NO VALID \"SIGN UP\" LINK OR BUTTON");
            }

            const url = await driver.getCurrentUrl();
            if (url !== "http://localhost:3000/sign-up") {
                throw Error("NO ROUTING TO http://localhost:3000/sign-up");
            }
        } catch (err) {
            errors.push(err.message);
            return { errors }; // errors.push('test.errors.reactDev.navigation.noLinkViewCatalog');
            // Должна отрендериться ссылка на /list с текстом View catalog
        }
    },
    checkRef: async (driver, webdriver, errors) => {
        try {
            await driver.get("http://localhost:3000/");
            await driver.getPageSource();
            const signUpButton = await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath(xPathSignUpSearch)), 5000);
            signUpButton.click();

            for (const key in fieldRef) {
                try{
                    const field = await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath(`.//input[@name='${key}']`)), 5000);
                    field.sendKeys(fieldRef[key]);
                }
                catch (err) {
                    throw Error(`NO ${key} FIELD`);
                }
            }

            try {
                const link = await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath(xPathSignUpSearch)), 5000);
                link.click();
            } catch (e) {
                throw Error("NO VALID \"SIGN UP\" LINK OR BUTTON");
            }
            await delay(3000)

            try {
                const url = await driver.getCurrentUrl();
                if (url === "http://localhost:3000/sign-up")
                    throw new Error();
            }
            catch(err) {
                throw Error("REGISTRATION FAILED. NO ROUTING FROM http://localhost:3000/sign-up");
            }

//            const encodedString = await driver.takeScreenshot();
//            await fs.writeFileSync("./image.png", encodedString, "base64");

        } catch (err) {
            errors.push(err.message);
            return { errors };
        }
    },
};

async function test() {
    const errors = [];
    let driver = null;
    try {
        driver = new webdriver.Builder()
            .forBrowser("firefox")
            .setFirefoxOptions(options)
            .build();
        for (const key in seleniumTests) {
            if (await seleniumTests[key](driver, webdriver, errors)) {
                break;
            }
        }
    } catch (err) {
        console.log(err);
    } finally {
        await driver.quit();
    }

    if (errors.length) { redLog(errors); }
    process.exit(errors.length);
}
test().catch((err) => ({
    errors: ["trainer.testSyntaxError"],
}));
