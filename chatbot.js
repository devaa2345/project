document.addEventListener("DOMContentLoaded", () => {
  // Inject chatbot HTML
  document.body.insertAdjacentHTML("beforeend", `
    <div id="chatbot-container" class="hidden">
      <div id="chat-header">✨ Tour Guide ✨</div>
      <div id="chat-body">
        <div class="message bot">Hello! How can I help you explore?</div>
      </div>
      <div id="chat-footer">
        <input type="text" id="chat-input" placeholder="Type your question..." />
        <button id="send-btn">Send</button>
      </div>
    </div>
    <button id="toggle-chat">💬</button>
  `);

  const chatContainer = document.getElementById("chatbot-container");
  const chatBody = document.getElementById("chat-body");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const toggleBtn = document.getElementById("toggle-chat");

  // Toggle visibility
  toggleBtn.addEventListener("click", () => {
    chatContainer.classList.toggle("hidden");
  });

  // Context-aware mock AI with short & long replies
  function getResponse(text) {
    const t = text.toLowerCase().trim();
    const isLong = t.length >= 15;

    // Greetings
    if (t.includes("hello") || t.includes("hi")) return "Hey there! Ready to explore the eras of history?";
    if (t.includes("how are you")) return "I'm awesome! Ready to guide you through time!";

    // Stone Age
    if (t.includes("stone")) {
      return isLong
        ? "The Stone Age was the dawn of human civilization. People mastered survival with primitive tools, discovered fire, and laid the foundation of innovation. It's fascinating how humans adapted to the wild!"
        : "The Stone Age: tools, fire, survival!";
    }

    // Medieval Age
    if (t.includes("medieval")) {
      return isLong
        ? "Medieval times were filled with castles, knights, and kingdoms. Society was organized around feudal systems, chivalry was prized, and magnificent cathedrals were built. Truly a fascinating era!"
        : "Medieval: castles, knights, kingdoms!";
    }

    // Industrial Era
    if (t.includes("industrial")) {
      return isLong
        ? "The Industrial Era revolutionized the world. Steam engines, factories, and mass production transformed societies from agrarian to industrial. Transportation, communication, and daily life all changed dramatically!"
        : "Industrial Era: factories and steam!";
    }

    // Future Era
    if (t.includes("future")) {
      return isLong
        ? "The Future Era is an age of technology, AI, space exploration, and digital connectivity. Humanity continues to innovate, reshaping the world and pushing the boundaries of what’s possible!"
        : "Future Era: AI and tech wonders!";
    }

    // Default fallback
    return isLong
      ? "That's an interesting question! Time travel is full of surprises, and I’m here to guide you through history and beyond. Ask me anything about the eras!"
      : "Interesting! Let's explore history!";
  }

  // Send message
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Show user message
    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);
    input.value = "";

    // Show bot typing
    const botMsg = document.createElement("div");
    botMsg.className = "message bot";
    botMsg.textContent = "Typing...";
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate typing delay
    setTimeout(() => {
      botMsg.textContent = getResponse(text);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
