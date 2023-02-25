import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//
import Navbar from "../Navbar/Navbar";
import style from "./Detail.module.css";

const Detail = () => {
  const { dogId } = useParams();
  const [dog, setDog] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/dogs/${dogId}`)
      .then((res) => setDog(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  console.log(dog);

  return (
    <>
      <Navbar />
      <div className={style.detailDiv}>
        <div className={style.detailCard}>
          <div className={style.divNameImage}>
            <div className={style.nameId}>
              <h1 className={style.dogName}>{dog.name}</h1>
              <h2>Breed: #{dog.id}</h2>
            </div>
            <img src={dog.image} alt={dog.name} className={style.dogImage} />
          </div>
          <div className={style.divNameOthers}>
            <h1>Weight:</h1>
            <p>{dog.weight} kg</p>
            <h1>Height:</h1>
            <p>{dog.height} m</p>
            <h1>Life Span:</h1>
            <p>{dog.lifeSpan}</p>
            <h1>Temperaments:</h1>
            <p>{dog.temperaments}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
