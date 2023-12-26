const cheerio = require('cheerio');

const getProblemLinks = async (html, studyPlan, probTitleMap) => {
    const $ = cheerio.load(html);
    let problemTitles = $('.text-lc-text-primary>.truncate');
    for(let i=0;i<problemTitles.length;i++)
    {
        const title = $(problemTitles[i]).text().trim(); 
        if(title in probTitleMap)
        {
            probTitleMap[title].studyPlans.push(studyPlan);
        }
        else
        {
            let problink = `https://leetcode.com/problems/${title.toLowerCase().split(" ").join("-")}/description/`;
            probTitleMap[title] = {studyPlans: [studyPlan], title: title, url: problink};
        }
    }

} 

module.exports = getProblemLinks;