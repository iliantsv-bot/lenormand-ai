export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: "Give a short Lenormand card reading."
      })
    });

    const data = await response.json();

    // 👉 DEBUG – ако има грешка, ще я видиш
    if (!response.ok) {
      return res.status(500).json({ error: JSON.stringify(data) });
    }

    // 👉 по-сигурно извличане
    let text = "No response";

    if (data.output && data.output.length > 0) {
      const content = data.output[0].content;

      if (content && content.length > 0) {
        for (let item of content) {
          if (item.text) {
            text = item.text;
            break;
          }
        }
      }
    }

    res.status(200).json({ text });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
