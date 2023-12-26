const fs = require('fs');
const { title } = require('process');
const ques = fs.readFileSync('./problem.json');
const arr = JSON.parse(ques);
console.log(arr);

for(let ele of arr)
{
    if(ele.difficulty === "")
    {
        console.log(ele);
    }
}