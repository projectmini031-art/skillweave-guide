import { useState } from "react";
import api from "../services/api";

export default function AIAdvisor() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const res = await api.post("/rag/chat", {
      question: message,
    });

    setChat([...chat, { q: message, a: res.data.answer }]);
    setMessage("");
  };

  return (
    <div className="p-10">
      {chat.map((c, i) => (
        <div key={i}>
          <p><b>You:</b> {c.q}</p>
          <p><b>AI:</b> {c.a}</p>
        </div>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask career question..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
