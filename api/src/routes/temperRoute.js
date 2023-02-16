const { Router } = require("express");
const { getTemper } = require("../controllers/temperController");

const router = Router();

//GET TEMPERAMENTS
router.get("/", async (req, res) => {
  try {
    const temper = await getTemper();

    res.status(200).json(temper);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//

module.exports = router;
