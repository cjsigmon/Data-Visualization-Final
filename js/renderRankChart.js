const genderBreakdown = document.getElementById("genderBreakdown");
const maleRow = document.getElementById("maleRow");
const femaleRow = document.getElementById("femaleRow");
const unknownRow = document.getElementById("unknownRow");
const titleRow = document.getElementById("titleRow");


const iconHtml = `<i class="fa-solid fa-person"></i>`;
const icons = {
    "female": `<i class="fa-solid fa-person woman-prof"></i>`,
    "male": `<i class="fa-solid fa-person man-prof"></i>`,
    "unknown": `<i class="fa-solid fa-person unknown-prof"></i>`
};

function recreateRankChart(womenPositions, menPositions, unknownPositions, overallPositions) {
    let titleSet = new Set();
    cutSectionsForTitles(overallPositions, titleSet)
    
    // chartForGender(womenPositions, titleSet);
    // chartForGender(menPositions, titleSet);
    // chartForGender(unknownPositions, titleSet);
   
}


function cutSectionsForTitles(overallPositions, titleSet) {
    overallPositions.forEach((r) => {
        const title = r["primary_working_title"];
        const underscoresTitle = title.split(' ').join('_');

        if (!titleSet.has(title)) {
            titleSet.add(title);
            // add section to title row
            const header = document.createElement("td");
            header.innerText = title;
            titleRow.append(header);
            // add section to women
            const femaleSection = document.createElement("td");
            femaleSection.id = `${underscoresTitle}-female`;
            femaleRow.append(femaleSection);
            // add section to men
            const maleSection = document.createElement("td");
            maleSection.id = `${underscoresTitle}-male`;
            maleRow.append(maleSection);
            // add section to unknown
            const unknownSection = document.createElement("td");
            unknownSection.id = `${underscoresTitle}-unknown`;
            unknownRow.append(unknownSection);
        }
        const cellToUpdate = document.getElementById(`${underscoresTitle}-${r['likely_gender']}`);
        cellToUpdate.innerHTML+= icons[r["likely_gender"]];

    });
}

// function chartForGender(genderPositions, titleSet) {
//     genderPositions.forEach((r) => {
//         const title = r["primary_working_title"];
//         let underscoresTitle = title.split(' ').join('_');

//         if (!titleSet.has(title)) {
//             titleSet.add(title);
//             const newTitleDiv = document.createElement("div");
//             newTitleDiv.innerText = title;
//             newTitleDiv.id = underscoresTitle;
//             newTitleDiv.style.maxWidth = '140px';

//             const genderSection = document.createElement("div");
//             genderSection.classList.add(r["likely_gender"]);
//             genderSection.innerHTML+= icons[r["likely_gender"]];
            
//             genderSection.id = `${underscoresTitle}-${r['likely_gender']}`;
            
//             newTitleDiv.append(genderSection);
//             genderBreakdown.append(newTitleDiv);

//         } else {
//             const oldTitleDiv = document.getElementById(underscoresTitle);
//             let tryGetGenderSection = document.getElementById(`${underscoresTitle}-${r['likely_gender']}`)
//             if (!tryGetGenderSection) {
//                 const genderSection = document.createElement("div");
//                 genderSection.classList.add(r["likely_gender"]);
//                 genderSection.innerHTML+= icons[r["likely_gender"]];
                
//                 genderSection.id = `${underscoresTitle}-${r['likely_gender']}`;
                
//                 oldTitleDiv.append(genderSection);
//                 genderBreakdown.append(oldTitleDiv);
//             } else {
//                 const genderSection = tryGetGenderSection;
//                 genderSection.innerHTML+= icons[r["likely_gender"]];
//             }
            
//         }
//     })
// }