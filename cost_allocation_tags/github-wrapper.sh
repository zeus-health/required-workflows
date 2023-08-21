#!/usr/bin/env bash
set -e -o pipefail

if [ ! -f TF_TAGGING_FINDS.tmp ]
then
	echo "TF_TAGGING_FINDS.tmp not found, no findings, skipping script..."
   exit 0
fi

echo "Installing Python dependencies"
pip install PyGithub --quiet
python3 github-pr-comment.py $1 $2
