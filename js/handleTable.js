const tableTab = document.getElementById("deptTab");
const bubbleTab = document.getElementById("allTab");
const table = document.getElementById("barChart");
const bubbleChart = document.getElementById("allDeptsChart");


tableTab.onclick = function() {
    if (tableTab.classList.contains("unselected")) {
        tableTab.classList.remove("unselected");
        tableTab.classList.add("selected");
        bubbleTab.classList.add("unselected");

        bubbleChart.style.display = "none";
        table.style.display = "block";
    }
};

bubbleTab.onclick = function() {
    if (bubbleTab.classList.contains("unselected")) {
        bubbleTab.classList.remove("unselected");
        bubbleTab.classList.add("selected");
        tableTab.classList.add("unselected");

        table.style.display = "none";
        bubbleChart.style.display = "block";
    }
};