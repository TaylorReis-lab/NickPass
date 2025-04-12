import React, { useState, useEffect } from "react";

const words = [
  "cavalo", "vaca", "pato", "rato", "lobo", "tigre", "leão", "urso", "elefante", "coelho",
  "pizza", "pão", "queijo", "maçã", "morango", "banana", "abacaxi", "tomate", "melancia",
  "vento", "sol", "lua", "estrela", "chuva", "neve", "fogo", "raio", "mar", "oceano",
  "rápido", "forte", "inteligente", "criativo", "feroz", "misterioso", "brilhante", "corajoso",
  "correr", "saltar", "voar", "nadar", "trepar", "dançar", "pular", "cair", "rolar",
  "máquina", "robô", "chip", "byte", "código", "hacker", "drone", "satélite", "internet",
  "futebol", "basquete", "vôlei", "tênis", "corrida", "natação", "boxe", "golfe"
];


const nickNames = [
  "Shadow", "Pixel", "Storm", "Nova", "Raven", "Cyber", "Echo", "Zeta", "Blaze", "Drift", "Night"
];

const nickAdjectives = [
  "Doido", "Bravo", "Ligeiro", "Feliz", "Turbo", "Forte", "Maluco", "Lendário"
];

const symbols = ["!", "@", "#", "$", "%", "&", "*", "-"];

const generateEasyPassword = (): string => {
  const w1 = words[Math.floor(Math.random() * words.length)];
  const w2 = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(10 + Math.random() * 90);
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  return `${w1}-${w2}${num}${symbol}`;
};

const generateNick = (): string => {
  const name = nickNames[Math.floor(Math.random() * nickNames.length)];
  const adj = nickAdjectives[Math.floor(Math.random() * nickAdjectives.length)];
  return `${name}${adj}`;
};

export const Generator: React.FC = () => {
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"password" | "nickname">("password");
  const [status, setStatus] = useState("");
  const [emoji, setEmoji] = useState("🐮")

  const emojis = ["🐮", "🐷", "🐸", "🐱", "🦁", "🐼", "🐻", "🐰", "🐯"];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      setEmoji(emojis[randomIndex])
    }, 2000);
    return () => clearInterval(interval)
  })


  const generate = () => {
    const newValue = mode === "password" ? generateEasyPassword() : generateNick();
    setResult(newValue);
    setStatus(mode === "password" ? "Senha gerada!" : "Nick gerado!");
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setStatus("Copiado para a área de transferência!");
  };

  return (
    <div className="container">
      <h1 className="site-title">{emoji} NickPass</h1>
      <p>Gere senhas fortes e fáceis ou nicknames criativos!</p>

      <div className="mode-toggle">
        <button onClick={() => setMode("password")} className={mode === "password" ? "active" : ""}>
          Criar Senha
        </button>
        <button onClick={() => setMode("nickname")} className={mode === "nickname" ? "active" : ""}>
          Criar Nick
        </button>
      </div>

      <div className="output-box">
        <input type="text" value={result} readOnly />
        <button onClick={copy}>📋 Copiar</button>
      </div>

      <button onClick={generate}>⚡ Gerar</button>
      <p className="status">{status}</p>
    </div>
  );
};
