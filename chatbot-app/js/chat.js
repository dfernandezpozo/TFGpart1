document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");

  
  let historial = [];

  
  async function obtenerRespuesta(texto) {
    // Guardamos el mensaje del usuario 
    historial.push({ role: "user", content: texto });

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historial }),
      });

      const data = await response.json();
      const respuesta = data.choices[0].message.content;

      // Guardamos la respuesta del bot 
      historial.push({ role: "assistant", content: respuesta });

      return respuesta;
    } catch (error) {
      console.error("Error al obtener respuesta:", error);
      return "Lo siento, hubo un error al procesar tu mensaje 😢";
    }
  }

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const texto = userInput.value.trim();
    if (!texto) return;

    
    agregarMensaje(texto, "user-message");

    // Limpiar campo de entrada
    userInput.value = "";

    // Mostrar "escribiendo..." mientras llega la respuesta
    const typingMsg = document.createElement("div");
    typingMsg.classList.add("bot-message");
    typingMsg.textContent = "Escribiendo...";
    chatBox.appendChild(typingMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

   
    const respuesta = await obtenerRespuesta(texto);

    // Reemplazar mensaje "escribiendo..." con la respuesta real
    typingMsg.textContent = respuesta;
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  function agregarMensaje(texto, clase) {
    const msg = document.createElement("div");
    msg.classList.add(clase);
    msg.textContent = texto;
    chatBox.appendChild(msg);
  }
});
