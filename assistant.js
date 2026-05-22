const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", async () => {
  const message = userInput.value;

  if (message.trim() === "") {
    return;
  }

  chatBox.innerHTML += `
    <div class="message user">
      ${message}
    </div>
  `;

  userInput.value = "";

  const response = await fetch("http://localhost:5000/assistant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  chatBox.innerHTML += `
    <div class="message bot">
      ${data.reply}
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;
});