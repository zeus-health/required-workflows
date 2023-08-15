#!/bin/bash

echo "### START required-workflows/cost_allocation_tags"

npm install --quiet

pwd

ls -lsah

ls -lsah ..

# Second exlclusion is from the workflow and checks code out.
find ../.. -type f -not -path '*/.*' -not -path './required-workflows/*' -name '*.tf' -print0 > TF_FILES.tmp

cat TF_FILES.tmp