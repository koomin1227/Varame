const { Configuration, OpenAIApi } = require("openai");
const file = require("../utils/file");



function createGpt(apiKey) {
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    return new OpenAIApi(configuration);
}

async function chatCompletion(openai, prompt){
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
    });
    stopLoadingMessage();
    console.log(chatCompletion.data.choices[0].message.content);
    return chatCompletion.data.choices[0].message.content;
}

const startLoadingMessage = () => {
    let count = 0;
    loadingMessageInterval = setInterval(() => {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("처리 중" + ".".repeat(count));
        count = (count + 1) % 4;
    }, 300);
};

const stopLoadingMessage = () => {
    clearInterval(loadingMessageInterval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log("처리 완료!");
};

let api = "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";
startLoadingMessage();
chatCompletion(createGpt(api), "텍스트가 들어오면 숫자로만 이루어져있는지 알려주는 함수 이름을 5개 추천해줘. 카멜 케이스로 뽑아줘")
    .then((response) => {

        console.log("hello");
    }
)

// gpt(api);