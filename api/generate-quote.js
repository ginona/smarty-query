import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_ACCESS_TOKEN);

function parseQuote(generatedText, category) {
  let text = generatedText;
  let author = 'AI Wisdom';

  const quoteMatch = generatedText.match(/[""]([^""]+)[""][\s-]*([^-\n]+)?/);
  if (quoteMatch) {
    text = quoteMatch[1].trim();
    if (quoteMatch[2]) {
      author = quoteMatch[2].trim();
    }
  } else {
    const parts = generatedText.split(/[\n-]+/).map(part => part.trim());
    if (parts.length > 1) {
      text = parts[0].replace(/["']/g, '').trim();
      author = parts[parts.length - 1];
    }
  }

  return { text, author, tag: category };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category } = req.body;
    const prompt = `Generate a meaningful and inspirational quote about ${category}. The quote should be impactful and thought-provoking.`;

    const chatCompletion = await client.chatCompletion({
      provider: "novita",
      model: "deepseek-ai/DeepSeek-Prover-V2-671B",
      messages: [
        {
          role: "system",
          content: "You are a wise quote generator. You create meaningful, impactful quotes that inspire people. Always format your response as a quote followed by the author's name."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    const generatedText = chatCompletion.choices[0].message.content;
    const quote = parseQuote(generatedText, category);
    
    res.status(200).json(quote);
  } catch (error) {
    console.error('Error generating quote:', error);
    res.status(500).json({ error: 'Failed to generate quote' });
  }
} 