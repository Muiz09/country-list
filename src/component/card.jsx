import React from 'react';
import './card.scss'
import { Link, NavLink, useNavigate } from "react-router-dom";


const Card = ({ title, image, population, region, capital }) => {
  const navigate = useNavigate();
  const detailPage = (id) => {
    navigate(`/detail/${title}`)
  }
  return (
    <div className='card'  onClick={() => detailPage()}>
      <img src={image} alt="Gambar Kartu"></img>
      <p className='title'>{title}</p>
      <div>
        <p className='children'>Population:
          <span>{population}</span>
        </p>
        <p className='children'>Region:
          <span>{region}</span>
        </p>
        <p className='children'>Capital:
          <span>{capital}</span>
        </p>
      </div>
    </div>
  );
};


export default Card;
