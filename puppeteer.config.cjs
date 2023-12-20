const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */

// Get the current working directory
const currentWorkingDirectory = process.cwd();

// Print the resolved path for debugging
console.log({
  directory: __dirname,
  resolved_path_of_cache: join(currentWorkingDirectory, '.cache', 'puppeteer'),
});

console.log({ path_of_cache: join(__dirname, '.cache', 'puppeteer') });
// const puppeteerCachePath = '/home/ans4asif2/backend_liscense/.cache/puppeteer';
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),

  // cacheDirectory: puppeteerCachePath,
};
