import React, { useEffect, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useGlobal } from "../context";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const times = () => {
  const [isInital, setInital] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [changecity, setchangecity] = useState("");
  const [changecountry, setchangecountry] = useState("");
  const [times, setTimes] = useState([]);
  const [isSettings, setSettins] = useState(false);
  const [oldcity, setoldcity] = useState("");
  const [oldcountry, setoldcountry] = useState("");
  const [iserror, seterror] = useState(false);

  useEffect(() => {
    const state = localStorage.getItem("isInitial");
    if (state === "true") {
      setInital(true);
      const newcity = localStorage.getItem("city");
      const newcou = localStorage.getItem("country");
      if (city !== newcity || country !== newcou) {
        setCity(newcity);
        setCountry(newcou);
      }
      if (city && country) {
        fetchCity(city, country);
        console.log(city, country);
        setoldcity(city);
        setoldcountry(country);
      }
    }
  }, [city]);

  const errfunction = () => {
    seterror(true);
    setTimeout(() => {
      seterror(false);
    }, 3000);
  };

  const style = {
    textDecoration: "none",
    color: "black",
  };

  const savechnages = async () => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity/15-05-2023?city=${changecity}&country=${changecountry}&method=8`
      );
      setCity(changecity);
      setCountry(changecountry);
      localStorage.setItem("city", `${changecity}`);
      localStorage.setItem("country", `${changecountry}`);
      setSettins(false);
    } catch (error) {
      errfunction();
      setSettins(true);
    }
  };

  const fetchCity = async (state) => {
    if (city && country) {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity/15-05-2023?city=${city}&country=${country}&method=8`
        );
        setInital(true);
        const { Asr, Dhuhr, Fajr, Imsak, Isha, Maghrib, Sunrise, Sunset } =
          response.data.data.timings;
        setTimes([Asr, Dhuhr, Fajr, Imsak, Isha, Maghrib, Sunrise, Sunset]);
        localStorage.setItem("isInitial", "true");
      } catch (error) {
        errfunction();
      }
    } else {
      errfunction();
    }
  };

  if (isSettings) {
    return (
      <div className="set">
        {iserror ? (
          <div className="message">please enter valid values</div>
        ) : (
          console.log("no error")
        )}
        <h3>Change the curren loaction:</h3>
        <p>enter new Country:</p>
        <input
          type="text"
          value={changecountry}
          onChange={(e) => setchangecountry(e.target.value)}
        />
        <p>enter new City:</p>
        <input
          type="text"
          value={changecity}
          onChange={(e) => setchangecity(e.target.value)}
        />
        <br />
        <button
          className="btn"
          onClick={() => {
            if (changecity && changecountry) {
              savechnages();
            } else {
            }
          }}
        >
          Submit
        </button>
        <h5>
          Note! the city you enter now will be set as your default <br /> you
          can later change that in the settings !
        </h5>
      </div>
    );
  }

  if (isInital === false) {
    return (
      <div className="set">
        {iserror ? (
          <div className="message">please enter valid values</div>
        ) : (
          console.log("no error")
        )}

        <h3>Please enter the following:</h3>
        <p>Country:</p>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <p>City:</p>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <button
          className="btn"
          onClick={() => {
            fetchCity();
            localStorage.setItem("city", `${city}`);
            localStorage.setItem("country", `${country}`);
          }}
        >
          Submit
        </button>
        <h5>
          Note! the city you enter now will be set as your default <br /> you
          can later change that in the settings !
        </h5>
      </div>
    );
  } else {
    return (
      <div className="realtimes">
        <div className="settings">
          <span className="back">
            <BsArrowLeft />{" "}
            <Link style={style} to="/">
              Go back
            </Link>
          </span>
          <span
            className="back"
            onClick={() => {
              setSettins(true);
            }}
          >
            Settings
            <IoSettingsSharp />
          </span>
        </div>
        <div className="time">
          <span className="vakt">Fajr</span>
          <span className="koh">{times[2]}</span>
        </div>
        <div className="time">
          <span className="vakt">Sunrise</span>
          <span className="koh">{times[6]}</span>
        </div>
        <div className="time">
          <span className="vakt">Dhuhr</span>
          <span className="koh">{times[1]}</span>
        </div>
        <div className="time">
          <span className="vakt">Asr</span>
          <span className="koh">{times[0]}</span>
        </div>
        <div className="time">
          <span className="vakt">Sunset</span>
          <span className="koh">{times[7]}</span>
        </div>
        <div className="time">
          <span className="vakt">Maghrib</span>
          <span className="koh">{times[5]}</span>
        </div>
        <div className="time">
          <span className="vakt">Isha</span>
          <span className="koh">{times[4]}</span>
        </div>
        <div className="time">
          <span className="vakt">Imsak</span>
          <span className="koh">{times[3]}</span>
        </div>
      </div>
    );
  }
};

export default times;
