/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const { execSync } = require('child_process');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

async function getChangedFiles() {
  try {
    console.info('Current working directory:', process.cwd());

    const remote = 'origin';
    const baseBranch = 'develop';
    const submodulePath = 'lib/xfi.lib';

    // Fetch the latest changes from the remote repository
    await exec(`git fetch ${remote}`);

    // Fetch and checkout the latest changes for the specific submodule branch
    await exec(
      `cd ${submodulePath} && git fetch ${remote} && git checkout ${baseBranch} && git pull ${remote} ${baseBranch}`
    );

    // Get the common ancestor for the current branch and remote/develop
    const { stdout: mergeBase, stderr: mergeBaseError } = await exec(`git merge-base HEAD ${remote}/${baseBranch}`);

    if (mergeBaseError) {
      console.error('Error finding merge base:', mergeBaseError);

      return { changedFiles: [], submoduleChanges: [] };
    }
    const baseCommit = mergeBase.trim();

    // Get the list of changed files since the common ancestor
    const { stdout: diffFiles, stderr: diffError } = await exec(`git diff --name-only ${baseCommit} HEAD`);

    if (diffError) {
      console.error('Error getting changed files:', diffError);

      return { changedFiles: [], submoduleChanges: [] };
    }
    const changedFiles = diffFiles.split('\n').filter(file => file.trim() !== '');

    // Get the list of staged (indexed) files
    const { stdout: stagedFiles, stderr: stagedFilesError } = await exec('git diff --cached --name-only');

    if (stagedFilesError) {
      console.error('Error getting staged files:', stagedFilesError);

      return { changedFiles, submoduleChanges: [] };
    }
    const stagedChangedFiles = stagedFiles.split('\n').filter(file => file.trim() !== '');

    // Combine changed files and staged files
    const allChangedFiles = [...new Set([...changedFiles, ...stagedChangedFiles])];

    // Check for changes in the specific submodule
    const submoduleStatus = execSync(`git submodule status ${submodulePath}`).toString().trim();

    if (!submoduleStatus) {
      console.error(`Submodule ${submodulePath} not found.`);

      return { changedFiles: allChangedFiles, submoduleChanges: [] };
    }

    // Get the submodule diff for changes
    const { stdout: submoduleDiff, stderr: submoduleError } = await exec(
      `git diff --name-only ${baseCommit} HEAD ${submodulePath}`
    );

    if (submoduleError) {
      console.error('Error getting submodule changes:', submoduleError);

      return { changedFiles: allChangedFiles, submoduleChanges: [] };
    }
    const submoduleChangesList = submoduleDiff
      .split('\n')
      .filter(file => file.trim() !== '')
      .map(file => path.join(submodulePath, file));

    // Get staged changes in the submodule
    const { stdout: submoduleStagedDiff, stderr: submoduleStagedError } = await exec(
      `git diff --cached --name-only ${submodulePath}`
    );

    if (submoduleStagedError) {
      console.error('Error getting submodule staged changes:', submoduleStagedError);

      return { changedFiles: allChangedFiles, submoduleChanges: submoduleChangesList };
    }
    const submoduleStagedChangesList = submoduleStagedDiff
      .split('\n')
      .filter(file => file.trim() !== '')
      .map(file => path.join(submodulePath, file));

    // Combine submodule changes and staged submodule changes
    const allSubmoduleChanges = [...new Set([...submoduleChangesList, ...submoduleStagedChangesList])];

    return { changedFiles: allChangedFiles, submoduleChanges: allSubmoduleChanges };
  } catch (error) {
    console.error('Error executing git commands:', error);

    return { changedFiles: [], submoduleChanges: [] };
  }
}

async function runTestsForChangedFiles() {
  const { changedFiles, submoduleChanges } = await getChangedFiles();

  console.info('Changed files:', changedFiles);
  console.info('Submodule changes:', submoduleChanges);

  if (changedFiles.length > 0 || submoduleChanges.length > 0) {
    const testFiles = [...changedFiles, ...submoduleChanges]
      .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
      .map(file => path.resolve(file));

    if (testFiles.length > 0) {
      console.info('Running tests for files:', testFiles);
      execSync(`npx jest --verbose --maxWorkers=3 --silent --findRelatedTests ${testFiles.join(' ')}`, {
        stdio: 'inherit',
      });
    } else {
      console.info('No testable files. Tests are not running.');
    }
  } else {
    console.info('No changed files. Tests are not running.');
  }
}

runTestsForChangedFiles();
