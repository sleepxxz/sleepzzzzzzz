import { useState } from "react";

export default function SensiGPTApp() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: userInput }]);

    const aiResponse = await getSensiResponse(userInput);

    setChatHistory((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    setUserInput("");
  };

  const getSensiResponse = async (input) => {
    if (input.toLowerCase().includes("capa")) {
      return "Recomendo: Geral 95, Red Dot 82, 2X 72, 4X 62, AWM 50. DPI: 600.";
    } else if (input.toLowerCase().includes("controle")) {
      return "Recomendo: Geral 75, Red Dot 65, 2X 60, 4X 55, AWM 45. DPI: 500.";
    }
    return "Me conta mais sobre seu celular e estilo de jogo para eu sugerir!";
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', color: '#a855f7' }}>🎯 SensiGPT</h1>
      <div style={{ border: '1px solid #333', height: '400px', overflowY: 'scroll', marginBottom: '10px', padding: '10px' }}>
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            style={{ textAlign: msg.sender === "user" ? "right" : "left", color: msg.sender === "ai" ? "#4ade80" : "#fff", marginBottom: '5px' }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          style={{ flex: 1, padding: '10px' }}
          placeholder="Digite sua dúvida de sensi..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button style={{ padding: '10px', backgroundColor: '#a855f7', color: '#fff', border: 'none' }} onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}
