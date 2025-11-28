import express from "express";
import fetch from "node-fetch";
import cors from "cors";

// Esto era una prueba con el chat para ver si podía coger la 
// APIkey de OPENAI
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer TU_API_KEY_AQUI`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
