const tableCollection = document.getElementById("tableCollection");
const tablePageBtns = document.getElementById("tablePageBtns");

function renderTable(data) {
    let tableElem = document.createElement("table");
    tableElem.id = "table1";
    tableElem.classList.add("d-table");
    tableCollection.append(tableElem);
    let tableNum = 1;
    tableBtn(tableNum);


    let currentHeight = 0;
    const rowHeight = 20;
    const maxHeight = table.clientHeight - ((3*rowHeight));

    
    data.forEach((row) => {
        if (currentHeight > (maxHeight)) {
            tableNum++;


            tableElem = document.createElement("table");
            tableElem.id = `table${tableNum}`
            tableCollection.append(tableElem);
            currentHeight = 0;

            tableBtn(tableNum);
        }


        const tr = document.createElement("tr");
        tr.style.height = `${rowHeight}px`;
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");

        td1.innerText = row["Department"];
        td2.innerText = row["n"];
        const graphBtn = document.createElement("button");
        graphBtn.innerText = "Graph";
        graphBtn.onclick = () => {
            recreateChart(td1.innerText);
            recreateCircleChart(td1.innerText);
            selectedDept = td1.innerText;
        };
        td3.append(graphBtn);

        
        tr.append(td1, td2, td3);

        tableElem.append(tr);

        currentHeight+= rowHeight;
    });
}

function tableBtn(tableNum) {
    const tableAppearBtn = document.createElement("button");
    tableAppearBtn.innerText = tableNum;
    if (tableNum === 1) tableAppearBtn.id = "activeBtn";
    tablePageBtns.append(tableAppearBtn);
    tableAppearBtn.onclick = function() {
        let shown = document.getElementsByClassName("d-table");
        for (let i = 0; i < shown.length; i++) shown[i].classList.remove("d-table");
        let activeBtn = document.getElementById("activeBtn");
        if (activeBtn) activeBtn.id = "";
        tableAppearBtn.id = "activeBtn";
        document.getElementById(`table${parseInt(tableAppearBtn.innerText)}`).classList.add("d-table");
    };
}


fetch("./data/depts_by_n.json").then((response) => {
    return response.json();
}).then((data) => {
    renderTable(data)
});
