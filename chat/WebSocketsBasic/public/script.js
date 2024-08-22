const socket = io();
let username = "";

function joinChat() {
  username = document.getElementById("usernameInput").value;
  if (username.trim() !== "") {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("chatContainer").style.display = "block";
    socket.emit("new user", username);
  }
}

function sendMessage() {
  const chatInput = document.getElementById("chatInput");
  const message = chatInput.value;

  if (message.trim() !== "") {
    socket.emit("message", message);
    chatInput.value = "";
  }
}

socket.on("message", (message) => {
  const chatMessages = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
// socket.on("message", (data) => {
//   const chatMessages = document.getElementById("chatMessages");
//   const messageDiv = document.createElement("div");
//   messageDiv.className =
//     data.sender === username ? "sent-message" : "received-message";
//   messageDiv.textContent = `${data.sender}: ${data.message}`;
//   chatMessages.appendChild(messageDiv);
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });
