
const ctx = document.getElementById('chartGraph');
let allProfsData;
let myChart;

let menSals = [];
let womenSals = [];
let unknownSals = [];
let overallSals = [];

let salsData = [];


async function init() {
    allProfsData = await fetch("../data/profs.json").then((response) => {
        return response.json();
    });

    recreateChart("Medicine");

}

init();


function recreateChart(filterDept) {
    console.log("recreating chart for dept: ", filterDept)

    menSals = [];
    womenSals = [];
    unknownSals = [];
    overallSals = [];
    salsData = [];
    console.log(typeof allProfsData)

    let data = allProfsData.filter((r) => {
       return r["Department"] == filterDept}
    );
    divideSals(data);
    makeGraph(salsData, filterDept);
}



function average(arr) {
    let sum = 0;
    let len = arr.length;
    arr.forEach((v) => {
        sum += v;
    });
    return sum/len;
}

function divideSals(data) {
    data.forEach((r) => {
        switch(r["likely_gender"]) {
            case "male":
                menSals.push(r["employee_annual_base_salary"]);
                break;
            case "female":
                womenSals.push(r["employee_annual_base_salary"]);
                break;
            case "unknown":
                unknownSals.push(r["employee_annual_base_salary"]);
                break;
        }
        overallSals.push(r["employee_annual_base_salary"]);
    });
    salsData.push(average(overallSals), average(womenSals), average(menSals), average(unknownSals));
}


function makeGraph(data, filterDept) {
    console.log("new data?", data)
    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Overall', 'Women', 'Men', 'Unable to predict'],
          datasets: [{
            label: 'Annual Base Salary',
            data: data,
            backgroundColor: [
                'rgba(255, 159, 64, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(201, 203, 207, 0.7)'
              ],
            borderWidth: 1
          }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            },
            x: {
                beginAtZero: true
            }
          },
          responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: `Annual Base Salary - ${filterDept} Department`
          }
        }
      }
    });
    
}

