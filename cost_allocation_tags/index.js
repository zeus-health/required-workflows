const fs = require('fs');
const readlineSync = require('readline-sync');
const hcl = require("hcl2-parser")


console.log("### START - cost_allocation_tags/index.js");

var caughtTagOmissions = [];

const filePath = 'TF_FILES.tmp';

const fileContent = fs.readFileSync(filePath, 'utf-8');
const terraformFilesFullPath = fileContent.split('\n');

for (const terraformFilePath of terraformFilesFullPath) {

   if (terraformFilePath.length < 1) { continue; } // catch final line break

   console.log(`Files: ${terraformFilePath}`);

   var buffer = fs.readFileSync(terraformFilePath);

   objectResult = hcl.parseToObject(buffer.toString())
   terraformFileObject = objectResult[0]; // for some reason it's always arrayed at index 0

   // Skip if there is no 'provider' resource
   if (terraformFileObject.provider === undefined || terraformFileObject.provider.aws === undefined) {
      continue;
   }

   // Iterate over providers "aws"
   for (const provider_instance of terraformFileObject.provider.aws) {

      if (provider_instance.default_tags === undefined) {
         caughtTagOmissions.push(`${terraformFilePath}: provider.aws missing default_tags`);
         continue;
      }

      // String comparison for specific tags existence
      var stringifiedTagsObject = JSON.stringify(provider_instance.default_tags[0].tags);
      if (!stringifiedTagsObject.includes("zus:cost-allocation:ApplicationId")) {
         caughtTagOmissions.push(`${terraformFilePath}: provider.aws.default_tags missing zus:cost-allocation:ApplicationId`);
      }
      if (!stringifiedTagsObject.includes("zus:cost-allocation:Environment")) {
         caughtTagOmissions.push(`${terraformFilePath}: provider.aws.default_tags missing zus:cost-allocation:Environment`);
      }
   }

}

if (caughtTagOmissions.length > 0) {
   console.error(caughtTagOmissions);
   console.error("... please remediate the terraform providers per https://zeushealth.atlassian.net/wiki/spaces/SI/pages/1577287692/Resource+Tagging");

   var file = fs.createWriteStream('TF_TAGGING_FINDS.tmp');
   file.on('error', function(err) { /* error handling */ });
   caughtTagOmissions.forEach(function(v) { file.write(v + '\n'); });
   file.end();
   // process.exit(1); // to be flipped, and Actions step "name: Comment to PR if findings exist" to be removed
}