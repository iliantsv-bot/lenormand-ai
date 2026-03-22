<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lenormand AI</title>
</head>
<body>

  <h1>Lenormand AI</h1>

  <button onclick="drawCard()">Draw Card</button>

  <div id="card" style="margin-top:20px;"></div>
  <div id="result" style="margin-top:20px;font-size:18px;"></div>

  <script>
    async function drawCard() {
      const result = document.getElementById('result');
      result.innerText = "Loading...";

      try {
        const res = await fetch('/api/reading');
        const data = await res.json();

        console.log(data);

        result.innerText = data.text;

      } catch (err) {
        result.innerText = "Error loading AI";
      }
    }
  </script>

</body>
</html>
