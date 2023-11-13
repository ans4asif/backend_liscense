const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
console.log({ path_of_cache: join(__dirname, '.cache', 'puppeteer') });
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
