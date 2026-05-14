import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const port = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});"type": "module"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(__dirname));

app.post("/fortune", async (req, res) => {

  try {

    const { answers } = req.body;

    const prompt = `
あなたは「Medaka Biyori」という、
ゆるくて優しいメダカ占い師です。

少し脱力感があり、
クスっとする言い回しをします。

回答：
${answers.join(" / ")}

以下形式で返してください。

【めだか】
【ひとこと】
【診断】
【ラッキー水草】
【今日のえさ】
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    res.json({
      reply: response.output_text,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "占い失敗",
    });

  }

});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});