import fs from 'fs';
import fetch from 'node-fetch';

const PDF_URL = 'https://www.metoffice.gov.uk/public/data/v1/mountain/snowdonia.pdf';
const OUTPUT_FILE = 'weather.html';

async function fetchAndWrapPDF() {
  try {
    const res = await fetch(PDF_URL);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync('forecast.pdf', Buffer.from(buffer));

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Snowdonia Mountain Forecast PDF</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; text-align: center; }
    iframe { width: 100%; height: 90vh; border: none; }
  </style>
</head>
<body>
  <h1>Snowdonia Mountain Forecast</h1>
  <iframe src="forecast.pdf"></iframe>
</body>
</html>`;
    fs.writeFileSync(OUTPUT_FILE, html);
    console.log("✅ PDF and HTML saved.");
  } catch (err) {
    console.error("❌ Error fetching PDF:", err);
  }
}

fetchAndWrapPDF();
