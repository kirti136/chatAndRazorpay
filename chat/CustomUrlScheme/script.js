document.addEventListener("DOMContentLoaded", function () {
  console.log("WhatsApp Integration Example Loaded");
});

function sendMessage() {
  var userMessage = document.getElementById("userMessage").value;
  var adminPhoneNumber = "7517516048"; 
  var url =
    "whatsapp://send?phone=" +
    adminPhoneNumber +
    "&text=" +
    encodeURIComponent(userMessage);
  window.location.href = url;
}
