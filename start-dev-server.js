const execSync = require("child_process").execSync;
require("dotenv").config();

execSync(`webpack-dev-server --hot --colors --port ${process.env.PORT}`, {
  stdio: "inherit",
});
