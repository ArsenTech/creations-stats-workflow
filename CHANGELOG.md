# Change Log
All notable changes of the **Creations Stats** Github Action will be documented here.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [1.0.2] - 2026-01-07
> [!IMPORTANT]
> This feature is a breaking change, which means some gists can be fetched only by using a separate comment tag
### Added
- `repo-tag-name` option
- `gist-tag-name` option
### Improved
- The Repoistories and gists fetch feature unifying into 1 logic (inside thr `try...catch` block)
- The Section placement feature
- Other Bug Fixes
### Removed
- `include-gists` option
- `comment-tag-name` option
- Titles after generating content (like `#### Repositories` or `#### Gists`)

## [1.0.1] - 2026-01-02
### Added
- The local Github Action run command + some checks
### Changed
- Changed the exclusions separator from `|` to `,`
- Changed formatting of the **detailed** repository list

## [1.0.0] - 2025-12-31
### Highlights
It took ~70 workflow runs to make a successful Github Action like this.
### Changed
- Made GitHub Username, Exclusions, and Target file into GitHub Action options
- Rewritten the code from Bash (prototype) to Typescript with some types and utilities
- Updated the fetch function
### Improved
- Feature to add contents between 2 comment tags
- Feature To Fetch Repos and Gists
### Added
- The **Detailed** Repo list item design
- Raw value validation
- Functionality to prevent rate limit
### Added Options
- Repository Limit
- Gists Limit
- Show Archives
- Show Forks
- Custom commit Message
- Include Gists
- Repository List Design
- Custom comment tag name

## [0.5.0] - 2025-12-04 (Prototype)
### Highlights
- It's released as a Bash-based prototype
### Added
- Feature To Fetch Repos and Gists
- The **Minimal** Repo list item design
- Feature to add contents in between 2 comment tags

[1.0.2]: https://github.com/ArsenTech/creations-stats-workflow/releases/tag/v1.0.2
[1.0.1]: https://github.com/ArsenTech/creations-stats-workflow/releases/tag/v1.0.1
[1.0.0]: https://github.com/ArsenTech/creations-stats-workflow/releases/tag/v1
[0.5.0]: https://github.com/ArsenTech/creations-stats-workflow/blob/main/examples/prototype.yml