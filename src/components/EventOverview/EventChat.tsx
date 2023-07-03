import common from "@/styles/common.module.scss"
import c from "@/components/EventOverview/eventOverview.module.scss"


// interface Message {
//   sender: string;
//   content: string;
// }


// class Chat {
//   private messages: Message[];

//   constructor() {
//     this.messages = [];
//   }


//   public sendMessage(sender: string, content: string): void {
//     const message: Message = {
//       sender: sender,
//       content: content,
//     };
//     this.messages.push(message);
//     this.renderMessages();
//   }


//   public renderMessages(): void {
//     const chatMessages = document.getElementById("chat-messages");
//     chatMessages.innerHTML = "";
//     for (const message of this.messages) {
//       const messageElement = document.createElement("div");
//       messageElement.innerText = `${message.sender}: ${message.content}`;
//       chatMessages.appendChild(messageElement);
//     }
//   }
// }

// const chat = new Chat();
// const chatForm = document.getElementById("chat-form");

// chatForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const senderInput = document.getElementById("sender-input") as HTMLInputElement;
//   const contentInput = document.getElementById("content-input") as HTMLInputElement;
//   const sender = senderInput.value;
//   const content = contentInput.value;
//   chat.sendMessage(sender, content);
//   senderInput.value = "";
//   contentInput.value = "";
// });


const EventChat = () => {
  return (
      <div className={c.chat}>
          <h2>Chat</h2>
          <div id="chat-messages"></div>
          <form id="chat-form">
            <input type="text" id="sender-input" placeholder="Absender" required />
            <input type="text" id="content-input" placeholder="Nachricht" required />
            <button type="submit">Senden</button>
          </form>
          <script>
            
          </script>
      </div>
  );
}

export default EventChat;