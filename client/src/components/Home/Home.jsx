import React, { useState, useEffect } from "react";
import axios from "axios";
//
import Navbar from "../Navbar/Navbar";
import style from "./Home.module.css";
import Pagination from "../Pagination/Pagination";

const Home = (props) => {
  const [dogs, setDogs] = useState([]);
  const [reload, setReload] = useState(1);
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

  //Ordenar Alfabeticamente.
  const onClick = () => {
    setDogs(
      dogs.sort((a, b) => {
        const dogA = a.name.toLowerCase();
        const dogB = b.name.toLowerCase();

        if (dogA > dogB) {
          return -1;
        } else if (dogA < dogB) {
          return 1;
        }
        return 0;
      })
    );

    setReload(reload + 1);
  };

  const onChange = () => {
    setDogs(
      dogs.sort((a, b) => {
        const dogA = a.name.toLowerCase();
        const dogB = b.name.toLowerCase();

        if (dogA < dogB) {
          return -1;
        } else if (dogA > dogB) {
          return 1;
        }
        return 0;
      })
    );

    setReload(reload - 1);
  };

  useEffect(() => {
    console.log("efecto");
  }, [reload]);
  //Ordenar Alfabeticamente.

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

        <div className={style.ordenar}>
          <p>Ordenar:</p>
          <div>
            <button
              onClick={onChange}
              className={reload === 1 ? style.isCurrent : style.notCurrent}
              disabled={reload === 1}
            >
              A - Z
            </button>
            <button
              onClick={onClick}
              className={reload === 2 ? style.isCurrent : style.notCurrent}
              disabled={reload === 2}
            >
              Z - A
            </button>
          </div>
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
