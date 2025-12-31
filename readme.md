<p align="center">
     <img src=".github/readme-logo.png" alt="Creations Stats" width="120" height="120">
</p>
<h1 align="center">Creations Stats</h3>
<p align="center">A Github Action that generates user's creations stats (Repositories and Gists). Perfect for profile readme customization!</p>
<p align="center">
     <a href="https://github.com/ArsenTech/creations-stats-workflow/issues/new?assignees=&labels=&template=bug_report.md&title=">Report bug</a>
     &nbsp;&middot;&nbsp;
     <a href="https://github.com/ArsenTech/creations-stats-workflow/issues/new?assignees=&labels=&template=feature_request.md&title=">Request Feature</a>
</p>

[![Dependents][dependents-shield]][dependents-url]
[![version][version-shield]][version-url]
[![Contributors][contributors-shield]][contributors-url]
[![project_license][license-shield]][license-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]

[![Issues][issues-shield]][issues-url]
[![build-status][status-shield]][status-url]
![commits since latest release][commits-since-shield]
![GitHub Created At][created-at-shield]
![GitHub repo size][repo-size-shield]

<details>
     <summary>Table of Contents</summary>
     <ol>
          <li>
               <a href="#about">About</a>
               <ul>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#design-difference">Design Difference</a></li>
                    <li><a href="#built-with">Built With</a></li>
               </ul>
          </li>
          <li><a href="#usage">Usage</a></li>
          <li><a href="#options">Options</a></li>
          <li><a href="#versioning">Versioning</a></li>
          <li>
               <a href="#contributing">Contributing</a>
               <ul>
                    <li><a href="#top-contributors">Top Contributors</a></li>
               </ul>
          </li>
          <li><a href="#star-history">Star History</a></li>
          <li><a href="#license">License</a></li>
     </ol>
</details>

## About
The **Creations Stats** Github action helps you get latest repositories (and gists) details, and lets you manage and exclude some repos. That repo is perfect for a Workflow-rich Github Profile Readme to showcase your creations.
### Features
- **Exclusions** - Exclude some Github repos from showing it to a profile readme to make the list cleaner
- **Repository List Design** - You can choose some designs based on your interest
### Design Difference
> [!NOTE]
> The `repo-name` and `another-repo` are basic repo name placeholders

#### Minimal Design
- [repo-name][repo-example-link] - ⭐ 5 - Useful repository description
- [another-repo][repo-example-link] - ⭐ 3 - Another useful repository description

#### Detailed Design
- [repo-name][repo-example-link] - Useful repository description
  - ⚖️ MIT License
  - ⭐ Stargazers: 5
  - 🍴 Forks: 3
- [another-repo][repo-example-link] - Another useful repository description
  - ⚖️ MIT License
  - ⭐ Stargazers: 3
  - 🍴 Forks: 1
### Built With
- [![Typescript][typescript-shield]][typescript-url]
- [![NodeJS][node-shield]][node-url]
- [![Github Actions][gh-actions-shield]][gh-actions-url]
- [![Dependabot][dependabot-shield]][dependabot-url]
- [![Octokit][octokit-shield]][octokit-url]
- [![YAML][yaml-shield]][yaml-url]

## Usage
> [!NOTE]
> The default schedule above runs every 6 hours, which is suitable for most users. You can adjust the schedule based on the frequency:
> - `cron: "0 6 * * *"` (every 6 hours, **recommended for most users**)
> - `cron: '0 0 * * *'` (every day)
> - `cron: '0 0 * * 0'` (every week)
> - `cron: '0 0 1 * *'` (every month)
>
> Running the workflow too frequently (e.g., hourly) may cause temporary rate limits by the Github API (powered using Octokit). You can always trigger the workflow manually using `workflow_dispatch` whenever needed.
1. In your GitHub profile repository (repository with same name as your username), add the following comment tags:
     ```md
     ## Portfolio
     <!-- CREATIONS-START -->
     <!-- CREATIONS-END -->
     ```
