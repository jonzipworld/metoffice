const fetch = require("node-fetch");
const fs = require("fs");
const cheerio = require("cheerio");

const URL = "https://www.metoffice.gov.uk/weather/specialist-forecasts/mountain/snowdonia";

(async () => {
  try {
    const res = await fetch(URL);
    const html = await res.text();
    const $ = cheerio.load(html);

    const mainContent = $(".forecast-text, .tab-content").html();

    const output = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Snowdonia Forecast</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 2rem;
      background: #f5f9ff;
      max-width: 800px;
      margin: auto;
    }
    h1 { color: #003c71; }
  </style>
</head>
<body>
  <h1>Snowdonia Mountain Forecast</h1>
  ${mainContent}
  <footer><p style="font-size: 0.9em; color: #888;">Source: <a href="${URL}">${URL}</a></p></footer>
</body>
</html>`;
    fs.writeFileSync("weather.html", output);
    console.log("✅ Forecast saved to weather.html");
  } catch (err) {
    console.error("❌ Failed to fetch forecast:", err);
  }
})();
