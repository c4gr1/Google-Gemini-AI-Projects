import { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    'Who won the latest Novel Peace Prize?',
    'Where does pizza come from?',
    'How do you make a BLT sandwich?',
  ];

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question!");
      return;
    }
    setError("");

    const formattedHistory = chatHistory.map(chatItem => ({
      role: chatItem.role,
      part: chatItem.part
    }));

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          formattedHistory: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await fetch('http://localhost:8000/gemini', options);
      const data = await response.text();
      setChatHistory(oldChatHistory => [...oldChatHistory, { role: "user", part: value }, { role: "model", part: data }]);
      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong! Please try again later.");
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  return (
    <div className='app'>
      <p>What do you want to know?
        <button className='surprise' onClick={surprise} disabled={!chatHistory}>Surprise me</button>
      </p>
      <div className="input-container">
        <input
          value={value}
          placeholder="When is Christmas... ?"
          onChange={(e) => setValue(e.target.value)}
        />
        {!error && <button onClick={getResponse}>Ask me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="search-result">
        {chatHistory.map((chatItem, index) => (
          <div key={index}>
            <p className="answer">{chatItem.role}: {chatItem.part}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
