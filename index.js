const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
// set your real values:
const GIT_USER_NAME = 'Kartikey Mishra';
const GIT_USER_EMAIL = 'km030255@gmail.com';

// OR remove the two addConfig lines so your existing git config is not overridden

const FILE_PATH = './data.json';
async function makeCommit(weeks = 0, days = 0) {
  try {
    const dateMoment = moment().add(weeks, 'weeks').add(days, 'days');
    const DATA = dateMoment.toISOString();
    const data = { date: DATA };

    await jsonfile.writeFile(FILE_PATH, data, { spaces: 2 });
    console.log(`Wrote ${FILE_PATH}:`, data);

    const git = simpleGit();

    // Ensure commit author is correct for attribution
    await git.addConfig('user.name', GIT_USER_NAME, undefined, { '--local': true });
    await git.addConfig('user.email', GIT_USER_EMAIL, undefined, { '--local': true });
    console.log('Set git user.name and user.email for this repo');

    await git.add(FILE_PATH);
    console.log(`Staged ${FILE_PATH}`);

    const commitOptions = { '--date': DATA };
    const commitSummary = await git.commit(DATA, [FILE_PATH], commitOptions);
    console.log('Commit summary:', commitSummary);

    // Explicit push to origin main
    const pushSummary = await git.push('origin', 'main');
    console.log('Push summary:', pushSummary);

    console.log('makeCommit finished successfully');
  } catch (err) {
    console.error('Error in makeCommit:', err);
  }
}

makeCommit(3, 3);
