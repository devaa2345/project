import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Replace this with your Hugging Face token
const HF_API_KEY = "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";

app.use(bodyParser.json());
app.use(express.static(".")); // serves your HTML files

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: userMessage })
    });

    const data = await response.json();
    let botReply = "Sorry, I didn’t get that.";

    if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      botReply = data[0].generated_text;
    }

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ reply: "Error connecting to AI." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
