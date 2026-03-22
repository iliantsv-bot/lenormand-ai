<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Lenormand AI</title>

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

select, button {
  padding: 12px;
  font-size: 16px;
  margin: 10px;
}

button {
  background: gold;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.cards {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.card {
  width: 100px;
  height: 140px;
  background: linear-gradient(135deg, #222, #444);
  border: 2px solid gold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  padding: 5px;
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

<select id="spread">
  <option value="1">1 Card</option>
  <option value="3">3 Cards</option>
  <option value="5">5 Cards</option>
  <option value="mirror">Mirror Spread</option>
  <option value="yesno">Yes / No</option>
  <option value="full">Full Reading</option>
</select>

<br>

<button onclick="drawCards()">Draw Cards</button>

<div class="cards" id="cards"></div>
<div id="result"></div>

<script>
async function drawCards() {
  const result = document.getElementById("result");
  const cardsDiv = document.getElementById("cards");
  const type = document.getElementById("spread").value;

  result.innerText = "Reading...";
  cardsDiv.innerHTML = "";

  try {
    const res = await fetch(`/api?spread=${type}`);
    const data = await res.json();

    console.log(data);

    // fallback ако има грешка
    if (!data.cards) {
      result.innerText = JSON.stringify(data);
      return;
    }

    // показваме картите
    data.cards.forEach(card => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerText = card;
      cardsDiv.appendChild(div);
    });

    // показваме текста
    result.innerText = data.text || "No response";

  } catch (err) {
    result.innerText = "Error: " + err.message;
  }
}
</script>

</body>
</html>
