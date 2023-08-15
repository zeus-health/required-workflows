# Enumerate Terraform non-compliance of `default_tags` in provider

## Notables wrt the workflow

- The workflow must 'check out' itself to bring all source code
- Git checkouts of same org but private repos is problematic, must use a PAT
- PAT must come from the PR'd/invoking repo, best as an Org level Secret