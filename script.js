let prompt = document.querySelector(".prompt");
let container = document.querySelector(".container");
let chatContainer = document.querySelector(".chat-container");
let btn = document.querySelector(".btn");
let userMessage = null;

let Api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA76-_bVdA36SMrotAtWBctRdoCdlkZDK8';

function createChatBox(html, className) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

async function generateApiResponse(aiChatBox) {
    const textElement = aiChatBox.querySelector(".text");
    try {
        const response = await fetch(Api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    "role": "user",
                    "parts": [{ text: `${userMessage} in 100 words` }]
                }]
            })
        });
        const data = await response.json();
        const apiResponse = data?.candidates[0].content.parts[0].text.trim();
        textElement.innerText = apiResponse;

    } catch (error) {
        console.log(error);
    } finally {
        aiChatBox.querySelector(".loading").style.display = "none";
    }
}

function showLoading() {
    const html = `
        <div id="img">
            <img src="ai.png" alt="">
        </div>
        <div class="text"></div>
        <img src="loading.gif" alt="" height="50" class="loading">`;
    
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    generateApiResponse(aiChatBox);
}

function handleUserInput() {
    userMessage = prompt.value;
    if (userMessage === "") {
        container.style.display = "flex";
        return;
    } else {
        container.style.display = "none";
    }

    const html = `
        <div id="img">
            <img src="user.png" alt="">
        </div>
        <div class="text"></div>`;
    
    let userChatBox = createChatBox(html, "user-chat-box");
    userChatBox.querySelector(".text").innerText = userMessage;
    chatContainer.appendChild(userChatBox);
    prompt.value = "";
    setTimeout(showLoading, 500);
}

btn.addEventListener("click", handleUserInput);

// Add the keydown event listener for the "Enter" key
prompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleUserInput();
    }
});

function setViewport() {
  var viewportMeta = document.querySelector("meta[name='viewport']");

  // Check the device type
  if (window.innerWidth <= 600) {
    // Mobile devices
    viewportMeta.setAttribute("content", "width=device-width, initial-scale=0.4");
  } else if (window.innerWidth <= 1024) {
    // Tablet devices
    viewportMeta.setAttribute("content", "width=device-width, initial-scale=0.4");
  } else {
    // Desktop devices
    viewportMeta.setAttribute("content", "width=device-width, initial-scale=0.4");
  }
  // Check the device type
  if (window.innerWidth <= 1900) {
    // Mobile devices
    viewportMeta.setAttribute("content", "width=device-width, initial-scale=0.4");
  } else if (window.innerWidth <= 1948) {
    // Tablet devices
    viewportMeta.setAttribute("content", "width=device-width, initial-scale=0.4");
  } else {
    // Desktop devices
    viewportMeta.setAttribute("content", "width=device-width, initial-scale=0.4");
  }
}
