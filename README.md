# @thtliife/repo-config

This is my quick start for setting up commitlint and commitizen for use with commitlint's config-conventional strategy.

_On install, this will create / update the following files in your package directory._

- `commitlint.config.js`
- `.czrc`
- `.git/hooks/commit-msg`

it will also add a new script `commit` to your `package.json` file to be used to call commitizen when you want to use an interactive prompt for commit messages.

**Warning:** If any of these files exist in your project directory, they may be overwritten.

If you still want to continue, install by simply running the following in a new project folder.

```bash
npm init -y
npm install --save-dev @thtliife/repo-config
```

or alternatively if you prefer the `yarn` package manager:

```bash
yarn init -y
yarn add --dev @thtliife/repo-config
```

Good luck :)
