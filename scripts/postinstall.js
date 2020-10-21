/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');

const addGitHooks = projectRootPath => {
  const commitMsgHookFile = path.resolve(
    projectRootPath,
    '.git',
    'hooks',
    'commit-msg'
  );
  const commitMsgHookFileContent = `#!/bin/sh
node_modules/.bin/commitlint -e $1 || (exec < /dev/tty && [[ "$(read -e -p 'Would you like to use the interactive commit builder? [yn] '; echo $REPLY)" == [Yy]* ]] && node_modules/.bin/cz --hook && node_modules/.bin/commitlint -e $1)
`;

  fs.writeFile(
    commitMsgHookFile,
    commitMsgHookFileContent,
    { encoding: 'utf8', mode: '755' },
    err => {
      if (err) {
        throw err;
      }
      console.log(`created 'commit-msg' successfully`);
    }
  );
};

const addCommitToPackageJson = projectRootPath => {
  const packageJsonFile = path.resolve(projectRootPath, 'package.json');
  let packageJson;
  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    packageJson = require(packageJsonFile);
  } catch {
    packageJson = {};
  }
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.commit = 'cz';

  const packageJsonFileContent = JSON.stringify(packageJson, null, 2);

  fs.writeFile(packageJsonFile, packageJsonFileContent, 'utf8', err => {
    if (err) {
      throw err;
    }
    console.log(`added 'commit' script to 'package.json successfully`);
  });
};

const configureCommitlint = projectRootPath => {
  const commitlintConfigFile = path.resolve(
    projectRootPath,
    'commitlint.config.js'
  );
  let commitlintConfig;
  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    commitlintConfig = require(commitlintConfigFile);
  } catch {
    commitlintConfig = {};
  }
  commitlintConfig.extends = commitlintConfig.extends || [
    '@commitlint/config-conventional'
  ];

  const commitlintConfigfileContent = `module.exports = ${JSON.stringify(
    commitlintConfig,
    null,
    2
  )}`;
  fs.writeFile(
    commitlintConfigFile,
    commitlintConfigfileContent,
    'utf8',
    err => {
      if (err) {
        throw err;
      }
      console.log(`created 'commitlint.config.js' successfully`);
    }
  );
};

const configureCommitizen = projectRootPath => {
  const commitizenConfigFile = path.resolve(projectRootPath, '.czrc');
  const commitizenConfigfileContent = JSON.stringify(
    {
      path: 'commitiquette'
    },
    null,
    2
  );
  fs.writeFile(
    commitizenConfigFile,
    commitizenConfigfileContent,
    'utf8',
    err => {
      if (err) {
        throw err;
      }
      console.log(`created '.czrc' successfully`);
    }
  );
};

const configureRepo = destinationPath => {
  addGitHooks(destinationPath);
  configureCommitlint(destinationPath);
  configureCommitizen(destinationPath);
  addCommitToPackageJson(destinationPath);
};

const destinationPath = process.env.INIT_CWD;

const gitInit = spawn('git', ['init', destinationPath]);
gitInit.stdout.on('data', data => console.log(data.toString()));
gitInit.stderr.on('data', data => console.error(data.toString()));
gitInit.on('error', err => console.error(err));
gitInit.on('close', code =>
  code
    ? console.error(`Exited with code: ${code}`)
    : configureRepo(destinationPath)
);
