const jsonrawtoxlsx = require('jsonrawtoxlsx');
const fs = require('fs');

const jsonData = fs.readFileSync('./problem.json');
const jsonArr = JSON.parse(jsonData).map((val) => {
    let obj = {};
    obj.SNo = val.sNo;
    obj.StudyPlans = val.studyPlans.join(' , ');
    obj.Title = val.title;
    obj.Link = val.url;
    obj.Difficulty = val.difficulty;
    obj.Topics = val.relatedTopics.join(' , ');
    return obj;
});



const buffer = jsonrawtoxlsx(jsonArr);

fs.writeFileSync('studyPlan.xlsx', buffer, 'binary');