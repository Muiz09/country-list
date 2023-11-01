import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
// import Card from "../component/card";
import './detailCountry.scss'


export default function DetailCountry() {
  const navigate = useNavigate();
  const { title } = useParams();
  const url = `https://restcountries.com/v3.1//name/${title}`
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get(url).then((res) => setData(res.data));
  };

  const dashboard = (id) => {
    navigate(`/`)
  }

  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <>
      <div className="back-button">
        <button onClick={() => dashboard()}>BUTTON</button>
      </div>
      <div className="detail-countainer">
        <img src={data[0]?.flags?.svg} alt="Gambar Kartu"></img>
        <div className="text-detail">
          <p className='title-p'>{data[0]?.name?.common}</p>

          <div className="flex-0">
            <div className="flex-1">
              <p className='text-p'>Native Name : <span>{data[0]?.name?.common}</span></p>
              <p className='text-p'>Population : <span>{data[0]?.population}</span></p>
              <p className='text-p'>Region : <span>{data[0]?.region}</span></p>
              <p className='text-p'>Sub Region : <span>{data[0]?.subregion}</span></p>
              <p className='text-p'>Capital : <span>{data[0]?.capital}</span></p>
            </div>

            <div className="flex-2">
              <p className='text-p'>Top Level Domain : <span>{data[0]?.tld}</span></p>
              <p className='text-p'>Currencies : <span>
                {data[0]?.currencies &&
                  Object.keys(data[0]?.currencies)
                    .map((currencyCode) => {
                      const currency = data[0]?.currencies[currencyCode];
                      return `${currency.name}`;
                    })
                    .join(", ")}
              </span>
              </p>
              <p className='text-p'>Languages : <span>
                {data[0]?.languages && Object.values(data[0]?.languages).join(", ")}
              </span>
              </p>
            </div>

          </div>
        </div>
        {/* <div className="borderCountries">
          <div className="title">
            <p>Border Countries: </p>
          </div>
          <div className="cardContainer">
            {borderCountries.map((border, index) => (
              <div className="cardBorder" key={index}>
                <p>{border[0]?.name?.common}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div >
    </>
  )
}