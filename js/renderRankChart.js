const genderBreakdown = document.getElementById("genderBreakdown");
const maleRow = document.getElementById("maleRow");
const femaleRow = document.getElementById("femaleRow");
const unknownRow = document.getElementById("unknownRow");
const titleRow = document.getElementById("titleRow");


const iconHtml = `<i class="fa-solid fa-person"></i>`;


function createIcon(gender, iconSize) {
    return () => {
        let i = document.createElement("i");
        i.className = `fa-solid fa-person ${gender}-prof`;
        i.style.fontSize = `${iconSize}pt`;
        return i;
    }
}

function recreateRankChart(womenPositions, menPositions, unknownPositions, overallPositions) {
    let titleSet = new Set();
    femaleRow.innerHTML = '';
    maleRow.innerHTML = '';
    unknownRow.innerHTML = '';
    titleRow.innerHTML = '';
    cutSectionsForTitles(overallPositions, titleSet)
    
    // chartForGender(womenPositions, titleSet);
    // chartForGender(menPositions, titleSet);
    // chartForGender(unknownPositions, titleSet);
   
}


function cutSectionsForTitles(overallPositions, titleSet) {
    let iconSize = 11;

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
        let cellToUpdate = document.getElementById(`${underscoresTitle}-${r['likely_gender']}`);
        cellToUpdate.append(createIcon(r["likely_gender"], iconSize)())
    });
}
