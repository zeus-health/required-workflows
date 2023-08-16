const fs = require('fs');
const readlineSync = require('readline-sync');
const hcl = require("hcl2-parser")


console.log("### START - cost_allocation_tags/index.js");


const filePath = 'TF_FILES.tmp';

const fileContent = fs.readFileSync(filePath, 'utf-8');
const terraformFilesFullPath = fileContent.split('\n');

for (const terraformFilePath of terraformFilesFullPath) {
    console.log(`Files: ${terraformFilePath}`);

   var buffer = fs.readFileSync(terraformFilePath);
   // console.log(buffer.toString());

   objectResult = hcl.parseToObject(buffer.toString())
   console.log(objectResult)  
}


// open each file witht he parser
// hcl inspect
// add it to the list
// if list.size>0, exit non-zero and print appropriately.

// TODO
// enabled the REQ_WORKFLOW_PAT across all Zus.