const genderBreakdown = document.getElementById("genderBreakdown");

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
            genderSection.innerText = `${underscoresTitle}-${r['likely_gender']}`;
            genderSection.id = `${underscoresTitle}-${r['likely_gender']}`;
            
            newTitleDiv.append(genderSection);
            genderBreakdown.append(newTitleDiv);

        }
    })
}