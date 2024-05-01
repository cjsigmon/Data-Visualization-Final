const allChoice = document.getElementById("allChoice");
const tenureChoice = document.getElementById("tenureChoice");
const nonTenureChoice = document.getElementById("nonTenureChoice");
let barChartCheckboxContainer = document.getElementById("barChartCheckboxContainer");

tenureChoice.addEventListener("click", () => {
    console.log("clicky", overallPositions)
    console.log(selectedDept)
    recreateChart(selectedDept, true, true);
    recreateCircleChart(selectedDept, true, true);
});

nonTenureChoice.addEventListener("click", () => {
    console.log("clicky", overallPositions)
    console.log(selectedDept)
    recreateChart(selectedDept, true, false);
    recreateCircleChart(selectedDept, true, true);
});

tenureChoice.addEventListener("click", () => {
    console.log("clicky", overallPositions)
    console.log(selectedDept)
    recreateChart(selectedDept, false);
    recreateCircleChart(selectedDept, false);
});