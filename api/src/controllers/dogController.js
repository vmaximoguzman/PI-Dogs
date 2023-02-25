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

  //Si se busca un perro creado.
  if (!dogsName.length) {
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

    let dogs;

    createdName.forEach((el) => {
      const cleanTemper = el.temperaments.map((el) => el.name);
      const temperament = cleanTemper.join(", ");

      dogs = {
        id: el.id,
        image: el.image,
        name: el.name,
        height: el.height,
        weight: el.weight,
        lifeSpan: el.lifeSpan,
        temperaments: temperament,
      };
    });

    // Busca por nombre e incluye temperamentos.

    if (!createdName.length)
      throw new Error("No existe tal raza"); //Si no lo encuentra, no existe.
    else return dogs; //Si lo encuentra, devuelve dicha raza.
  }

  //Si se busca un perro dentro de la API.
  const urlImage = await axios
    .get("https://api.thedogapi.com/v1/breeds")
    .then((res) => res.data); //Traemos las razas para encontrar la imagen (Ya que el ID solo trae referencia).

  let dogs = [];
  let dogImage;

  dogsName.forEach((elem) => {
    dogImage = urlImage.find(
      (el) => el.reference_image_id === elem.reference_image_id
    );

    console.log(elem);

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

  return dogs;
};
//POST DOGS
const postDogs = async (image, name, height, weight, lifeSpan, temper) => {
  const createDog = await Dog.create({ image, name, height, weight, lifeSpan });
  await createDog.addTemperaments(temper);

  return createDog;
};
//

module.exports = { getDogs, getDogsID, getDogsName, postDogs };

//Op.iLike es case sensitive (No importa si se busca con o sin mayusculas).
