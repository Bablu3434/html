const chatBox = document.getElementById("chatBox");

function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if(message === "") return;

    addMessage(message, "user-message");

    setTimeout(() => {
        botReply(message);
    }, 700);

    input.value = "";
}

function addMessage(text, className) {
    const div = document.createElement("div");
    div.className = className;
    div.innerText = text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function botReply(message) {

    let reply = "I don't understand 😅";

    message = message.toLowerCase();

    if(message.includes("hello")){
        reply = "Hello 👋 Nice to meet you!";
    }
    else if(message.includes("how are you")){
        reply = "I'm fine 🤖 What about you?";
    }
    else if(message.includes("your name")){
        reply = "I'm your AI Assistant.";
    }
    else if(message.includes("bye")){
        reply = "Goodbye 👋 Have a nice day!";
    }
    else if(message.includes("good night")){
        reply = " good night and sweet dreem";
    }
    else if(message.includes("good morning")){
        reply = "good morning have a nice day";
    }
    else if(message.includes("hii")){
        reply = "Hii there how can i help you";
    }
    else if(message.includes("youtube")){
        reply = "opening youtube";
        window.open("https://www.youtube.com/", "_blank");
    }
    else if(message.includes("instagram")){
        reply = "opening instagram";
        window.open("https://www.instagram.com/", "_blank");
    }    
    addMessage(reply, "bot-message");

    speak(reply);
}

function speak(text){
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

function startVoice(){

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = function(event){

        const transcript = event.results[0][0].transcript;

        document.getElementById("userInput").value = transcript;

        sendMessage();
    };

    recognition.start();
}