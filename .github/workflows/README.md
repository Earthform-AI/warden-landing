# GitHub Workflows

This directory contains GitHub Actions workflows for the Warden Landing project.

## Sourcery Code Review

The `sourcery.yml` workflow provides automated code quality reviews on pull requests using Sourcery AI.

### Features
- ✅ Automated code quality analysis on PRs
- ✅ Inline comments with improvement suggestions
- ✅ Support for TypeScript, React, and Astro files
- ✅ Configurable quality threshold
- ✅ Ignores build artifacts and dependencies

### Setup Requirements

To enable Sourcery code reviews, you need to:

1. **Get a Sourcery account** at [sourcery.ai](https://sourcery.ai)
2. **Add repository secrets** in GitHub Settings > Secrets and variables > Actions:
   - The workflow uses the default `GITHUB_TOKEN` (automatically provided)
   - Sourcery will authenticate using GitHub OAuth when first accessed

### Configuration

The workflow is configured via:
- `.github/workflows/sourcery.yml` - GitHub Actions workflow
- `.sourcery.yaml` - Sourcery-specific settings (quality threshold, ignore patterns)

### Trigger Conditions

The workflow runs on:
- Pull request opened
- Pull request updated (new commits)
- Pull request reopened

### Troubleshooting

If you see errors about boolean inputs, ensure the workflow uses string values:
```yaml
with:
  check: "true"      # ✅ Correct - string value
  in_place: "false"  # ✅ Correct - string value  
  verbose: "true"    # ✅ Correct - string value
```

Not:
```yaml
with:
  check: true        # ❌ Wrong - boolean value
  in_place: false    # ❌ Wrong - boolean value
  verbose: true      # ❌ Wrong - boolean value
```
