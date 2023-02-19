const { Router } = require("express");
const {
  getDogsName,
  getDogs,
  getDogsID,
  postDogs,
} = require("../controllers/dogController");

const router = Router();

//GET DOGS + DOGSNAME
router.get("/", async (req, res) => {
  const { name } = req.query;

  let dogs;

  try {
    if (name) dogs = await getDogsName(name);
    else dogs = await getDogs();

    res.status(200).json(dogs);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//GET DOGS:ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const dog = await getDogsID(id);

    res.status(200).json(dog);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//POST DOGS
router.post("/", async (req, res) => {
  const { image, name, height, weight, lifeSpan, temper } = req.body;

  try {
    const newDog = await postDogs(
      image,
      name,
      height,
      weight,
      lifeSpan,
      temper
    );

    res.status(200).json(newDog);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
