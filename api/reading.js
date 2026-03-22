export default async function handler(req, res) {
  try {
    const { spread = "3", q = "", lang = "en" } = req.query;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "Missing OPENAI_API_KEY"
      });
    }

    const spreads = {
      "1": 1,
      "3": 3,
      "5": 5,
      "mirror": 3,
      "yesno": 1
    };

    const count = spreads[spread] || 3;

    const cardsList = [
      "Rider","Clover","Ship","House","Tree","Clouds","Snake","Coffin",
      "Bouquet","Scythe","Whip","Birds","Child","Fox","Bear","Stars",
      "Stork","Dog","Tower","Garden","Mountain","Crossroad","Mice",
      "Heart","Ring","Book","Letter","Man","Woman","Lily","Sun",
      "Moon","Key","Fish","Anchor","Cross"
    ];

    const drawn = cardsList
      .sort(() => 0.5 - Math.random())
      .slice(0, count);

    const prompt = `
You are a professional Lenormand reader.

Language: ${lang === "bg" ? "Bulgarian" : "English"}

Question: ${q}

Cards: ${drawn.join(", ")}

Write:
- Overall Meaning
- Love
- Career
- Advice

IMPORTANT:
If language is Bulgarian, write ONLY in Bulgarian.
`;

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

    // 🔥 ВАЖНО: виж грешката ако има
    if (!response.ok) {
      return res.status(500).json({
        error: data
      });
    }

    const text =
      data.output?.[0]?.content?.[0]?.text ||
      "No interpretation generated.";

    return res.status(200).json({
      cards: drawn,
      text
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message || "Server error"
    });
  }
}
