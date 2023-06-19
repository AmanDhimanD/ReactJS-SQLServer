import React, { useState } from "react";
import { Link } from "react-router-dom";

const PlayGround = () => {
  const commands = [
    "SELECT",
    "FROM",
    "WHERE",
    "INSERT INTO",
    "UPDATE",
    "DELETE FROM",
    // Add more commands as needed
  ];

  const [code, setCode] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const [responseData, setResponseData] = useState([]);

  const handleCodeChange = (event) => {
    const value = event.target.value;
    setCode(value);

    // Generate suggestions based on the current input value
    const input = value.trim().toUpperCase();
    const filteredSuggestions = commands.filter((command) =>
      command.toUpperCase().startsWith(input)
    );

    setSuggestions(filteredSuggestions);
  };
  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (highlightedIndex !== -1) {
        const selectedSuggestion = suggestions[highlightedIndex];
        setCode(selectedSuggestion);
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    }
  };

  const handleSendCode = () => {
    // Send the code to the server using an HTTP request (e.g., fetch)
    fetch("http://localhost:8000/api/sendCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        setResponseData(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={handleCodeChange}
        className="w-full h-48 text-white bg-black"
      />
      <button
        onClick={handleSendCode}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Send Code
      </button>
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        {responseData.map((item) => (
          <Link to={`/employee/${item.EMPLOYEE_ID}`} key={item.EMPLOYEE_ID}>
            <div className="bg-green-900 max-w-sm rounded overflow-hidden shadow-lg m-2">
              <div className="px-6 py-6">
                {Object.entries(item).map(([key, value]) => (
                  <p className="text-white" key={key}>
                    {key}: {value}
                  </p>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlayGround;
