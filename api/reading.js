export default async function handler(req, res) {
  try {
    const { spread = "3", q = "", lang = "en" } = req.query;

    // 🎴 Видове разкладки
    const spreads = {
      "1": 1,
      "3": 3,
      "5": 5,
      "mirror": 3,
      "yesno": 1
    };

    // 🃏 36 Lenormand карти (коригирано Crossroads)
    const cardsList = [
      "Rider","Clover","Ship","House","Tree","Clouds","Snake","Coffin","Bouquet",
      "Scythe","Whip","Birds","Child","Fox","Bear","Stars","Stork","Dog",
      "Tower","Garden","Mountain","Crossroads","Mice","Heart","Ring","Book",
      "Letter","Man","Woman","Lily","Sun","Moon","Key","Fish","Anchor","Cross"
    ];

    const count = spreads[spread] || 3;

    // 🎲 Разбъркване и избор
    const drawn = [...cardsList]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);

    const isBG = lang === "bg";

    // 🔥 СТРОГ ЕЗИКОВ КОНТРОЛ
    const languageInstruction = isBG
      ? "Пиши ИЗЦЯЛО на български език. Забранено е използването на английски."
      : "Write ONLY in English. Do not use Bulgarian.";

    // 🧠 СТРУКТУРА
    const structure = isBG
      ? `
Общо значение:
Любов:
Кариера:
Съвет:
`
      : `
Overall Meaning:
Love:
Career:
Advice:
`;

    const prompt = `
${languageInstruction}

You are a highly skilled professional Lenormand reader.

User question:
${q}

Cards drawn:
${drawn.join(", ")}

Give a clear, specific and realistic interpretation.

${structure}

Rules:
- No generic text
- Be direct and insightful
- Make it feel personal
- Keep strong clarity
`;

    // 🤖 OpenAI заявка
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": \`Bearer \${process.env.OPENAI_API_KEY}\`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await response.json();

    let text =
      data.output?.[0]?.content?.[0]?.text ||
      data.output_text ||
      "";

    // 🛡️ Защита от празен отговор
    if (!text || text.length < 30) {
      text = isBG
        ? "Възникна проблем при генериране на тълкуване. Опитайте отново."
        : "Error generating interpretation. Please try again.";
    }

    // ✅ Отговор към сайта
    res.status(200).json({
      cards: drawn,
      text
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
