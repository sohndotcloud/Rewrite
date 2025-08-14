const { readdir, stat, chmod } = require('fs').promises;
const Config = require('./config.js');
const readline = require('readline');
const path = require('node:path');

const rl = readline.createInterface

async function listFiles(path) {
  let apps;
  try {
    process.chdir(path);
    apps = await readdir(path);
  } catch (err) {
    console.error("Error reading directory:", err);
  }
  return apps;
} 

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const driver = require('./driver');
  const config = driver.start(args);
  let input = "Y";
  let includeDirectories = isY(input);
  input = await ask("The engine is ready to change the permission levels for this directory. Avoid directories? (Y/n):");
  if (input == "\n") {
    input = "Y";
  }

  if (input == "n" || input == "N") {
    console.log("Masking directories");
    includeDirectories = false;
  }
  
  let knownFiles = [];
  let files = await listFiles(config.directory); 
  
  for (const file of files) {
    const stats = await stat(path.join(config.directory, file));
    if (!stats.isDirectory() || !includeDirectories) {
      knownFiles.push(file);
    } else {
      console.log("Skipping directory:", file);
    }
  }

  const chmodValue = config.calculateValue();
  console.log()
  knownFiles.map((file) => {
    console.log(file, chmodValue);
    chmod(file, chmodValue);
  })
}

function isY(input) {
  if (input === 'y' || input === 'Y') {
    return true;
  }

  return false;
}

main();