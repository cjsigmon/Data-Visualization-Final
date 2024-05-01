
const allDeptsctx = document.getElementById('allDeptsGraph');
let disparitySals = [];

let allDeptsChart;
let allDeptNames = new Set();
let groupedByDept = {};
let groupedByDeptArr = [];



async function init() {
    disparitySals = [];
    allProfsData = await fetch("../data/profs.json").then((response) => {
        return response.json();
    });
    allProfsData.forEach((r) => {
            if (!allDeptNames.has(r["Department"])) {
                allDeptNames.add(r["Department"]);
                groupedByDept[r["Department"]] = {
                    "name": r["Department"],
                    "male": [],
                    "female": [],
                    "unknown": [],
                    "female, male": [],
                    "disparity": 0
                };
                groupedByDeptArr.push(groupedByDept[r["Department"]]);
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

    groupedByDeptArr = groupedByDeptArr.filter((dept) => {
        return dept["male"].length > 0 && dept["female"].length > 0;
    })

    groupedByDeptArr.sort((a, b) => {
        return b["disparity"] - a["disparity"];
    });

    const vals = groupedByDeptArr.map((dept) => dept["disparity"]);
    const labels = groupedByDeptArr.map((dept) => dept["name"]);

    makeAllDeptsGraph(vals, labels);
}

init();










function makeAllDeptsGraph(vals, labels) {
    if (allDeptsChart) allDeptsChart.destroy();
    console.log(vals)
    let max = Math.max(...vals);
    let min = Math.min(...vals)
    console.log(max, min);

    allDeptsChart = new Chart(allDeptsctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Difference of Avg Men and Women Salaries',
                data: vals,
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        min: -130232,
                        max: 193752
                    }
                }]
            }
        }
    });
    
     
}



