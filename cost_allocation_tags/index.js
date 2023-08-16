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
   if (terraformFileObject.provider === undefined) {
      continue;
   }

   // Iterate over provider names
   for (var provider_name in terraformFileObject.provider) {

      if (terraformFileObject.hasOwnProperty(provider_name)) { continue; }

      // Iterate over same-named providers
      for (const provider_instance of terraformFileObject.provider[provider_name]) {

         if (provider_instance.default_tags === undefined) {
            caughtTagOmissions.push(`${tform_file}: provider.${provider_name} missing default_tags`);
            continue;
         }

         // String comparison for specific tags existence
         var stringifiedTagsObject = JSON.stringify(provider_instance.default_tags[0].tags);
         if (!stringifiedTagsObject.includes("zus:cost-allocation:ApplicationId")) {
            caughtTagOmissions.push(`${tform_file}: provider.${provider_name}.default_tags missing zus:cost-allocation:ApplicationId`);
         }
         if (!stringifiedTagsObject.includes("zus:cost-allocation:Environment")) {
            caughtTagOmissions.push(`${tform_file}: provider.${provider_name}.default_tags missing zus:cost-allocation:Environment`);
         }
      }
   }
}

if (caughtTagOmissions.length > 0) {
   console.error(caughtTagOmissions);
   console.error("... please remediate the terraform providers per https://zeushealth.atlassian.net/wiki/spaces/SI/pages/1577287692/Resource+Tagging");
   process.exit(1);
}