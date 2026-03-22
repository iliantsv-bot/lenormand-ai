<button onclick="drawCard()">Draw Card</button>

<div id="card"></div>
<div id="result" style="margin-top:20px;font-size:18px;"></div>

<script>
async function drawCard() {
  const result = document.getElementById('result');
  result.innerText = "Loading...";

  try {
    const res = await fetch('/api/reading');
    const data = await res.json();

    console.log(data); // важно за дебъг

    result.innerText = data.text;

  } catch (err) {
    result.innerText = "Error loading AI";
  }
}
</script>
