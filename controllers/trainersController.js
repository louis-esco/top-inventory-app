const db = require("../db/queries");

const displayTrainersData = async (req, res) => {
  const trainers = await db.getTrainersData();
  for (const trainer of trainers) {
    const pokemons = (await db.getPokemonsByTrainerId(trainer.id)).map(
      (poke) => poke.name
    );
    trainer.pokemons = pokemons;
  }
  res.render("./trainers/trainers-list", { trainers: trainers });
};

const newTrainerGet = (req, res) => {
  res.render("./trainers/new-trainer");
};

const newTrainerPost = async (req, res) => {
  await db.addTrainer(req.body.name, req.body.game);
  res.redirect("/trainers");
};

const deleteTrainerPost = async (req, res) => {
  await db.deleteTrainer(req.params.id);
  res.redirect("/trainers");
};

const editTrainerGet = async (req, res) => {
  const trainerData = await db.getTrainerById(req.params.id);
  res.render("./trainers/edit-trainer", { trainer: trainerData[0] });
};

const editTrainerPost = async (req, res) => {
  await db.updateTrainer(req.params.id, req.body.name, req.body.game);
  res.redirect("/trainers");
};

module.exports = {
  displayTrainersData,
  newTrainerGet,
  newTrainerPost,
  deleteTrainerPost,
  editTrainerGet,
  editTrainerPost,
};
