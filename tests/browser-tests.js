const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
require('chromedriver')
const IP_ADDRESS = "localhost";


describe('Browser tests', () => {
    const driver = new Builder().forBrowser('chrome').build();

    it('should perform a search by band name', async () => {
        await driver.get(`http://${IP_ADDRESS}:3000/`);
        //await driver.sleep(2000);
        await driver.findElement(By.id('bandName')).sendKeys('metall', Key.ENTER);
        const title = await driver.getTitle();

        expect(title).to.equal('Searching albums');
    });

    it('should perform a search by album name', async () => {
        await driver.get(`http://${IP_ADDRESS}:3000/`);
        //await driver.sleep(2000);
        await driver.findElement(By.id('albumName')).sendKeys('kill', Key.ENTER);
        const title = await driver.getTitle();

        expect(title).to.equal('Searching albums');
    });

    after(async () => driver.quit());
});
