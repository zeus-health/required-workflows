const fs = require('fs');
const readlineSync = require('readline-sync');

const hcl = require("hcl2-parser")

console.log("### START - cost_allocation_tags/index.js");

// Accept input file,
// iterate over all files




const filePath = 'TF_FILES.tmp';

const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n');

for (const line of lines) {
    console.log(`Line: ${line}`);
}