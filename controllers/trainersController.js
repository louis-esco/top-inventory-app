const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateTrainer = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Trainer name must be only alphabet characters"),
  body("game")
    .trim()
    .isAlpha()
    .withMessage("Game name must be only alphabet characters"),
];

const displayTrainersData = async (req, res) => {
  const query = await db.getPokemonsByTrainer();
  const trainers = [];
  for (let row of query) {
    const found = trainers.findIndex((el) => el.id === row.id);
    if (found > -1) trainers[found].pokemons.push(row.pokemons);
    else trainers.push({ ...row, pokemons: [row.pokemons] });
  }
  res.render("./trainers/trainers-list", { trainers: trainers });
};

const newTrainerGet = (req, res) => {
  res.render("./trainers/new-trainer");
};

const newTrainerPost = [
  validateTrainer,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("./trainers/new-trainer", {
        errors: errors.array(),
      });
    }
    await db.addTrainer(req.body.name, req.body.game);
    res.redirect("/trainers");
  },
];

const deleteTrainerPost = async (req, res) => {
  await db.deleteTrainer(req.params.id);
  res.redirect("/trainers");
};

const editTrainerGet = async (req, res) => {
  const trainerData = await db.getTrainerById(req.params.id);
  res.render("./trainers/edit-trainer", { trainer: trainerData[0] });
};

const editTrainerPost = [
  validateTrainer,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const trainerData = await db.getTrainerById(req.params.id);
      return res.status(400).render("./trainers/edit-trainer", {
        errors: errors.array(),
        trainer: trainerData[0],
      });
    }
    await db.updateTrainer(req.params.id, req.body.name, req.body.game);
    res.redirect("/trainers");
  },
];

module.exports = {
  displayTrainersData,
  newTrainerGet,
  newTrainerPost,
  deleteTrainerPost,
  editTrainerGet,
  editTrainerPost,
};
