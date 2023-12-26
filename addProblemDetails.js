const cheerio = require('cheerio');

const addProblemDetails = async (html, title, probTitleMap) => {
    try {
        const $ = cheerio.load(html);
        const difficulty = $('.capitalize').text();
        const topicDivs = $('.gap-y-3>a');
        let relatedTopics = [];
        for (let i = 0; i < topicDivs.length; i++) {
            relatedTopics.push($(topicDivs[i]).text());
        }
        console.log(difficulty, relatedTopics);
        probTitleMap[title].difficulty = difficulty;
        probTitleMap[title].relatedTopics = relatedTopics;
    }
    catch (e) {
        console.log('Error:', e);
    }
};


module.exports = addProblemDetails;