2. Create a drectory: `.github/workflows`
3. Create the workflow named `creations.yml` and use the following code:
     ```yaml
     name: Creations workflow
     on:
     schedule: # Automatic run
     - cron: "0 6 * * *" # Runs every 6 hours
     workflow_dispatch: # Manual run from GitHub Actions Workflow page directly
     permissions:
       contents: write # Permission to write the generated contents

     jobs:
       update-portfolio:
         name: Update profile with recent repositories and gists
         runs-on: ubuntu-latest
         steps:
           - name: Checkout
             uses: actions/checkout@v4

           - name: Fetch portfolio from Github API
             uses: ArsenTech/creations-stats-workflow@v1
             with:
               github-username: <your-username>
               repo-list-design: detailed
     ```
4. Replace `<your-username>` with your preferred Github Username.
5. Go to **Repository Settings > Actions > General**, then update the "Workflow permissions" to "Read and write permissions", then click on save.
6. Wait for it to run automatically, or trigger it manually to see the result instantly.

## Options
This workflow has additional options for customization. The following are the list of  available options:

| Option Name        | Type                              | Description                                        | Default Value                    | Required |
|--------------------|-----------------------------------|----------------------------------------------------|----------------------------------|----------|
| `github-username`  | String                            | A Github username to show gists and Repositories   | *no default value*               | ✅        |
| `exclusions`       | String (with `\|` as a separator) | Repos to exclude from showing it                   | *no default value*               | ❌        |
| `target-file`      | String                            | Target markdown file to place in the repo          | README.md                        | ❌        |
| `repo-limit`       | Number                            | Limits how many repos to show                      | 20                               | ❌        |
| `gist-limit`       | Number                            | Limits how many gists to show                      | 10                               | ❌        |
| `show-archives`    | Boolean                           | Option to show archived Repositories               | `false`                          | ❌        |
| `show-forks`       | Boolean                           | Option to show forked Repositories                 | `false`                          | ❌        |
| `commit-message`   | String                            | A custom commit message                            | `"Update repos and gists stats"` | ❌        |
| `include-gists`    | Boolean                           | Include gists created by the mentioned github user | `true`                           | ❌        |
| `repo-list-design` | `minimal` or `detailed` (Enum)    | Repository list item design type                   | `"minimal"`                        | ❌        |
| `comment-tag-name` | String    | A name of the custom comment tag for placing content                   | `"CREATIONS"`                        | ❌        |

