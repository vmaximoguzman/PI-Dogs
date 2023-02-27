import React, { useEffect, useState } from "react";
import axios from "axios";
//
import Navbar from "../Navbar/Navbar";
import style from "./Form.module.css";
import {
  validationDog,
  validationWeight,
  validationHeight,
} from "./validation";

const Form = () => {
  const [temper, setTemper] = useState([]);

  //*Dog
  const [dog, setDog] = useState({
    image: "",
    name: "",
    height: "",
    weight: "",
    lifeSpan: "",
    temperaments: [],
  });

  const [errorsDog, setErrorsDog] = useState({
    image: "",
    name: "",
    lifeSpan: "",
    temperaments: [],
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
    axios
      .get("http://localhost:3001/temper")
      .then((res) => setTemper(res.data));
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
  let peso = weight.weightMin + " - " + weight.weightMax;

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
  let altura = height.heightMin + " - " + height.heightMax;

  //*Temperaments
  const handleTemper = (e) => {
    const temperament = temper.indexOf(e.target.value) + 1;

    dog.temperaments.push(temperament);
  };

  //*OnSubmit
  const onSubmit = (e) => {
    e.preventDefault();

    setDog({
      ...dog,
      weight: peso,
      height: altura,
      lifeSpan: dog.lifeSpan + " years",
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
            {temper.map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
          {errorsDog.temperaments && (
            <p className={style.validation}>{errorsDog.temperaments}</p>
          )}

          <button
            onClick={() => window.alert("Breed Creada")}
            className={style.submitBtn}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
