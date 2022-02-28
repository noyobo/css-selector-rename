const path = require('path');
const prettier = require('prettier');

const cssSelectorRename = require('../lib').default;
const { readFileSync, existsSync, readdirSync, statSync, writeFileSync } = require('fs-extra');

const argv = process.argv.splice(2);

async function run(dir) {
  let opts;
  const inputFile = path.join(dir, 'input.css');
  const outputFile = path.join(dir, 'output.css');
  const input = readFileSync(inputFile).toString();

  if (existsSync(path.join(dir, 'config.js'))) {
    opts = require(path.join(dir, 'config.js'));
  }

  let outputCSS = await cssSelectorRename(input, opts);

  outputCSS = prettier.format(outputCSS, { parser: 'css' });

  if (argv.includes('-u') || argv.includes('--updateSnapshot')) {
    writeFileSync(outputFile, outputCSS);
  } else {
    const output = readFileSync(outputFile).toString();
    expect(outputCSS).toEqual(output);
  }
}

const features = readdirSync(__dirname)
  .filter((dir) => dir !== '__snapshots__')
  // .filter((dir) => dir.startsWith('keyframe'))
  .filter((d) => {
    return statSync(path.join(__dirname, d)).isDirectory();
  });

features.forEach((dir) => {
  it(`Test case: ${dir}`, async () => {
    await run(path.join(__dirname, dir));
  });
});
