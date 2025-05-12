import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function generateQuote(category) {
  try {
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
    return parseQuote(generatedText, category);
  } catch (error) {
    console.error('Error generating quote:', error);
    return getLocalQuote(category);
  }
}

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

const fallbackQuotes = {
  'Motivation': [
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
  ],
  'Leadership': [
    { text: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell" },
    { text: "Leadership is not about being in charge. It's about taking care of those in your charge.", author: "Simon Sinek" }
  ],
  'Programming': [
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" }
  ],
  'Success': [
    { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" }
  ],
  'Poetic': [
    { text: "Two roads diverged in a wood, and I— I took the one less traveled by, And that has made all the difference.", author: "Robert Frost" },
    { text: "Hope is the thing with feathers that perches in the soul - and sings the tunes without the words - and never stops at all.", author: "Emily Dickinson" }
  ],
  'Random': [
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The universe is not only queerer than we suppose, but queerer than we can suppose.", author: "J.B.S. Haldane" }
  ]
};

function getLocalQuote(category) {
  const availableCategories = Object.keys(fallbackQuotes);
  
  // Si es Random o 'all', elegir una categoría aleatoria
  const targetCategory = category === 'Random' || category === 'all'
    ? availableCategories[Math.floor(Math.random() * availableCategories.length)]
    : category;

  const categoryQuotes = fallbackQuotes[targetCategory] || fallbackQuotes['Motivation'];
  const randomQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];

  return { ...randomQuote, tag: targetCategory };
} 