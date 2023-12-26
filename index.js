const puppeteer = require('puppeteer');
const fs = require('fs');
const getProblemLinks = require('./getProblemLinks');
const addProblemDetails = require('./addProblemDetails');

const URLs = [
    {url: 'https://leetcode.com/studyplan/top-interview-150/', studyPlan: 'Top Interview 150'},
    {url: 'https://leetcode.com/studyplan/leetcode-75/', studyPlan: 'Leetcode 75'},
    {url: 'https://leetcode.com/studyplan/top-100-liked/', studyPlan: 'Top 100 Liked'}
];

const main = async () => {
    try {
        let probTitleMap = new Map();
        const browser = await puppeteer.launch({ headless: 'new' });
        for (let url of URLs) {
            const page = await browser.newPage();
            await page.goto(url.url);
            await page.waitForSelector('.text-lc-text-primary>.truncate');
            const html = await page.content();
            await getProblemLinks(html, url.studyPlan, probTitleMap);
        }
        let probCounts = 0; 
        for(let key in probTitleMap)
        {
            probCounts++;
            // if(probCounts < 219)
            //     continue;
            
            probTitleMap[key].sNo = probCounts;
            const page = await browser.newPage();
            await page.goto(probTitleMap[key].url, {waitUntil: 'domcontentloaded'});
            // console.log(probTitleMap[key].url);
            const html = await page.content();
            await addProblemDetails(html, probTitleMap[key].title , probTitleMap);
            // fs.appendFileSync('./problem.json', JSON.stringify(probTitleMap[key]));
            console.log(key," => ",probTitleMap[key]);
        }
        await browser.close();
        console.log('Total number of problems: ', probCounts);
    }
    catch (e) {
        console.log('Error:', e);
    }
};

main();
