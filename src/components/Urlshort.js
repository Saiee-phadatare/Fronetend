import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Urlshort() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const res = await axios.post("${process.env.REACT_APP_API_URL}/api/shorten", { url });
      setShortUrl(res.data.shortURL);
    } catch (err) {
      setError(err.response?.data?.error || "PLEASE ENTER URL");
    }
  };

  const handleAdminLogin = () => {
    navigate("/admin-login");
  };

  return (
    <div className="container">
      <h2 className="heading">Shorten Your URL</h2>

      {error && <p className="para">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter long URL" />
        <button type="submit">Shorten</button>
      </form>
      
      {shortUrl && (
        <div className="short-url-box">
          <span>Short URL:</span>
          <a href={shortUrl} target="_blank" rel="noreferrer" className="short-link"> {shortUrl}</a>
        </div>
      )}
      <br/>

      <button onClick={handleAdminLogin}>Admin Login</button>
    </div>
  );
}

export default Urlshort;

