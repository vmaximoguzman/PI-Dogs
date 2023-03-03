const { Temperaments } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

//GET TEMPERAMENTS
const getTemper = async () => {
  //Llamamos API
  const temper = await axios
    .get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then((res) => res.data);

  const arrTemper = [];

  //Recorremos API
  temper.forEach((el) => {
    const strTemper = el.temperament;

    //Algunos elementos devolvían undefined.
    if (typeof strTemper === "string") {
      //Separamos string
      const charTemper = strTemper.split(" ");

      charTemper.forEach(async (name) => {
        //Le quitamos la coma al final del string.
        const string = name.replace(/,/g, "");

        //Agregamos a array vacío, evitando repetición.
        if (!arrTemper.includes(string)) {
          arrTemper.push(string);
        }
      });
    }
  });

  //Creamos nuevo array para agregar todos los elementos de una.
  const bulk = arrTemper.map((el) => (el = { name: el }));

  //Agregamos todos los elementos de una a nuestra base de datos.
  await Temperaments.bulkCreate(bulk);

  //Devuelvo los temperamentos.
  return arrTemper;
};

module.exports = {
  getTemper,
};
