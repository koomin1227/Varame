const fs = require("fs");
const file = require('../utils/file');

function set(cmd) {
    if (!file.isConfigFilePresent())
        makeConfig();
    let config = JSON.parse(fs.readFileSync(file.config_path).toString());
    try{
        setConfig(config, cmd.number, cmd.Format, cmd.key);
        saveConfig(config);
    }catch (e) {
        console.log(e.message);
    }
}

function setConfig(config, number, Format, key){
    if (number !== false)
        setNumber(config, number);
    if (Format !== false)
        setFormat(config, Format);
    if (key !== false)
        config.key = key;
}

function setNumber(config, number){
    const regex = /^[0-9]+$/;
    if (regex.test(number) && Number(number) <= 10){
        config.number = number;
    }else{
        throw new Error("<number> is not a number");
    }
}

function setFormat(config, Format){
    if (file.name_format.indexOf(Format.toLowerCase()) !== -1){
        config.Format = Format;
    }else{
        throw new Error("<Format> Invalid format");
    }
}

function makeConfig() {
    let config = {};
    config.number = "";
    config.Format = "";
    config.key = "";
    saveConfig(config);
}

function saveConfig(config) {
    fs.writeFileSync(file.config_path, JSON.stringify(config, null, 2));
}


module.exports = {
    set
};