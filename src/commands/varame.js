const { Configuration, OpenAIApi } = require("openai");
const file = require("../utils/file");
const fs = require("fs");

function varame(input, cmd) {
    if (file.isConfigFilePresent()){
        let config = checkAllSettingsConfigured();
        if (config !== false){
            let openai = createOpenAIApi(config.key);
            let prompt = makePrompt(input, cmd, config.number, config.Format);
            chatCompletion(openai, prompt);
        }
    }else{
        console.log("configuration does not exist");
    }
}

function makePrompt(input, cmd, number, Format){
    let prompt = input + "\n";
    prompt += "위 설명은 " + findTarget(cmd.variable, cmd.function) + "에 관한 설명이야. 설명에 어울리는 이름 "
            + number + "개를 추천해줘." + Format +  "case로 뽑아줘.";
    return prompt;
}

function findTarget(variable, func) {
    let target = "";
    if (variable === false && func === false) {
        target = "변수이름, 함수이름";
    }else{
        if (variable !== false){
            target += "변수이름, ";
        }
        if (func !== false){
            target += "함수이름, ";
        }
    }
    return target;
}

function checkAllSettingsConfigured(){
    let config = JSON.parse(fs.readFileSync(file.config_path).toString());
    if (config.number !== "" && config.Format !== "" && config.key !== ""){
        return config;
    }else{
        console.log("Settings are incomplete.");
        return false;
    }
}
function createOpenAIApi(apiKey) {
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    return new OpenAIApi(configuration);
}

async function chatCompletion(openai, prompt){
    startLoadingMessage();
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
    });
    stopLoadingMessage();
    console.log(chatCompletion.data.choices[0].message.content);
    // return chatCompletion.data.choices[0].message.content;
}

const startLoadingMessage = () => {
    let count = 0;
    loadingMessageInterval = setInterval(() => {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("Processing" + ".".repeat(count));
        count = (count + 1) % 4;
    }, 300);
};

const stopLoadingMessage = () => {
    clearInterval(loadingMessageInterval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
};

module.exports = {
    varame
}