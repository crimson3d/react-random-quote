import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("");

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(response.data.content);
      setAuthor(response.data.author);
      changeBackgroundColor();
    } catch (error) {
      console.error("Error fetching the quote", error);
    }
  };

  const changeBackgroundColor = () => {
    const randomColor = generateReadableColor();
    setColor(randomColor);
    document.body.style.backgroundColor = randomColor;
  };

  const generateReadableColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.random() * 30; // Saturation between 70% and 100%
    const lightness = 80; // Lightness fixed at 80% for pastel colors
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="main__card" id="quote-box" style={{ transition: 'background-color 0.5s ease' }}>
      <h1 className="card__quote" id="text" style={{ color: color, transition: 'color 0.5s ease' }}>
        <span>"</span>{quote}<span>"</span>
      </h1>
      <p className="card__author" id="author">
            - {author}
          </p>
      <div className="card__content">
        <div className="content__left">
          <div className="left__anchor" style={{ backgroundColor: color, transition: 'background-color 0.5s ease'}}>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `"${quote}" - ${author}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              id="tweet-quote"
            >
              <img
                src="https://img.icons8.com/?size=100&id=437&format=png&color=000000"
                alt="Twitter"
                className="anchor__pic"
              />
            </a>
          </div>
          <div className="left__anchor" style={{ backgroundColor: color, transition: 'background-color 0.5s ease'}}>
            <a
              href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(
                author
              )}&content=${encodeURIComponent(
                quote
              )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/?size=100&id=vxeFhTSlOh98&format=png&color=000000"
                alt="Tumblr"
                className="anchor__pic"
              />
            </a>
          </div>
        </div>
        <div className="content__right">
          <button
            onClick={fetchQuote}
            id="new-quote"
            style={{ backgroundColor: color, transition: 'background-color 0.5s ease' }}
            className="right__button"
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
