# Enumerate Terraform non-compliance of `default_tags` in provider

## Notables wrt the workflow

- The required workflow must 'check out' itself to bring in source/script code
- Git checkouts of same org but private repos is problematic, must use a PAT (REQ_WORKFLOW_PAT)
- PAT must come from the PR'd/invoking repo (not the required-workflows repo), best as an Org level Secret