import React from "react";
import React, { useState } from "react";

function GuessNumber() {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGuess = () => {
    if (isGameOver) return;

    const userGuess = Number(guess);

    if (!userGuess || userGuess < 1 || userGuess > 100) {
      setMessage("Vui lòng nhập số từ 1 đến 100!");
      return;
    }

    const newCount = count + 1;
    setCount(newCount);

    if (userGuess < randomNumber) {
      setMessage("Bạn đoán quá thấp!");
    } else if (userGuess > randomNumber) {
      setMessage("Bạn đoán quá cao!");
    } else {
      setMessage("🎉 Chúc mừng! Bạn đã đoán đúng!");
      setIsGameOver(true);
      return;
    }

    if (newCount === 10) {
      setMessage(`Bạn đã hết lượt! Số đúng là: ${randomNumber}`);
      setIsGameOver(true);
    }
  };

  const handleReset = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setCount(0);
    setIsGameOver(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Game đoán số (1 - 100)</h2>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={isGameOver}
      />

      <button onClick={handleGuess} disabled={isGameOver}>
        Đoán
      </button>

      <button onClick={handleReset}>
        Chơi lại
      </button>

      <p>{message}</p>
      <p>Lượt đã dùng: {count}/10</p>
    </div>
  );
}

export default GuessNumber;