export default async function handler(req, res) {
  try {
    const { spread = "3", q = "", lang = "en" } = req.query;

    const spreads = {
      "1": 1,
      "3": 3,
      "5": 5,
      "mirror": 3,
      "yesno": 1
    };

    const cardsList = [
      "Rider","Clover","Ship","House","Tree","Clouds","Snake","Coffin","Bouquet",
      "Scythe","Whip","Birds","Child","Fox","Bear","Stars","Stork","Dog",
      "Tower","Garden","Mountain","Crossroad","Mice","Heart","Ring","Book",
      "Letter","Man","Woman","Lily","Sun","Moon","Key","Fish","Anchor","Cross"
    ];

    const count = spreads[spread] || 3;

    const shuffled = [...cardsList].sort(() => 0.5 - Math.random());
    const drawn = shuffled.slice(0, count);

    // 🔥 ЕЗИК
    const languageInstruction = lang === "bg"
      ? "Отговаряй САМО на български език. Без английски. Пиши ясно, естествено и професионално."
      : "Answer ONLY in English.";

    // 🔥 PROMPT
    const prompt = `
${languageInstruction}

You are a professional Lenormand reader.

Question: ${q}

Cards: ${drawn.join(", ")}

Give a structured reading with:
- Overall meaning
- Love
- Career
- Advice

Important:
- Be specific
- Be clear
- Avoid generic text
- Make it feel personal
`;

    // 🔥 API CALL
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await response.json();

    // 🔥 SAFE OUTPUT
    const text =
      data.output?.[0]?.content?.[0]?.text ||
      data.output_text ||
      "No response";

    res.status(200).json({
      cards: drawn,
      text: text
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
