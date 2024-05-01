const allChoice = document.getElementById("allChoice");
const tenureChoice = document.getElementById("tenureChoice");
const nonTenureChoice = document.getElementById("nonTenureChoice");
let barChartCheckboxContainer = document.getElementById("barChartCheckboxContainer");

tenureChoice.addEventListener("click", () => {
    filterRanks = true;
    tenureTrack = true;

    recreateChart(selectedDept);
    recreateCircleChart(selectedDept);
});

nonTenureChoice.addEventListener("click", () => {
    filterRanks = true;
    tenureTrack = false;
    recreateChart(selectedDept);
    recreateCircleChart(selectedDept);
});
allChoice.addEventListener("click", () => {
    filterRanks = false;
    tenureTrack = false;
    recreateChart(selectedDept);
    recreateCircleChart(selectedDept);
});