export const PORT = 3000;
import OpenAI from "openai";
const openai = new OpenAI();
const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    store: true,
    messages: [
        {"role": "user", "content": "write a haiku about ai"}
    ]
});

export const mongoDBURL = 'mongodb+srv://admin:admin@storytelling.lm2xo.mongodb.net/?retryWrites=true&w=majority&appName=Storytelling'
