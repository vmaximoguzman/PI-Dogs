const { Dog, Temperaments } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { API_KEY } = process.env;

//GET ALL
const getDogs = async () => {
  const dog = await axios
    .get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then((res) => res.data);

  let dogs = [];

  dog.forEach((el) => {
    dogs.push({
      id: el.id,
      image: el.image.url,
      name: el.name,
      height: el.height.metric,
      weight: el.weight.metric,
      lifeSpan: el.life_span,
      temperaments: el.temperament,
    });
  }); //Llamo solo lo que necesito del perro.

  const createdDogs = await Dog.findAll({
    include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  createdDogs.forEach((el) => {
    const cleanTemper = el.temperaments.map((el) => el.name);
    const temperament = cleanTemper.join(", ");

    const newDog = {
      id: el.id,
      image: el.image,
      name: el.name,
      height: el.height,
      weight: el.weight,
      lifeSpan: el.lifeSpan,
      temperaments: temperament,
    };

    dogs.push(newDog);
  });

  return dogs;
};
//GET DOGS:ID
const getDogsID = async (id) => {
  let dog;

  if (id.length < 4) {
    const dogsID = await axios
      .get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)
      .then((res) => res.data);

    console.log(dogsID);

    const urlImage = await axios
      .get("https://api.thedogapi.com/v1/breeds")
      .then((res) => res.data); //Traemos las razas para encontrar la imagen (Ya que el ID solo trae referencia)

    const dogImage = urlImage.find(
      (el) => el.reference_image_id === dogsID.reference_image_id
    ); //Buscamos aquel que concidan los id's de referencia de imagen.

    dog = {
      id: dogsID.id,
      image: dogImage.image.url,
      name: dogsID.name,
      height: dogsID.height.metric,
      weight: dogsID.weight.metric,
      lifeSpan: dogsID.life_span,
      temperaments: dogsID.temperament,
    }; //Pedimos solo lo que necesitamos.
  } else {
    const createdDog = await Dog.findByPk(id, {
      include: {
        model: Temperaments,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const cleanTemper = createdDog.temperaments.map((el) => el.name);
    const temperament = cleanTemper.join(", ");

    dog = {
      id: createdDog.id,
      image: createdDog.image,
      name: createdDog.name,
      height: createdDog.height,
      weight: createdDog.weight,
      lifeSpan: createdDog.lifeSpan,
      temperaments: temperament,
    };
  }

  return dog;
};
//GET DOGS/name?="..."
const getDogsName = async (name) => {
  const dogsName = await axios
    .get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    .then((res) => res.data);

  const createdName = await Dog.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
    include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  let dogs = [];

  //En caso de que exista en la API.
  if (dogsName) {
    const urlImage = await axios
      .get("https://api.thedogapi.com/v1/breeds")
      .then((res) => res.data); //Traemos las razas para encontrar la imagen (Ya que el NAME solo trae referencia).

    dogsName.forEach((elem) => {
      let dogImage = urlImage.find(
        (el) => el.reference_image_id === elem.reference_image_id
      );

      //Hay casos donde faltan datos que no pueden ser null.
      if (
        !elem.id ||
        !dogImage ||
        !elem.name ||
        !elem.height.metric ||
        !elem.weight.metric ||
        !elem.life_span ||
        !elem.temperament
      )
        return;

      dogs.push({
        id: elem.id,
        image: dogImage.image.url,
        name: elem.name,
        height: elem.height.metric,
        weight: elem.weight.metric,
        lifeSpan: elem.life_span,
        temperaments: elem.temperament,
      }); //Pedimos solo lo que necesitamos.
    });

    //En caso de que tambien exista en la DB.
    if (createdName) {
      createdName.forEach((el) => {
        const cleanTemper = el.temperaments.map((el) => el.name);
        const temperament = cleanTemper.join(", ");

        dogs.push({
          id: el.id,
          image: el.image,
          name: el.name,
          height: el.height,
          weight: el.weight,
          lifeSpan: el.lifeSpan,
          temperaments: temperament,
        }); //Pedimos solo lo que necesitamos.
      });
    }

    //En caso de que no exista en la API, pero sí en DB.
  } else if (createdName) {
    createdName.forEach((el) => {
      const cleanTemper = el.temperaments.map((el) => el.name);
      const temperament = cleanTemper.join(", ");

      dogs.push({
        id: el.id,
        image: el.image,
        name: el.name,
        height: el.height,
        weight: el.weight,
        lifeSpan: el.lifeSpan,
        temperaments: temperament,
      }); //Pedimos solo lo que necesitamos.
    });

    //En caso de que no exista en ninguno de los dos.
  } else {
    throw new Error("No se ha encontrado tal raza.");
  }

  return dogs;
};
//POST DOGS
const postDogs = async (image, name, height, weight, lifeSpan, temper) => {
  if (image) {
    const createDog = await Dog.create({
      image,
      name,
      height,
      weight,
      lifeSpan,
    });
    await createDog.addTemperaments(temper);

    return createDog;
  } else {
    const newDog = await Dog.create({
      name,
      height,
      weight,
      lifeSpan,
    });
    await newDog.addTemperaments(temper);

    return newDog;
  }
};
//

module.exports = { getDogs, getDogsID, getDogsName, postDogs };
