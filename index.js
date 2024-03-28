import { appendFile, readFile, writeFile } from "fs";
// import COUNTIES from "./counties.js";
// import { SUBCOUNTIES } from "./subCounties.js";
// import { WARDS } from "./wards.js";

// const counties = COUNTIES();
// const subCounties = SUBCOUNTIES;
// const wards = WARDS;

import { formatedCounties } from "./new/counties.js";
import { formatedSubCounties } from "./new/subCounties.js";
import { formatedWards } from "./new/wards.js";


// function bindCountyAndSubCounty(counties, subcounties) {
//     let data = [];
//     for (const county of counties) {
//         const subcountiesForCounty = subcounties.filter(subcounty => subcounty.countyId === county.countyId);
//         data.push({ ...county, subcounties: subcountiesForCounty });
//     }

//     console.log(data);
//     writeToFIle(`export const county_subcounty = ${JSON.stringify(data)}`, "./new/county_subcounty.js");
// }

function bindCountyAndSubCounty(counties, subcounties, wards) {
    let data = [];
    for (const county of counties) {
        const subcountiesForCounty = subcounties.filter(subcounty => subcounty.countyId === county.countyId);
        for (const subcounty of subcountiesForCounty) {
            const wardsForSubcounty = wards.filter(ward => ward.subCountyId === subcounty._id);
            subcounty.wards = wardsForSubcounty;
        }
        data.push({ ...county, subcounties: subcountiesForCounty });
    }

    console.log(data);
    writeToFIle(`export const county_subcounty = ${JSON.stringify(data)}`, "./new/county_subcounty_ward.js");
}



bindCountyAndSubCounty(formatedCounties, formatedSubCounties, formatedWards);











// ================================================================
function writeToFIle(data, file) {
    try {
        writeFile(file, data, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    } catch (error) {
        console.log(error);
    }
} // usage writeToFIle(counties, "newCounties.js")

async function readFromFIle(filePath) {
    if (typeof filePath != "string") {
        throw new Error("File path must be a string")
    }

    try {

        return new Promise((resolve, reject) => {
            readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    } catch (error) {
        console.log(error);
    }
} // console.log(await readFromFIle("counties.js"))



function appendToFile(file, data) {
    try {
        appendFile(file, data, (err) => {
            if (err) throw err;
            console.log("Append successful");
        });
    } catch (error) {
        console.log(error);
    }
}


function generateData(data, filePath) {
    writeToFIle(`export default formatedCounties = ${JSON.stringify(data)}`, filePath);
}

function formatCounties(counties) {
    const newData = counties.map(({ _id, countyId, countyName }) => {
        return {
            countyId: _id, countyNo: countyId, countyName
        }
    });
    console.log(newData);
}

function formatSubcounties(sc) {
    const newData = sc.map(({ _id, countyId, subCountyName, }) => {
        return {
            _id, countyId, name: capitalizeFirstChar(subCountyName.trim()),
        }
    });
    console.log(newData);
    writeToFIle(`export default formatedSubCounties = ${JSON.stringify(newData)}`, "./new/subCounties.js");
}
function formatWards(ward) {
    const newData = ward.map(({ _id, ward, subCountyId, }) => {
        return {
            _id, subCountyId, name: capitalizeFirstChar(ward.trim()),
        }
    });
    console.log(newData);
    writeToFIle(`export default formatedWards = ${JSON.stringify(newData)}`, "./new/wards.js");
}

function capitalizeFirstChar(string) {
    if (typeof string !== "string" || string.length === 0) {
        throw new Error("Input must be a non-empty string");
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

