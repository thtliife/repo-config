# @thtliife/repo-config

This is my quick start for setting up commitlint and commitizen for use with commitlint's config-conventional strategy.

_On install, this will create / update the following files in your package directory._

- `commitlint.config.js`
- `.czrc`
- `.git/hooks/commit-msg`

it will also add a new script `commit` to your `package.json` file to be used to call commitizen when you want to use an interactive prompt for commit messages.

**Warning:** If any of these files exist in your project directory, they will be modified.

I like the [pnpm package manager](https://pnpm.js.org/) personally, but you can use whichever package manager you like.
I have tested using `pnpm add --save-dev`, `yarn add --save-dev` & `npm install --save-dev`, and all of these package managers work just fine.
If you still want to continue, install by simply running the following in a new project folder.

#### pnpm

```bash
# Initialise a new project (Optional)
pnpm init -y

# Install peer dependencies
pnpx install-peerdeps --pnpm --dev @thtliife/repo-config

# Install repo-config
pnpm add --save-dev @thtliife/repo-config
```

---

### Other package managers

#### npm

```bash
# Initialise a new project (Optional)
npm init -y

# Install peer dependencies
npx install-peerdeps --dev @thtliife/repo-config

# Install repo-config
npm install --save-dev @thtliife/repo-config
```

#### yarn

```bash
# Initialise a new project (Optional)
yarn init -y

# Install peer dependencies
npx install-peerdeps --yarn --dev @thtliife/repo-config

# Install repo-config
yarn add --save-dev @thtliife/repo-config
```

glhf :)
