const puppeteer = require('puppeteer');
const fs = require('fs');
const cheerio = require('cheerio');

let url = 'https://leetcode.com/problems/valid-sudoku/description/';
const main = async () => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const html = await page.content();
    await browser.close();
    fs.writeFileSync('./index.html', html);

    const $ = cheerio.load(html);
    const difficulty = $('.capitalize').text();
    console.log(difficulty);

    const relatedTopics = $('.gap-y-3>a');
    let topics = [];
    for(let i=0;i<relatedTopics.length;i++)
    {
        topics.push($(relatedTopics[i]).text());
    }
    console.log(topics);
}

main();