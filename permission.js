const permissionLevel = Object.freeze({
  User: "user",
  Group: "group",
  Other: "other",
  All: "all",
});

class Permission {
  constructor(mask) {
    this.mask = mask;
  }

  getRoles(level, mask) {
    let read = false,
      write = false,
      exec = false;
    console.log(level, mask);
    if (mask % 2 == 1) {
      exec = true;
    }
    if (mask != 0 && ((mask > 1 && mask < 4) || (mask > 5 && mask <= 7))) {
      write = true;
    }

    if (mask >= 4) {
      read = true;
    }

    return Object.freeze({
      Type: level,
      Read: read,
      Write: write,
      Exec: exec,
    });
  }

  constructMask() {
    const userMask = Math.floor(this.mask / 100);
    const groupMask = Math.floor((this.mask % 100) / 10);
    const otherMask = this.mask % 10;
    console.log("Permission Settings");
    const userLevel = this.getRoles(permissionLevel.User, userMask);
    const groupLevel = this.getRoles(permissionLevel.Group, groupMask);
    const otherLevel = this.getRoles(permissionLevel.Other, otherMask);

    return { userLevel, groupLevel, otherLevel };
  }
}

module.exports = { Permission, permissionLevel };
