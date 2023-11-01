import React, { useState, useEffect } from "react";
import './dashboard.scss'
// import axios from "axios";
import { Link } from "react-router-dom";
// import Card from "../component/card";
import { baseApi } from "../api-url/api-url";
import Navbar from '../component/navbar'


export default function Dashboard() {
  const [country, setCountry] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("default");
  const [searchText, setSearchText] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false)

  //mode
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  if (isDarkMode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  //filter
  const filter = (value) => {
    setSelectedRegion(value);
  };

  //hit end point
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

  const addToFavorites = (country) => {
    const newFavorites = [...favorites, country];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (country) => {
    const newFavorites = favorites.filter((fav) => fav.name.common !== country.name.common);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const cardStyle = {
    backgroundColor: isDarkMode ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)',
  };
  const filterRegionStyle = {
    backgroundColor: isDarkMode ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)',
    color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(207, 26%, 17%)',
  };
  const searchStyle = {
    backgroundColor: isDarkMode ? 'hsl(209, 23%, 22%)' : 'hsl(0, 0%, 100%)',
    color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(207, 26%, 17%)',
  }
  const linkStyle = {
    color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(209, 23%, 22%)',
  };

  return (
    <>
    <Navbar isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <div className="head-container">
        <div style={searchStyle} className="search-container ">
          <input type="text" name="search" id="search" placeholder="Search for a country..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <div  style={filterRegionStyle} className="filter-container">
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
      <div className='favorites'>
            {/* Favorite */}
            <div className='fav'>
              {favorites.length > 0 && (
                <h2>Your Favorites:</h2>
              )}
            </div>

            <div className='fav'>
              {favorites.map((country, index) => (
                <div className='card' key={index}>
                  <img src={country.flags.png} alt={`${country.name.common} flag`} />
                  <div className=''>
                    <h2 className=''> {country.name.common} </h2>
                    <p> Population: {country.population.toLocaleString()}</p>
                    <p> Region: {country.region}</p>
                    <p> Capital: {country.capital?.[0]}</p>
                    <button className='' onClick={() => removeFromFavorites(country)}>Remove from Favorites</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        {country
          .filter((el) => el.name.common.toLowerCase().includes(searchText.toLowerCase()))
          .map((el, index) => (
            <Link key={index} to={`/detail/${el.name.common}`}>
              <div style={cardStyle} className='card'>
                <img src={el?.flags?.svg} alt="Gambar Kartu"></img>
                <p className='title'>{el?.name.common}</p>
                <div style={linkStyle}>
                  <p className='children'>Population:
                    <span>{el?.population}</span>
                  </p>
                  <p className='children'>Region:
                    <span>{el?.region}</span>
                  </p>
                  <p className='children'>Capital:
                    <span>{el?.capital}</span>
                  </p>
                  {favorites.some((fav) => fav.name.common === country.name.common) ? (
                          <button className="remove" onClick={() => removeFromFavorites(country)}>Remove from Favorites</button>
                        ) : (
                          <button className="add" onClick={() => addToFavorites(country)}>Add to Favorites</button>
                        )}
                </div>
              </div>
            </Link>
          ))}
      </div>

    </>
  );
}

