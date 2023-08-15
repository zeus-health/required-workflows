#!/bin/bash

echo "### Inspecting *.tf for Proviers ..."

files=$(find . -type f -not -path '*/.*' -name '*.tf' -print0  | xargs -0 grep -l "provider \"aws\"")

for file in ${files[@]}
do 
  count=$(grep default_tags $file | wc -l | xargs)

  if [[ $count == 0 ]]; then
    echo -e "Terraform file $file has AWS provider config without default_tags."
    exit -1
  fi

done