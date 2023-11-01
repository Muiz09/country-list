import React, { useState, useEffect } from "react";
import './dashboard.scss'
// import axios from "axios";
import Card from "../component/card";
import { baseApi } from "../api-url/api-url";



export default function Dashboard() {
  const [country, setCountry] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("default");
  const [searchText, setSearchText] = useState("");

  const filter = (value) => {
    setSelectedRegion(value);
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        let endpoint = "/all";
        if (selectedRegion !== "default") {
          endpoint = `/region/${selectedRegion}`;
        }

        const data = await baseApi({
          endpoint,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCountry(data);
        console.log(data);
      } catch (error) {
        console.log(error, "Error");
      }
    };
    fetchCountry();
  }, [selectedRegion]);
  return (
    <>
      <div className="head-container">
        <div className="search-container ">
          <input type="text" name="search" id="search" placeholder="Search for a country..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <div className="filter-container">
          <select id="filter" onChange={(e) => filter(e.target.value)} value={selectedRegion}>
            <option value="default">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>

      <div className="grid-container">
        {country
          .filter((el) => el.name.common.toLowerCase().includes(searchText.toLowerCase()))
          .map((el, index) => (
            <Card
              key={index}
              title={el?.name.common}
              image={el?.flags?.svg}
              population={el?.population}
              region={el?.region}
              capital={el?.capital}
            />
          ))}
      </div>

    </>
  );
}

