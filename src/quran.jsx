import React, { useState } from "react";
import { qdata } from "./qurandata";
import axios from "axios";
import { Link } from "react-router-dom";

const quran = () => {
  const [signle, setSingle] = useState(false);
  const [translation, settranslation] = useState(true);
  const [currentsurah, setcurrent] = useState([]);
  const [verses, currentverses] = useState([]);

  const getsurah = async (chapter) => {
    const options = {
      method: "GET",
      url: `https://al-quran1.p.rapidapi.com/${chapter}`,
      headers: {
        "X-RapidAPI-Key": "2896690770msh3b028f06409ff07p1a2069jsnaf787d8be509",
        "X-RapidAPI-Host": "al-quran1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setcurrent(response.data);
      console.log(response.data);
      currentverses(response.data.verses);
      setSingle(true);
    } catch (error) {
      console.error(error);
    }
  };
  if (!signle) {
    return (
      <>
        <div className="q-options">
          <span className="back" style={{ border: "solid 2px black" }}>
            <Link to="/">Go back</Link>
          </span>
        </div>
        <div className="q-container">
          {qdata.map((surah) => {
            return (
              <div
                className="surah"
                key={surah[0]}
                onClick={() => {
                  getsurah(surah[0]);
                }}
              >
                {`${surah[0]} ${surah[1]} - ${surah[2]}`}{" "}
                <span className="arabic"> {` ${surah[3]}`}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="q-options">
          <span
            className="back push"
            style={{ border: "solid 2px black" }}
            onClick={() => {
              setSingle(false);
            }}
          >
            Go back
          </span>
          <span className="back push"> {`${currentsurah.surah_name}`}</span>
          <span
            className="back push"
            onClick={() => {
              settranslation(!translation);
            }}
          >
            {!translation ? `Show translation` : `Hide translation`}
          </span>
        </div>
        <div className="q-container">
          {Object.values(verses).map((verse) => {
            return (
              <div className="ayahs" key={verse.id}>
                <p className="move">{`${verse.content}`}</p>
                {translation && (
                  <p className="trans">{`${verse.translation_eng}`}</p>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default quran;
