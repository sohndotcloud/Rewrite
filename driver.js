const Config = require('./config.js');
const util = require("./util");
const { Permission } = require("./permission")
const process = require("process");
const fs = require("fs"); 



function start(args) {
  let index = 0;
  let config = new Config();
  // Processing arguments
  console.log(args);
  outerloop: while (index < args.length) {
    switch (args[index]) {
      case "-p":
        index++;
        config.mask = args[index];
        if (!util.isNumeric(config.mask) && mask > 777) {
          config.mask = null;
          util.alert();
          break outerloop;
        }
        break;
      case "-d":
        if (index + 1 >= args.length) {
          util.alert();
          console.log("Default directory is /Applications");
          break outerloop;
        }

        index++;
        directory = args[index];
        config.directory = directory;
        console.log(directory);
        try {
          let status = fs.existsSync(directory);
          if (status) {
            console.log("Directory found.");
          } else {
            console.log("Directory not found");
          }
        } catch (e) {
          util.usage("Directory does not exist");
          return false;
        }
        console.log("Loaded Directory:", directory);
        break;
      default:
        console.log("Output: Command input was:", args[index]);
        console.log("It's not configured for this");
        exit(1);
    }
    index++;
  }
  if (config.mask == null || config.directory == "") {
    util.usage();
    exit(1);
  }

  if (config.mask !== undefined && config.directory !== undefined) {
    const permissions = new Permission(config.mask);
    config.permission = permissions.constructMask();
    console.log(config.permission);
    return config;
  } else {
    util.usage();
    exit(1)
  }
}

function exit (status) {
    process.exit(status)
}

module.exports = { start };
