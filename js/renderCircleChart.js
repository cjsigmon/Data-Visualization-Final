const cirCtx = document.getElementById('circleGraph');
let circleChart;

let postionsData = [];


async function init() {
    if (!allProfsData) {
        allProfsData = await fetch("./data/profs.json").then((response) => {
            return response.json();
        });
    }


    recreateCircleChart("ASOD");
}

init();


function recreateCircleChart(filterDept) {
    menPositions = [];
    womenPositions = [];
    unknownPositions = [];
    overallPositions = [];
    
    postionsData = [];

    let data = allProfsData.filter((r) => {
       return r["Department"] == filterDept}
    );

    if (filterRanks) {
      if (!tenureTrack) {
        data = data.filter((r) => {
          let positionShouldBeIncluded = false;
          let title = r["primary_working_title"];
          nonTenureModifiers.forEach((modifier) => {
            if (title.includes(modifier)) {
              positionShouldBeIncluded = true;
            }
          })
          return positionShouldBeIncluded;
        });
      } else {
        data = data.filter((r) => {
          let positionShouldBeIncluded = true;
          let title = r["primary_working_title"];
          nonTenureModifiers.forEach((modifier) => {
            if (title.includes(modifier)) {
              positionShouldBeIncluded = false;
            }
          })
          return positionShouldBeIncluded;
        });
      }
    }


    dividePositions(data);
    console.log("current", data);
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
                    'rgba(255, 168, 0, 1.0)',
                    'rgba(20, 255, 0, 1.0)',
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

