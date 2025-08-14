const fs = require("fs");
const { permissionLevel } = require('./permission');

class Config {
  constructor() {
    this.directory = "";
    this.mask = 0;
    this.permission = undefined;
  }

  calculateValue() {
    if (this.permission === undefined) {
      return undefined;
    }

    let userLevel = this.permission.userLevel;
    let groupLevel = this.permission.groupLevel;
    let otherLevel = this.permission.otherLevel;
    let value = this.getMappedValue(userLevel);
    value |= this.getMappedValue(groupLevel);
    value |= this.getMappedValue(otherLevel);    
    return value;
  }

  getMappedValue(level) {
    let mappedValue = [
      {
        user: {
          "All": fs.constants.S_IRWXU,
          "Read": fs.constants.S_IRUSR,
          "Write": fs.constants.S_IWUSR,
          "Exec": fs.constants.S_IXUSR,
        },
      },
      {
        group: {
          "All": fs.constants.S_IRWXG,
          "Read": fs.constants.S_IRGRP,
          "Write": fs.constants.S_IWGRP,
          "Exec": fs.constants.S_IXGRP,
        },
      },
      {
        other: {
          "All": fs.constants.S_IRWXO,
          "Read": fs.constants.S_IROTH,
          "Write": fs.constants.S_IWOTH,
          "Exec": fs.constants.S_IXOTH,
        },
      },
    ];
    let object;
    let value = 0;
    if (level.Type === permissionLevel.User) {
      object = mappedValue[0][permissionLevel.User];
    } else if (level.Type === permissionLevel.Group) {
      object = mappedValue[1][permissionLevel.Group];
    } else if (level.Type === permissionLevel.Other) {
      object = mappedValue[2][permissionLevel.Other];
    }

    if (level.Read) {
      value |= object["Read"];
    }

    if (level.Write) {
      value |= object["Write"];
    }

    if (level.Exec) {
      value |= object["Exec"];
    }
    console.log(value);
    return value;
  }
}
module.exports = Config;
