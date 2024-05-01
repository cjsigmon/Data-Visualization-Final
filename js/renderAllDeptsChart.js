
const allDeptsctx = document.getElementById('allDeptsGraph');
let disparitySals = [];

let allDeptsChart;
let allDeptNames = new Set();
let groupedByDept = {};



async function init() {
    disparitySals = [];
    allProfsData = await fetch("../data/profs.json").then((response) => {
        return response.json();
    });
    allProfsData.forEach((r) => {
            if (!allDeptNames.has(r["Department"])) {
                allDeptNames.add(r["Department"]);
                groupedByDept[r["Department"]] = {
                    "male": [],
                    "female": [],
                    "unknown": [],
                    "female, male": [],
                    "disparity": 0
                };
            }
            let deptObj = groupedByDept[r["Department"]];

            deptObj[r["likely_gender"]].push(parseInt(r["employee_annual_base_salary"]));
    });
    
    Object.keys(groupedByDept).forEach((dept) => {
        const maleAvg = average(groupedByDept[dept]["male"]);
        const femaleAvg = average(groupedByDept[dept]["female"]);
        groupedByDept[dept]["disparity"] = maleAvg - femaleAvg;
        disparitySals.push(maleAvg - femaleAvg);
    });


    makeAllDeptsGraph(Object.keys(groupedByDept), disparitySals);
}

init();










function makeAllDeptsGraph(labels, vals) {
    if (allDeptsChart) allDeptsChart.destroy();
    console.log(vals)
    let max = Math.max(...vals);
    console.log(max)
    
     
    allDeptsctx.style.width = vals.length * 10 + "px"; // Adjust 10 as needed for spacing
}



