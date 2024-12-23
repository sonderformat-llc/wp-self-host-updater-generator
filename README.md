# WP Self-Host Update JSON Generator

A GitHub Action for WordPress plugin and theme developers to enable self-hosted updates directly from GitHub. It generates a JSON file from the readme.txt, commits it to the repository, and prepares everything to integrate with custom PHP code for managing updates directly in WordPress. Simplify self-hosting with this automated tool.

## Inputs

| Name               | Description                                 | Required | Default                     |
|--------------------|---------------------------------------------|----------|-----------------------------|
| `readme-path`      | Path to the `readme.txt` file               | No       | `readme.txt`                |
| `json-output-path` | Path where the JSON will be saved           | No       | `wp-dist/plugin-data.json`  |
| `github-token`     | GitHub Token with write permissions         | Yes      | `${{ github.token }}`       |

## Example Workflow

```yaml
name: Generate WP Self-Host JSON

on:
  push:
    tags:
      - '*'

jobs:
  generate-json:
    runs-on: ubuntu-latest

    steps:
      - name: Check out repository
        uses: actions/checkout@v3

      - name: Run WP Self-Host Update JSON Generator
        uses: eduardovillao/wp-self-host-json-generator@main
        with:
          readme-path: 'readme.txt'
          json-output-path: 'wp-dist/plugin-data.json'
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Requirements

To use this GitHub Action, ensure the following files are present in your repository:

- `readme.txt`: A valid WordPress plugin or theme readme file.
- GitHub Token: Ensure the repository allows write access for the GitHub Actions token.

## Using `.gitattributes` in Your Repository

To ensure certain files or directories are excluded from the `.zip` file created during GitHub releases, configure a `.gitattributes` file in your repository. This file is respected when generating export archives for self-hosting.

### Example

Add the following `.gitattributes` to your repository:

```gitattributes
# Exclude unnecessary files from release archives
README.md export-ignore
.github/ export-ignore
tests/ export-ignore
node_modules/ export-ignore