<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Lenormand AI Reading</title>

<style>
body {
  background: #0b0b0b;
  color: white;
  font-family: Arial;
  text-align: center;
  padding: 30px;
}

h1 {
  margin-bottom: 20px;
}

button {
  padding: 14px 28px;
  font-size: 18px;
  background: gold;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}

.cards {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.card {
  width: 110px;
  height: 150px;
  background: linear-gradient(135deg, #222, #444);
  border: 2px solid gold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-align: center;
  padding: 10px;
}

#result {
  margin-top: 30px;
  font-size: 18px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}
</style>

</head>
<body>

<h1>🔮 Lenormand AI Reading</h1>

<button onclick="drawCards()">Draw Cards</button>

<div class="cards" id="cards"></div>
<div id="result"></div>

<script>

// всички 36 карти (за визуализация при нужда)
const allCards = [
"Rider","Clover","Ship","House","Tree","Clouds",
"Snake","Coffin","Bouquet","Scythe","Whip","Birds",
"Child","Fox","Bear","Stars","Stork","Dog",
"Tower","Garden","Mountain","Crossroads","Mice","Heart",
"Ring","Book","Letter","Man","Woman","Lily",
"Sun","Moon","Key","Fish","Anchor","Cross"
];

async function drawCards() {
  const result = document.getElementById("result");
  const cardsDiv = document.getElementById("cards");

  result.innerText = "Reading your future...";
  cardsDiv.innerHTML = "";

  try {
    // Викаме API (който вече тегли 3 карти)
    const res = await fetch("/api");
    const data = await res.json();

    // Показваме картите
    data.cards.forEach(card => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerText = card;
      cardsDiv.appendChild(div);
    });

    // Показваме AI текста
    result.innerText = data.text;

  } catch (err) {
    result.innerText = "Error loading AI";
  }
}

</script>

</body>
</html>
