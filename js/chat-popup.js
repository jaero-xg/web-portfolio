// Local Knowledge-Based Chatbot for Portfolio
document.addEventListener("DOMContentLoaded", () => {
  const chatBtn = document.getElementById("chat-button");
  const chatOverlay = document.getElementById("chat-overlay");
  const closeBtn = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-message");
  const chatBody = document.getElementById("chat-body");

  // 1. Knowledge base (expandable)
  const knowledgeBase = [
    {
      question: "what are you",
      answer:
        "I’m Amer-AI, a virtual assistant for John Amer R. Royo’s portfolio. I’m here to help you learn about his skills, projects, and experience! I don’t think or browse the internet like real AI—I only provide answers based on the information John Amer has shared here, like his resume, education, portfolio projects, and technical skills. You can ask me about his work, certificates, or contact details, and I’ll give you the answers instantly. If I don’t know something, I’ll suggest reaching out via his email: royojohnamer@gmail.com",
    },
    {
      question: "hello",
      answer:
        "Hi there, you can ask me anything about John Amer but his personals",
    },
    { question: "name", answer: "His full name is John Amer R. Royo." },
    {
      question: "skills",
      answer: "He is skilled in React, Flutter, AR development, and Figma.",
    },
    {
      question: "experience",
      answer:
        "He is a university lecturer and have completed internships in tech companies.",
    },
    {
      question: "education",
      answer:
        "He have a BS in Information Technology from Romblon State University.",
    },
    {
      question: "masters",
      answer: "John Amer doesn't have Masters Degree yet.",
    },
    {
      question: "projects",
      answer: "John Amer have worked on AR apps, websites, and UI/UX projects.",
    },
    {
      question: "email",
      answer: "You can contact him at royojohnamer@gmail.com.",
    },
  ];

  // 2. Toggle Chat Overlay
  chatBtn.onclick = () => {
    chatOverlay.style.display = "flex";
    chatBtn.style.display = "none";
  };
  closeBtn.onclick = () => {
    chatOverlay.style.display = "none";
    chatBtn.style.display = "flex";
  };

  // 3. Helper to add message bubbles
  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `chat-message ${type}`;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // 4. Get answer from knowledge base
  function getAnswer(message) {
    const lower = message.toLowerCase();
    for (let item of knowledgeBase) {
      if (lower.includes(item.question)) {
        return item.answer;
      }
    }
    return "I don't have an answer to that. Please email royojohnamer@gmail.com.";
  }

  // 5. Handle sending messages
  function handleChat() {
    const message = userInput.value.trim();
    if (!message) return;

    // Show user message
    addMessage(message, "user");
    userInput.value = "";

    // Show bot typing animation
    const botBubble = document.createElement("div");
    botBubble.className = "chat-message bot typing";
    botBubble.innerHTML = "<span></span><span></span><span></span>";
    chatBody.appendChild(botBubble);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate short delay then show answer
    setTimeout(() => {
      botBubble.classList.remove("typing");
      botBubble.textContent = getAnswer(message);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 800); // 0.8s delay for typing effect
  }

  // 6. Event listeners
  sendBtn.onclick = handleChat;
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleChat();
    }
  });

  // 7. Initial bot message
  addMessage("Hey there 👋 — Ask me anything about Amer!", "bot");
});
