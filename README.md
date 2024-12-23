# WP Self-Host Update JSON Generator

This GitHub Action generates a JSON file for self-hosting WordPress plugin or theme updates. It automates creating a JSON from the `readme.txt` file, commits it to the `main` branch in the `wp-dist/` directory, and prepares it for integration with custom PHP code.

## Inputs

| Name               | Description                                 | Required | Default                     |
|--------------------|---------------------------------------------|----------|-----------------------------|
| `readme-path`      | Path to the `readme.txt` file               | Yes      | `readme.txt`                |
| `json-output-path` | Path where the JSON will be saved           | No       | `wp-dist/plugin-data.json`  |
| `github-token`     | GitHub Token with write permissions         | Yes      | `${{ github.token }}`       |

## Example Workflow

```yaml
name: Generate WP Self-Host JSON

on:
  push:
    branches:
      - main

jobs:
  generate-json:
    runs-on: ubuntu-latest

    steps:
      - name: Check out repository
        uses: actions/checkout@v3

      - name: Run WP Self-Host Update JSON Generator
        uses: seu-usuario/generate-readme-json-action@v1
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