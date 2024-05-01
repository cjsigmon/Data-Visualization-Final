const cirCtx = document.getElementById('circleGraph');
let circleChart;

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


function recreateCircleChart(filterDept, filterRanks, tenureTrack) {
    menPositions = [];
    womenPositions = [];
    unknownPositions = [];
    overallPositions = [];
    
    postionsData = [];

    let data = allProfsData.filter((r) => {
       return r["Department"] == filterDept}
    );
    if (filterRanks) {
      if (tenureTrack) {
        data = data.filter((r) => {
          let title = r["primary_working_title"];
          let positionShouldBeFiltered = false;
          nonTenureModifiers.forEach((modifier) => {
            if (title.includes(modifier)) {
              positionShouldBeFiltered = true;
            }
          })
          return positionShouldBeFiltered;
        })
      } else {

      }
    }


    dividePositions(data);
    makeCircle(postionsData);

    recreateRankChart(womenPositions, menPositions, unknownPositions, overallPositions)
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

