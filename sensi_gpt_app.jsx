import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function SensiGPTApp() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Adiciona mensagem do usuário ao histórico
    setChatHistory((prev) => [...prev, { sender: "user", text: userInput }]);

    // Simula resposta da IA
    const aiResponse = await getSensiResponse(userInput);

    setChatHistory((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    setUserInput("");
  };

  const getSensiResponse = async (input) => {
    // Aqui você integraria com a API do GPT (ou outra IA)
    // Exemplo fictício:
    if (input.toLowerCase().includes("capa")) {
      return "Recomendo: Geral 95, Red Dot 82, 2X 72, 4X 62, AWM 50. DPI: 600.";
    } else if (input.toLowerCase().includes("controle")) {
      return "Recomendo: Geral 75, Red Dot 65, 2X 60, 4X 55, AWM 45. DPI: 500.";
    }
    return "Me conta mais sobre seu celular e estilo de jogo para eu sugerir!";
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-purple-500">🎯 SensiGPT</h1>
      <Card className="w-full max-w-lg mb-4">
        <CardContent className="h-96 overflow-y-scroll p-4">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left text-green-400"}`}
            >
              {msg.text}
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex w-full max-w-lg space-x-2">
        <Input
          className="flex-1"
          placeholder="Digite sua dúvida de sensi..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button onClick={handleSend}>Enviar</Button>
      </div>
    </div>
  );
}
