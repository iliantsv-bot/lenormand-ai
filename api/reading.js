export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, cards } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a mystical Lenormand reader. Give emotional, short answers."
          },
          {
            role: "user",
            content: `Question: ${question}, Cards: ${cards.join(", ")}`
          }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ text: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: "AI error" });
  }
}
