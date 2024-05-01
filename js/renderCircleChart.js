
const cirCtx = document.getElementById('circleGraph');

let circleChart;

let menPositions = [];
let womenPositions = [];
let unknownPositions = [];
let overallPositions = [];

let postionsData = [];


async function init() {
    if (!allProfsData) {
        allProfsData = await fetch("../data/profs.json").then((response) => {
            return response.json();
        });
    }


    recreateCircleChart("Medicine");
}

init();


function recreateCircleChart(filterDept) {
    console.log("recreating circle for dept: ", filterDept)

    menPositions = [];
    womenPositions = [];
    unknownPositions = [];
    overallPositions = [];
    
    postionsData = [];

    let data = allProfsData.filter((r) => {
       return r["Department"] == filterDept}
    );
    dividePositions(data);
    makeCircle(postionsData);

    recreateRankChart(womenPositions, menPositions, unknownPositions)
}


function dividePositions(data) {
    data.forEach((r) => {
        switch(r["likely_gender"]) {
            case "male":
                menPositions.push(r)
                break;
            case "female":
                womenPositions.push(r);
                break;
            case "unknown":
                unknownPositions.push(r);
                break;
        }
        overallPositions.push(r);
    });
    postionsData.push(womenPositions.length, menPositions.length, unknownPositions.length);
}


function makeCircle(data) {
    console.log("here", data)
    if (circleChart) circleChart.destroy();
    circleChart = new Chart(cirCtx, {
        type: 'doughnut',
        data: {
            labels: ['Predicted as women', 'Predicted as men', 'Unable to predict'],
            datasets: [
              {
                data: data,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(201, 203, 207, 0.7)'
                  ],
              }
            ]
          },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Predicted Gender Breakup'
            }
          }
        },
      }
    );
    
}

