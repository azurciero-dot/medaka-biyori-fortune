import express from "express";
import OpenAI from "openai";

const app = express();

const port = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

app.use(express.static("./"));

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
候補の中から必ず正式な種類名を1つだけ書く。
候補：夜桜、オロチ、楊貴妃、幹之、サファイア、三色ラメ、パンダ

【サブタイトル】
「〇〇メダカ」のように、性格や雰囲気が伝わる短い呼び名を書く。
例：静かにきらめくのんびりメダカ／省エネ上手なひとやすみメダカ

【ひとこと】
短くゆるい一言。

【診断】
やさしく、少し心理テストっぽく説明。

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
