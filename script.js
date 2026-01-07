const chat = document.getElementById("chat");
const input = document.getElementById("message");

// ⚠️ इथे तुझा AWS backend API येईल
const API_URL = "https://allinonestopdeals.com/api/aix/chat";

function add(role, text) {
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.innerText = `${role.toUpperCase()}: ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  add("user", text);
  input.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    add("aix", data.reply || "No response");

  } catch (e) {
    add("aix", "Connection error");
  }
}
