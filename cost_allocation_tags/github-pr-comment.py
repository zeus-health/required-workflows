#!/usr/bin/env python3

import sys, os, json

from github import Github

def load_plan(file):
    lines = []
    with open(file) as f:
        for line in f:
            try:
                this = json.loads(line)
                lines.append(this)
            except:
                pass
    return lines

def remove_comments(pr):
    comments = pr.get_comments()
    to_remove = list(filter(lambda x: f'Terraform AWS Provider missing default_tags configurations' in x.body, comments))
    for issue in to_remove:
        issue.delete()
    print(f"Removed {len(to_remove)} old comments")


def create_findings_message():
   findings_array = [f"$$\textcolor{Orange}{\verb|Terraform AWS Provider missing default_tags configurations|}$$\n"]
   # findings_array = [f"**Terraform AWS Provider missing default_tags configurations** \n"]
   with open('TF_TAGGING_FINDS.tmp') as my_file:
      for line in my_file:
         findings_array.append("`" + line + "`")
   return ''.join(findings_array)

def submit_comment(pr, message):
    pr.create_comment(message)
    print("Submitted PR Comment")

if __name__ == '__main__':
    directory = os.path.basename(os.getcwd())
    try:
        github_token = os.environ['GITHUB_TOKEN']
    except KeyError:
        print("GITHUB_TOKEN not set")
        exit(1)
    try:
        github_event_path = os.environ['GITHUB_EVENT_PATH']
    except:
        print("GITHUB_EVENT_PATH not set")
        exit(1)

    with open(github_event_path) as f:
        eventPath = json.load(f)

    os.environ['$GITHUB_STEP_SUMMARY'] = "Terraform AWS Provider missing default_tags configurations"  
    g = Github(github_token)
    repo = g.get_repo(eventPath['repository']['full_name'])
    pr = repo.get_issue(eventPath['pull_request']['number'])
    remove_comments(pr)
    findings_msg = create_findings_message()
    submit_comment(pr, findings_msg)
