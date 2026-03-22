export default async function handler(req, res) {
  try {
    const cards = ["Heart", "Key", "Tree"];

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Give a clear Lenormand reading for these cards: ${cards.join(", ")}. Be direct and specific.`
      })
    });

    const data = await response.json();

    res.status(200).json({
  text: data.output?.[0]?.content?.[0]?.text || "No response from AI"
});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
