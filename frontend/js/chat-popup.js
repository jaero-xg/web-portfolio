const chatButton = document.getElementById("chat-button");
const chatOverlay = document.getElementById("chat-overlay");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-message");
const chatBody = document.getElementById("chat-body");
const emailInput = document.getElementById("user-email");

let userEmail = "";

// Open chat
chatButton.addEventListener("click", () => {
  chatOverlay.style.display = "flex";
  chatButton.style.display = "none";
});

// Close chat
closeChat.addEventListener("click", () => {
  chatOverlay.style.display = "none";
  chatButton.style.display = "flex";
});

// Validate email live
emailInput.addEventListener("input", () => {
  const emailValue = emailInput.value.trim();
  if (validateEmail(emailValue)) {
    userEmail = emailValue;
    userInput.disabled = false;
    sendBtn.disabled = false;
  } else {
    userInput.disabled = true;
    sendBtn.disabled = true;
  }
});

// Send message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "" || !userEmail) return;

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message", "user");
  msgDiv.textContent = message;
  chatBody.appendChild(msgDiv);
  userInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // Bot reply
  setTimeout(() => {
    const botReply = document.createElement("div");
    botReply.classList.add("chat-message", "bot");
    botReply.textContent =
      "Thanks for your message! I’ll get back to you soon. 😊";
    chatBody.appendChild(botReply);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1000);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
