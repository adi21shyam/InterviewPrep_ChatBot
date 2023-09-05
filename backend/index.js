const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const { OpenAI} = require("openai");

const api_Key= "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";




const app = express();
app.use(bodyParser.json())
app.use(cors());

const openai = new OpenAI({
    apiKey:api_Key
})

app.post("/chat", async(req,res)=>{
    var {searchData} = req.body;
    console.log(searchData,"searchData");
    searchData +=`in the given format {
        "questions": [
        {
        "question": "What does HTML stand for?",
        "options": [
        "Hypertext Markup Language",
        "High Text Machine Language",
        "Hyperloop Text Machine Learning",
        "None of the above"
        ,
        "answer": "a"
        }]}`
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          "role": "user",
          "content": searchData
        }
      ],
      temperature: 1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response)
    return res.status(200).send(response?.choices[0]?.message?.content)

    // res.send(completion.data.choices[0].text);/
})

const port = 8080;
app.listen(port,()=>{
    console.log(`Server listenting on port ${port}`);
})