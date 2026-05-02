import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [result, setResult] = useState("");

  const generateShortUrl = async () => {
    try {
      const response = await axios.post("http://localhost:5000/shorturls", {
        url,
        validity: Number(validity),
        shortcode
      });

      setResult(response.data.shortLink);
    } catch (error) {
      alert("Error generating short URL");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Validity (minutes)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Custom Shortcode"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <br /><br />

      <button onClick={generateShortUrl}>Generate</button>

      {result && (
        <div>
          <h3>Short URL:</h3>
          <a href={result} target="_blank" rel="noreferrer">
            {result}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;