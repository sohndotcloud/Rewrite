const process = require('process');
const fs = require('fs');

class Config {
    constructor(directory, mask) {
        this.directory = directory;
        this.mask = mark;
    }
}

function main() {
    const args = process.argv.slice(2);
    let index = 0; 
    outerloop:
    while (index < args.length) {
        switch (args[index]) {
            case '-p':
                index++;
                let mask = args[index];
                if (!isNumeric(mask)) {
                    alert();
                    break outerloop;
                }

                break;
            case '-d':
                if (index + 1 < args.length) {
                    alert();
                    break outerloop;
                }
                index++;
                let targetDirectory = args[index];
                try {
                    fs.existsSync(targetDirectory);
                } catch (e) {
                    alert();
                    return false;
                }
                console.log("Working Directory: ", targetDirectory);
                break;
            default:
                console.log("It's not configured for this");
                break;
        }
    }

    console.log("Broke Out of the Loop!");
    const basePath = '/Applications';

    const { readdir } = require('fs').promises;
    
}

function isNumeric(str) {
  return typeof str === "string" && str.trim() !== "" && !isNaN(str);
}

function alert() {
    console.log("It's not configured for this");
}


async function listFiles(readdir, path) {
    try {
        const path = "/Applications";
        process.chdir(path);
        const apps = await readdir(path);
        for (const app of apps) {
            console.log(app);
        }
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

main();