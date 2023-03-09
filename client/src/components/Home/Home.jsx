import React, { useState, useEffect } from "react";
import axios from "axios";
//
import Navbar from "../Navbar/Navbar";
import style from "./Home.module.css";
import Pagination from "../Pagination/Pagination";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [dogs, setDogs] = useState([]);
  const [temper, setTemper] = useState([]);
  const [dogTemper, setDogTemper] = useState([]);

  const [abcReload, setAbcReload] = useState(1);
  const [weightReload, setWeightReload] = useState();
  const [created, setCreated] = useState(1);

  //*Pagination
  const totalDogs = dogs.length;

  const [dogsPerPage, setDogsPerPage] = useState([8]); //Dogs por página.
  const [currentPage, setCurrentPage] = useState(1); //Página de inicio.

  const lastIndex = currentPage * dogsPerPage;
  const firstIndex = lastIndex - dogsPerPage;
  //*Pagination

  useEffect(() => {
    axios.get("/dogs").then((res) => {
      setDogs(res.data);
      setDogTemper(res.data);
    });

    axios.get("/temper").then((res) => setTemper(res.data));
  }, []);

  //*Ordenar Z - A.
  const zToA = () => {
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

    if (typeof abcReload === "undefined") setAbcReload(2);
    else setAbcReload(abcReload + 1);
    setWeightReload();
  };

  //*Ordenar A - Z.
  const aToZ = () => {
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

    if (typeof abcReload === "undefined") setAbcReload(1);
    else setAbcReload(abcReload - 1);
    setWeightReload();
  };

  //*Ordenar Peso Máximo.
  const pesoMax = () => {
    setDogs(
      dogs.sort((a, b) => {
        const dogA = Math.floor(a.weight.split(" ")[0]);
        const dogB = Math.floor(b.weight.split(" ")[0]);
        //
        if (dogA === dogB) {
          return 0;
        } else if (dogA > dogB) {
          return -1;
        }
        return 1;
      })
    );

    if (typeof weightReload === "undefined") setWeightReload(1);
    else setWeightReload(weightReload - 1);
    setAbcReload();
  };

  //*Ordenar Peso Mínimo.
  const pesoMin = () => {
    setDogs(
      dogs.sort((a, b) => {
        const dogA = Math.floor(a.weight.split(" ")[0]);
        const dogB = Math.floor(b.weight.split(" ")[0]);
        //
        if (dogA === dogB) {
          return 0;
        } else if (dogA < dogB) {
          return -1;
        }
        return 1;
      })
    );

    if (typeof weightReload === "undefined") setWeightReload(2);
    else setWeightReload(weightReload + 1);
    setAbcReload();
  };

  useEffect(() => {}, [abcReload]); //*Effect para actualizar Dogs.

  useEffect(() => {}, [weightReload]); //*Effect para actualizar Dogs

  //*Filtrar Temperamentos.
  const filtrarTemper = (e) => {
    if (e.target.value === "AllDogs") {
      setDogs(dogTemper);
    } else {
      const god = dogTemper.filter(
        (el) => el.temperaments && el.temperaments.includes(e.target.value)
      );
      setDogs(god);
    }
  };

  //*Filtrar Creados.
  const filtrarCreados = () => {
    if (created === 1) {
      setCreated(created + 1);
      const god = dogTemper.filter((el) => el.id && el.id.length > 4);
      setDogs(god);
    } else {
      setCreated(created - 1);
      setDogs(dogTemper);
    }
  };

  //*Buscar Dog.
  const onSearch = (dog) => {
    axios
      .get(`/dogs?name=${dog}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setDogs(res.data);
        } else {
          setDogs([res.data]);
        }
      })
      .catch(() =>
        alert("Lo lamento. Pero no hemos encontrado un perro de dicha raza.")
      );
  };

  //*Refrescar Página.
  const refresh = () => {
    window.location.reload(true);
  };

  return (
    <>
      <Navbar onSearch={onSearch} refresh={refresh} />

      <div className={style.divPrin}>
        <div className={style.dogBanner}>
          <img
            src="https://www.ccspca.com/wp-content/uploads/2020/09/Paws-for-Thought-Banner.png"
            alt="Dog Banner Adopt"
            className={style.bannerImage}
          />
        </div>

        <div className={style.createDog}>
          <NavLink to="/createDog">
            <button className={style.createDogBtn}>Create a New Breed</button>
          </NavLink>
        </div>

        <div className={style.titFilOrd}>
          <h3>Sort By:</h3>
          <h3>Filter By:</h3>
        </div>

        <div className={style.ordenarFiltrar}>
          <div className={style.ordenar}>
            <button
              onClick={aToZ}
              className={abcReload === 1 ? style.isCurrent : style.notCurrent}
              disabled={abcReload === 1}
            >
              A - Z
            </button>
            <button
              onClick={zToA}
              className={abcReload === 2 ? style.isCurrent : style.notCurrent}
              disabled={abcReload === 2}
            >
              Z - A
            </button>
            <button
              onClick={pesoMin}
              className={
                weightReload === 2
                  ? style.weightCurrent
                  : style.weightNotCurrent
              }
              disabled={weightReload === 2}
            >
              Min Weight
            </button>
            <button
              onClick={pesoMax}
              className={
                weightReload === 1
                  ? style.weightCurrent
                  : style.weightNotCurrent
              }
              disabled={weightReload === 1}
            >
              Max Weight
            </button>
          </div>
          <div className={style.filtrar}>
            <button
              onClick={filtrarCreados}
              className={
                created === 1 ? style.createdNotCurrent : style.createdCurrent
              }
            >
              DOGS CREATED
            </button>
            <select className={style.filtrarSelect}>
              <option selected disabled value="select">
                SELECT TEMPERAMENT
              </option>
              <option value="AllDogs" onClick={filtrarTemper}>
                All Dogs
              </option>
              {temper.map((el) => {
                return (
                  <option key={el} value={el} onClick={filtrarTemper}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className={style.dogCards}>
          {dogs
            .map((dog) => {
              return (
                <NavLink
                  to={`/dogs/${dog.id}`}
                  className={style.detailLink}
                  key={dog.id}
                >
                  <div className={style.dogCard}>
                    <img
                      src={dog.image}
                      alt={dog.name}
                      className={style.dogImage}
                    />
                    <p className={style.dogPar}>{dog.name.toUpperCase()}</p>
                    <p className={style.dogTemper}>{dog.temperaments}</p>
                    <div className={style.dogPeso}>
                      <p>Weight:</p>
                      <p>
                        {dog.weight.includes("NaN") ? "5 - 10" : dog.weight} kg
                      </p>
                    </div>
                  </div>
                </NavLink>
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
