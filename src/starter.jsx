import React from "react";
import { Link } from "react-router-dom";

const starter = () => {
  const sty = {
    textDecoration: "none",
    color: "inherit",
  };
  return (
    <>
      <div className="times box">
        <Link to="/times" style={sty}>
          Prayer Times
        </Link>
      </div>
      <div className="quran box">
        <Link to="/quran" style={sty}>
          Quran
        </Link>
      </div>
      <div className="hadith box">
        <Link to="/hadith" style={sty}>
          Hadith
        </Link>
      </div>
    </>
  );
};

export default starter;
