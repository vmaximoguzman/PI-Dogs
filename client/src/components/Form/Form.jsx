import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
//
import Navbar from "../Navbar/Navbar";
import style from "./Form.module.css";
import {
  validationDog,
  validationWeight,
  validationHeight,
} from "./validation";

const Form = () => {
  //*Temperaments
  const [temperaments, setTemperaments] = useState([]);

  const [dogTemperaments, setDogTemperaments] = useState([]);

  //*Dog
  const [dog, setDog] = useState({
    image: "",
    name: "",
    height: "",
    weight: "",
    lifeSpan: "",
    temper: [],
  });

  const [errorsDog, setErrorsDog] = useState({
    image: "",
    name: "",
    lifeSpan: "",
    temper: [],
  });

  //*Weight
  const [weight, setWeight] = useState({
    weightMin: "",
    weightMax: "",
  });

  const [errorsWeight, setErrorsWeight] = useState({
    weightMin: "",
    weightMax: "",
  });

  //*Height
  const [height, setHeight] = useState({
    heightMin: "",
    heightMax: "",
  });

  const [errorsHeight, setErrorsHeight] = useState({
    heightMin: "",
    heightMax: "",
  });

  //-

  useEffect(() => {
    axios.get("/temper").then((res) => setTemperaments(res.data));
  }, []);

  //*Name - Image - LifeSpan
  const handleNaImLs = (e) => {
    setDog({
      ...dog,
      [e.target.name]: e.target.value,
    });
    setErrorsDog(
      validationDog({
        ...dog,
        [e.target.name]: e.target.value,
      })
    );
  };

  //*Weight
  const handleWeight = (e) => {
    setWeight({
      ...weight,
      [e.target.name]: e.target.value,
    });
    setErrorsWeight(
      validationWeight({
        ...weight,
        [e.target.name]: e.target.value,
      })
    );
  };

  useEffect(() => {
    setDog({
      ...dog,
      weight: weight.weightMin + " - " + weight.weightMax,
    });
  }, [weight]);

  //*Height
  const handleHeight = (e) => {
    setHeight({
      ...height,
      [e.target.name]: e.target.value,
    });
    setErrorsHeight(
      validationHeight({
        ...height,
        [e.target.name]: e.target.value,
      })
    );
  };

  useEffect(() => {
    setDog({
      ...dog,
      height: height.heightMin + " - " + height.heightMax,
    });
  }, [height]);

  //*Temperaments
  const handleTemper = (e) => {
    const indexTemper = temperaments.indexOf(e.target.value) + 1;

    //*Evitamos repetir temperamentos.
    if (!dogTemperaments.find((el) => e.target.value === el)) {
      setDogTemperaments([...dogTemperaments, e.target.value]);
    }

    setDog({
      ...dog,
      temper: [...dog.temper, indexTemper],
    });
    setErrorsDog(
      validationDog({
        ...dog,
        [e.target.name]: indexTemper,
      })
    );
  };

  const closeTemper = (e) => {
    setDogTemperaments(dogTemperaments.filter((el) => e.target.value !== el));
  };

  useEffect(() => {
    console.log(dogTemperaments);
  }, [dogTemperaments]);

  //*OnSubmit
  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/dogs", {
        ...dog,
        lifeSpan: dog.lifeSpan + " years",
      })
      .then((res) => console.log(res.data));

    setDog({
      image: "",
      name: "",
      height: "",
      weight: "",
      lifeSpan: "",
      temper: [],
    });
  };

  return (
    <>
      <Navbar />

      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.formCard}>
          <h1>Create a New Breed</h1>

          <label className={style.formLabel}>Name*</label>
          <input
            type="text"
            value={dog.name}
            name="name"
            className={style.formInput}
            onChange={handleNaImLs}
          />
          {errorsDog.name && (
            <p className={style.validation}>{errorsDog.name}</p>
          )}

          <label className={style.formLabel}>Image</label>
          <input
            type="text"
            value={dog.image}
            name="image"
            className={style.formInputImg}
            onChange={handleNaImLs}
          />
          {errorsDog.image && (
            <p className={style.validation}>{errorsDog.image}</p>
          )}

          <div className={style.weightHeight}>
            <div className={style.min}>
              <label className={style.formLabel}>Min Weight*</label>

              <input
                type="text"
                value={weight.weightMin}
                name="weightMin"
                className={style.formInput}
                onChange={handleWeight}
              />
              {errorsWeight.weightMin && (
                <p className={style.validation}>{errorsWeight.weightMin}</p>
              )}

              <label className={style.formLabel}>Min Height*</label>
              <input
                type="text"
                value={height.heightMin}
                name="heightMin"
                className={style.formInput}
                onChange={handleHeight}
              />
              {errorsHeight.heightMin && (
                <p className={style.validation}>{errorsHeight.heightMin}</p>
              )}
            </div>
            <div className={style.max}>
              <label className={style.formLabel}>Max Weight*</label>
              <input
                type="text"
                value={weight.weightMax}
                name="weightMax"
                className={style.formInput}
                onChange={handleWeight}
              />
              {errorsWeight.weightMax && (
                <p className={style.validation}>{errorsWeight.weightMax}</p>
              )}

              <label className={style.formLabel}>Max Height*</label>
              <input
                type="text"
                value={height.heightMax}
                name="heightMax"
                className={style.formInput}
                onChange={handleHeight}
              />
              {errorsHeight.heightMax && (
                <p className={style.validation}>{errorsHeight.heightMax}</p>
              )}
            </div>
          </div>

          <label className={style.formLabel}>Life Span*</label>
          <input
            type="text"
            value={dog.lifeSpan}
            name="lifeSpan"
            className={style.formInput}
            onChange={handleNaImLs}
          />
          {errorsDog.lifeSpan && (
            <p className={style.validation}>{errorsDog.lifeSpan}</p>
          )}

          <label className={style.formLabel}>Temperaments*</label>
          <select className={style.formSelect} onChange={handleTemper}>
            <option disabled selected>
              SELECT A TEMPERAMENT
            </option>
            {temperaments.map((el) => {
              return (
                <option value={el} key={el} name="temperaments">
                  {el}
                </option>
              );
            })}
          </select>
          <div className={style.dogTemperaments}>
            {dogTemperaments &&
              dogTemperaments.map((el) => {
                return (
                  <div key={el} className={style.temperamentEl}>
                    <button value={el} onClick={closeTemper}>
                      X
                    </button>
                    <p>{el}</p>
                  </div>
                );
              })}
          </div>
          {errorsDog.temper && (
            <p className={style.validation}>{errorsDog.temper}</p>
          )}

          <button
            type="submit"
            onClick={() => window.alert("Breed Created")}
            className={
              Object.entries(errorsDog).length ||
              Object.entries(errorsHeight).length ||
              Object.entries(errorsWeight).length
                ? style.disabledBtn
                : style.submitBtn
            }
            disabled={
              Object.entries(errorsDog).length ||
              Object.entries(errorsHeight).length ||
              Object.entries(errorsWeight).length
            }
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
