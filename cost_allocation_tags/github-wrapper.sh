#!/usr/bin/env bash
set -e -o pipefail

FINDINGS_FILENAME="TF_TAGGING_FINDS.tmp"

if [ -f "$FINDINGS_FILENAME" ]; then
   echo "$FINDINGS_FILENAME"
	cat $FINDINGS_FILENAME
else
   echo "$FINDINGS_FILENAME not found, no findings, running script in cleanup mode"
   export CLEANUP_ONLY=1

fi
echo "Installing Python dependencies"
pip install PyGithub --quiet
python3 github-pr-comment.py
