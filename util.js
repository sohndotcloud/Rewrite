
function usage(message) {
  console.log(message);
  console.log(`
        node main.js
        Rewrite, Other_name_for_same_program(), Yet another name for the same program. -- This line parsed for whatis database.
        SYNOPSIS
        node main.js, [-pd ] [-d path ] 
        `);
}


function isNumeric(str) {
  return typeof str === "string" && str.trim() !== "" && !isNaN(str);
}

function alert() {
  console.log("It's not configured for this");
}

module.exports = { alert, isNumeric, usage }