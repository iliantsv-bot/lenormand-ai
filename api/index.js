export default async function handler(req, res) {
  try {
    const cardsList = [
      "Rider","Clover","Ship","House","Tree","Clouds","Snake","Coffin",
      "Bouquet","Scythe","Whip","Birds","Child","Fox","Bear","Stars",
      "Stork","Dog","Tower","Garden","Mountain","Crossroads","Mice",
      "Heart","Ring","Book","Letter","Man","Woman","Lily","Sun",
      "Moon","Key","Fish","Anchor","Cross"
    ];

    const drawn = cardsList.sort(() => 0.5 - Math.random()).slice(0, 3);

    const prompt = `
You are a professional Lenormand reader.

Cards: ${drawn.join(", ")}

Give a full interpretation in минимум 120 думи.
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

    // 🔥 ВАЖНО – показва грешката ако има
    if (!response.ok) {
      return res.status(500).json({
        error: data
      });
    }

    const text =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "No interpretation";

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
