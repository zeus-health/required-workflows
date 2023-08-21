#!/usr/bin/env bash
set -e -o pipefail

FINDINGS_FILENAME="TF_TAGGING_FINDS.tmp"

if [ -f "$FINDINGS_FILENAME" ]; then
   echo "$FINDINGS_FILENAME"
	cat $FINDINGS_FILENAME
else
   pwd
   ls -lsah
   echo "TF_TAGGING_FINDS.tmp not found, no findings, skipping script and step ..."
   exit 0

fi


# echo "Installing Python dependencies"
# pip install PyGithub --quiet
# python3 github-pr-comment.py $1 $2
