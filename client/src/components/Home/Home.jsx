import React, { useState, useEffect } from "react";
import axios from "axios";
//
import Navbar from "../Navbar/Navbar";
import style from "./Home.module.css";
import Pagination from "../Pagination/Pagination";

const Home = (props) => {
  const [dogs, setDogs] = useState([]);
  //Pagination
  const totalDogs = dogs.length;

  const [dogsPerPage, setDogsPerPage] = useState([8]); //Dogs por página.
  const [currentPage, setCurrentPage] = useState(1); //Página de inicio.

  const lastIndex = currentPage * dogsPerPage; //1 * 8 = 8 (Primeros 8 dogs)
  const firstIndex = lastIndex - dogsPerPage; //
  //Pagination

  useEffect(() => {
    axios.get("http://localhost:3001/dogs").then((res) => setDogs(res.data));
  }, []);

  console.log(dogs);

  return (
    <>
      <Navbar onSearch={props.onSearch} />
      <div className={style.divPrin}>
        <div className={style.dogBanner}>
          <img
            src="https://www.ccspca.com/wp-content/uploads/2020/09/Paws-for-Thought-Banner.png"
            alt="Dog Banner Adopt"
            className={style.bannerImage}
          />
        </div>
        <div className={style.dogCards}>
          {dogs
            .map((dog) => {
              return (
                <div key={dog.id} className={style.dogCard}>
                  <img
                    src={dog.image}
                    alt={dog.name}
                    className={style.dogImage}
                  />
                  <p className={style.dogPar}>{dog.name.toUpperCase()}</p>
                  <p className={style.dogTemper}>{dog.temperaments}</p>
                  <div className={style.dogPeso}>
                    <p>Peso:</p>
                    <p>{dog.weight} kg</p>
                  </div>
                </div>
              );
            })
            .slice(firstIndex, lastIndex)}
        </div>
      </div>

      <Pagination
        dogsPerPage={dogsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalDogs={totalDogs}
      />
    </>
  );
};

export default Home;
