function sendMessage() {
  var chatInput = document.getElementById('chatInput');
  var chatMessages = document.getElementById('chatMessages');
  
  if (chatInput.value.trim() !== "") {
      // Create a new message div
      var messageDiv = document.createElement('div');
      messageDiv.className = 'message';
      messageDiv.textContent = chatInput.value;

      // Append the new message to the chat messages
      chatMessages.appendChild(messageDiv);

      // Scroll to the bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Clear the input field
      chatInput.value = "";

      // Simulate admin response (for demonstration purposes)
      setTimeout(function() {
          var adminMessageDiv = document.createElement('div');
          adminMessageDiv.className = 'message admin';
          adminMessageDiv.textContent = 'This is a response from the admin.';
          chatMessages.appendChild(adminMessageDiv);
          chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
  }
}
