const fs = require("fs");
const path = require('path');
const file = {};
file.config_path = path.join(__dirname, '../../config/config.json');

file.name_format = ["snake", "camel"];

file.isConfigFilePresent = () => {
    return fs.existsSync(file.config_path);
}
module.exports = file;