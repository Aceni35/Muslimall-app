import React, { useEffect } from "react";
import { data } from "./data";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";

const hadith = () => {
  const [hinput, sethinput] = useState("");
  const [categories, setcategories] = useState([]);
  const [ffetch, setfetch] = useState([]);
  const [single, issingle] = useState(false);
  const [singledata, setsingedata] = useState([]);

  const fetchcategories = async (id) => {
    const response = await axios.get(
      `https://hadeethenc.com/api/v1/hadeeths/list/?language=en&category_id=${id}&page=1&per_page=2000`
    );
    setfetch(response.data.data);
    sethinput("");
  };

  const getindividual = async (id) => {
    const response = await axios.get(
      `https://hadeethenc.com/api/v1/hadeeths/one/?language=en&id=${id}`
    );
    setsingedata(response.data);
    issingle(true);
  };

  const statechange = () => {
    const newdata = data.filter((data) => {
      return data.title.toLowerCase().includes(hinput);
    });
    setcategories(newdata);
  };
  if (!single) {
    return (
      <div className="hadiths">
        <div className="searchhadiths">
          <span className="back-h">
            <Link to="/" style={{ color: "white" }}>
              {" "}
              <BsArrowLeft size={25} />
            </Link>
          </span>

          <p className="dm">Search your category : </p>
          <div className="listh">
            <input
              type="text"
              className="hinput"
              value={hinput}
              onChange={(e) => {
                sethinput(e.target.value);
                statechange();
              }}
            />

            <div className="dropdown">
              {hinput
                ? categories.map((hadith) => {
                    return (
                      <div
                        className="coptions"
                        key={hadith.id}
                        onClick={() => {
                          fetchcategories(hadith.id);
                        }}
                      >
                        {hadith.title}
                      </div>
                    );
                  })
                : console.log("no value")}
            </div>
          </div>
        </div>
        <div className="displayhadiths">
          {ffetch
            ? ffetch.map((hadith) => {
                return (
                  <div
                    className="hadith1"
                    key={hadith.id}
                    onClick={() => {
                      getindividual(hadith.id);
                    }}
                  >
                    {hadith.title}
                  </div>
                );
              })
            : console.log("again")}
        </div>
      </div>
    );
  } else {
    return (
      <div className="hadiths">
        <div className="searchhadiths">
          <span
            className="back-h2"
            onClick={() => {
              issingle(false);
            }}
          >
            {" "}
            <BsArrowLeft size={25} />
          </span>
        </div>
        <div className="exp">
          <h5>{singledata.title}</h5>
          <h5>attribution : {singledata.attribution}</h5>
          <h5>{singledata.hadeeth}</h5>
          <p>explanation: {singledata.explanation}</p>
        </div>
      </div>
    );
  }
};

export default hadith;
