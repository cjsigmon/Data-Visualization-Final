const tableTab = document.getElementById("tableTab");
const bubbleTab = document.getElementById("bubbleTab");
const table = document.getElementById("table");
const bubbleChart = document.getElementById("bubbleChart");


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