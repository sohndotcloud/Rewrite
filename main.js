const { readdir } = require('fs').promises;
const Config = require('./config.js');
const readline = require('readline');

const rl = readline.createInterface

async function listFiles(path) {
  let apps;
  try {
    process.chdir(path);
    apps = await readdir(path);
    for (const app of apps) {
      console.log(app);
    }
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

  let input = await ask("The engine is ready to change the permission levels for this directory. Avoid directories? (Y/n):");
  if (input == "n" || input == "N") {
    console.log("Masking directories");
  }
  
  let files = listFiles(config.directory);  
}


main();