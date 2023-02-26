import React, { useEffect, useState } from "react";
import axios from "axios";
//
import Navbar from "../Navbar/Navbar";
import style from "./Form.module.css";

const Form = () => {
  const [temper, setTemper] = useState([]);

  const [dog, setDog] = useState({
    image: "",
    name: "",
    height: "",
    weight: "",
    lifeSpan: "",
    temperaments: [],
  });

  const [weight, setWeight] = useState({
    weightMin: "",
    weightMax: "",
  });

  const [height, setHeight] = useState({
    heightMin: "",
    heightMax: "",
  });

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
  };

  //*Weight

  const handleWeight = (e) => {
    setWeight({
      ...weight,
      [e.target.name]: e.target.value,
    });
  };
  let peso = weight.weightMin + " - " + weight.weightMax;

  //*Height
  const handleHeight = (e) => {
    setHeight({
      ...height,
      [e.target.name]: e.target.value,
    });
  };
  let altura = height.heightMin + " - " + height.heightMax;

  //*Temperaments
  const handleTemper = (e) => {
    const temperament = temper.indexOf(e.target.value) + 1;

    console.log(temperament);

    dog.temperaments.push(temperament);
  };
  console.log(dog);

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

  console.log(dog);

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

          <label className={style.formLabel}>Image</label>
          <input
            type="text"
            value={dog.image}
            name="image"
            className={style.formInputImg}
            onChange={handleNaImLs}
          />

          <div className={style.minMax}>
            <div className={style.labelWH}>
              <label className={style.formLabel}>Min Weight*</label>
              <label className={style.formLabel}>Max Weight*</label>
            </div>

            <div className={style.inputWH}>
              <input
                type="text"
                value={weight.weightMin}
                name="weightMin"
                className={style.formInput}
                onChange={handleWeight}
              />

              <input
                type="text"
                value={weight.weightMax}
                name="weightMax"
                className={style.formInput}
                onChange={handleWeight}
              />
            </div>
          </div>

          <div className={style.minMax}>
            <div className={style.labelWH}>
              <label className={style.formLabel}>Min Height*</label>
              <label className={style.formLabel}>Max Height*</label>
            </div>
            <div className={style.inputWH}>
              <input
                type="text"
                value={height.heightMin}
                name="heightMin"
                className={style.formInput}
                onChange={handleHeight}
              />
              <input
                type="text"
                value={height.heightMax}
                name="heightMax"
                className={style.formInput}
                onChange={handleHeight}
              />
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
