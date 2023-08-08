const file = require("../utils/file");
const fs = require("fs");
function config() {
    if (file.isConfigFilePresent()){
        let config = JSON.parse(fs.readFileSync(file.config_path).toString());
        console.log("number: " + config.number);
        console.log("Format: " + config.Format);
        console.log("key: " + config.key);
    }else{
        console.log("No configuration\nPlease set config <varame set>");
    }
}

module.exports = {
    config
}