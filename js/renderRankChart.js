const genderBreakdown = document.getElementById("genderBreakdown");
const iconHtml = `<i class="fa-solid fa-person"></i>`;
const icons = {
    "female": `<i class="fa-solid fa-person woman-prof"></i>`,
    "male": `<i class="fa-solid fa-person man-prof"></i>`,
    "unknown": `<i class="fa-solid fa-person unknown-prof"></i>`
};

function recreateRankChart(womenPositions, menPositions, unknownPositions) {
    let titleSet = new Set();
    womenPositions.forEach((r) => {
        const title = r["primary_working_title"];
        if (!titleSet.has(title)) {
            titleSet.add(title);
            const newTitleDiv = document.createElement("div");
            newTitleDiv.innerText = title;
            newTitleDiv.id = title;
            newTitleDiv.style.maxWidth = '140px';

            const genderSection = document.createElement("div");
            genderSection.classList.add(r["likely_gender"]);
            let underscoresTitle = title.split(' ').join('_');
            genderSection.innerHTML+= icons[r["likely_gender"]];
            
            genderSection.id = `${underscoresTitle}-${r['likely_gender']}`;
            
            newTitleDiv.append(genderSection);
            genderBreakdown.append(newTitleDiv);

        }
    })
}