## Versioning
This website follows [Semantic Versioning](https://semver.org/). You can view the full [Changelog][changelog-url] for details on each website version.

## Contributing
Contributions are Always Welcome! Please read both [Code of Conduct][code-of-conduct-url] and [CONTRIBUTING.md][contributing-url] before contributing.
### Top Contributors
[![Top Contributors][top-contributors]][contributors-url]

## Star History
[![Star History Chart][star-history-chart]][star-history-url]

## License
Distributed under the MIT License. See [LICENSE.md][license-url] for more information.

## Support And Follow
[![YouTube][yt-shield]][yt-url]
[![Patreon][patreon-shield]][patreon-url]
[![Codepen][codepen-shield]][codepen-url]
[![DeviantArt][deviantart-shield]][deviantart-url]
[![Odysee][odysee-shield]][odysee-url]
[![Scratch][scratch-shield]][scratch-url]

> GitHub [@ArsenTech][github-url] &nbsp;&middot;&nbsp;
> YouTube [@ArsenTech][yt-url] &nbsp;&middot;&nbsp;
> Patreon [ArsenTech][patreon-url] &nbsp;&middot;&nbsp;
> [ArsenTech's Website][website-url]

<!-- Markdown Links -->
[star-history-chart]: https://api.star-history.com/svg?repos=ArsenTech/creations-stats-workflow&type=date
[star-history-url]: https://www.star-history.com/#ArsenTech/creations-stats-workflow&type=date
[contributors-shield]: https://img.shields.io/github/contributors/ArsenTech/creations-stats-workflow.svg?color=%2322b455
[contributors-url]: https://github.com/ArsenTech/creations-stats-workflow/graphs/contributors
[top-contributors]: https://contrib.rocks/image?repo=ArsenTech/creations-stats-workflow
[forks-shield]: https://img.shields.io/github/forks/ArsenTech/creations-stats-workflow.svg?color=%2322b455
[forks-url]: https://github.com/ArsenTech/creations-stats-workflow/network/members
[stars-shield]: https://img.shields.io/github/stars/ArsenTech/creations-stats-workflow.svg?color=%2322b455
[stars-url]: https://github.com/ArsenTech/creations-stats-workflow/stargazers
[issues-shield]: https://img.shields.io/github/issues/ArsenTech/creations-stats-workflow.svg
[issues-url]: https://github.com/ArsenTech/creations-stats-workflow/issues
[license-shield]: https://img.shields.io/github/license/ArsenTech/creations-stats-workflow?color=%2322b455
[license-url]: https://github.com/ArsenTech/creations-stats-workflow/blob/main/LICENSE.md
[version-shield]: https://img.shields.io/github/v/release/ArsenTech/creations-stats-workflow?sort=semver&display_name=release&logo=github&label=Marketplace
[version-url]: https://github.com/marketplace/actions/creations-stats-workflow
[dependents-shield]: https://badgen.net/github/dependents-repo/ArsenTech/creations-stats-workflow?icon=github&label=Dependents
[dependents-url]: https://github.com/ArsenTech/creations-stats-workflow/network/dependents
[status-shield]: https://img.shields.io/github/actions/workflow/status/ArsenTech/creations-stats-workflow/build.yml?color=%2322b455
[status-url]: https://github.com/ArsenTech/creations-stats-workflow/actions/workflows/build.yml
[commits-since-shield]: https://img.shields.io/github/commits-since/ArsenTech/creations-stats-workflow/latest?color=%2322b455&label=Commits%20since%20latest%20version
[created-at-shield]: https://img.shields.io/github/created-at/ArsenTech/creations-stats-workflow
[repo-size-shield]: https://img.shields.io/github/repo-size/ArsenTech/creations-stats-workflow
[code-of-conduct-url]: https://github.com/ArsenTech/creations-stats-workflow/blob/main/CODE_OF_CONDUCT.md
[contributing-url]: https://github.com/ArsenTech/creations-stats-workflow/blob/main/CONTRIBUTING.md
[changelog-url]: https://github.com/ArsenTech/creations-stats-workflow/blob/main/CHANGELOG.md
[website-url]: https://arsentech.github.io
[repo-example-link]: https://github.com/ArsenTech/creations-stats-workflow

<!-- Languages -->
[typescript-shield]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[node-shield]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en
[gh-actions-shield]: https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white
[gh-actions-url]: https://docs.github.com/en/actions
[dependabot-shield]: https://img.shields.io/badge/dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white
[dependabot-url]: https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide
[octokit-shield]: https://img.shields.io/badge/Octokit-%23121011.svg?style=for-the-badge&logo=github&logoColor=white
[octokit-url]: https://github.com/octokit/octokit.js/
[yaml-shield]: https://img.shields.io/badge/yaml-%23ffffff.svg?style=for-the-badge&logo=yaml&logoColor=151515
[yaml-url]: https://yaml.org/

<!-- External Links -->
[yt-shield]: https://img.shields.io/badge/ArsenTech%20-222222.svg?&style=for-the-badge&logo=YouTube&logoColor=%23FF0000
[yt-url]:https://www.youtube.com/channel/UCrtH0g6NE8tW5VIEgDySYtg
[patreon-shield]:https://img.shields.io/badge/-ArsenTech-222222?style=for-the-badge&logo=patreon&logoColor=white
[patreon-url]:https://www.patreon.com/ArsenTech
[codepen-shield]: https://img.shields.io/badge/-ArsenTech-222222?style=for-the-badge&logo=codepen&logoColor=white
[codepen-url]: https://codepen.io/ArsenTech
[deviantart-shield]: https://img.shields.io/badge/-Arsen2005-222222?style=for-the-badge&logo=deviantart&logoColor=05cc46
[deviantart-url]: https://www.deviantart.com/arsen2005
[odysee-shield]: https://img.shields.io/badge/-ArsenTech-222222?style=for-the-badge&logo=odysee&logoColor=FA9626
[odysee-url]: https://odysee.com/@ArsenTech
[scratch-shield]: https://img.shields.io/badge/-ArsenTech-222222?style=for-the-badge&logo=scratch&logoColor=orange
[scratch-url]: https://scratch.mit.edu/users/ArsenTech/
[github-url]: https://github.com/ArsenTech