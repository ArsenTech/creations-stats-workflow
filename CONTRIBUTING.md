<p align="center">
  <img src=".github/logo-mark.png" alt="Creations Stats" width="400">
</p>

<h1 align="center">Contributing Guide</h1>

First off, thanks for considering contributing to this project!  
Your ideas, time, and effort help make it better for everyone. 🌱

We welcome all kinds of contributions — code, design, translations, documentation, bug reports, feature ideas, and feedback.  
This guide explains how you can get involved.

---

## 🚀 Ways to Contribute
You don’t need to write code to make a valuable contribution! Here are some great ways:
- **Development** – Fix bugs, add features, or refactor code.
- **Testing & Bug Reports** – Try the app on different devices and report any issues.
- **Workflow Feedback** – Suggest layout, accessibility, or improvements.
- **Feature Requests** – Share your ideas for improvements by opening a feature request.
- **Community Support** – Answer questions in issues and help others get started.

## ✅ Pull Request Guidelines
When submitting a PR:
1. Create a branch from `main`:
   ```bash
   git checkout -b <type>/<short-description>
   # examples: feature/new-option, fix/typo
   ```
2. Keep commits small and meaningful.
3. Ensure the app builds and passes linting/tests.
4. Update docs (README, CHANGELOG) if you changed behavior or added features.
5. Open the PR and describe what you changed and why.

### PR Checklist
- [ ] My changes work locally (`npm run compile` and `npm start`, or tested via `act`).
- [ ] I’ve updated documentation/screenshots if needed.
- [ ] I’ve tested on multiple devices.
- [ ] My commit messages are clear and signed (`git commit -s -m "your message"`).

## 📝 Commit Convention (Optional but Recommended)
We recommend following the [Conventional Commits](https://www.conventionalcommits.org/) format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `refactor:` for code improvements
- `chore:` for maintenance
- `i18n:` for maintaining languages

Example:
```
feat: add bulk idea selection feature
```

## 📦 Development Setup
> [!IMPORTANT]
> Before Development, make sure you've installed and updated the following
> - Docker Desktop (that contains the Docker Engine)
> - nektos/act
>    - **Winget**: `winget install nektos.act`
>    - **Github CLI**: `gh extension install https://github.com/nektos/gh-act`
>
> More info for the **nektos/act** installation: https://nektosact.com/installation/index.html

> [!NOTE]
> The `npm start` command will work slower for the first time

1. Fork the repository and clone your fork:
      ```bash
      git clone https://github.com/ArsenTech/creations-stats-workflow.git
      cd creations-stats-workflow
      ```
2. Install dependencies:
      ```bash
      npm install
      ```
3. Run the Github action workflow
      ```bash
      npm run compile
      npm start
      ```
PRs are reviewed with kindness and calmness :-)

## 💡 Feedback & Feature Requests
We love new ideas! If you have a suggestion:
1. Check [existing issues][issues-url]
2. If it’s new, open a [feature request][new-feature-request-url].
3. Explain the motivation and the desired implementation. (the Feature request template says it all ☺️)

## 🌱 Community Guidelines
We aim to keep this space **welcoming and peaceful**:
- Be respectful and constructive.
- Focus on ideas, not individuals.
- Keep discussions inclusive and on-topic.
- Remember: behind every contribution is a person.

### Dos and Don'ts
| ✅ Do                           | ❌ Don’t                 |
| ------------------------------- | ------------------------- |
| Follow branch naming convention | Edit README for no reason |
| Test before submitting          | Submit broken builds      |
| Use clear commit messages       | Spam “fix typo” PRs       |
| Respect code owner reviews      | Bypass linting            |

See our [Code of Conduct][code-of-conduct-url] for more.

## 🙌 A Note of Thanks
Contributors are what make this project thrive.
Your time, ideas, and creativity are truly appreciated.

Take a deep breath, enjoy the process — and let’s make something beautiful together ✨

> GitHub [@ArsenTech][github-url] &nbsp;&middot;&nbsp;
> YouTube [@ArsenTech][yt-url] &nbsp;&middot;&nbsp;
> Patreon [ArsenTech][patreon-url] &nbsp;&middot;&nbsp;
> [ArsenTech's Website][website-url]

[issues-url]: https://github.com/ArsenTech/creations-stats-workflow/issues
[new-feature-request-url]: https://github.com/ArsenTech/creations-stats-workflow/issues/new?assignees=&labels=&template=feature_request.md&title=
[code-of-conduct-url]: https://github.com/ArsenTech/creations-stats-workflow/blob/main/CODE_OF_CONDUCT.md
[yt-url]:https://www.youtube.com/channel/UCrtH0g6NE8tW5VIEgDySYtg
[patreon-url]:https://www.patreon.com/ArsenTech
[github-url]: https://github.com/ArsenTech
[website-url]: https://arsentech.github.io