const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validatePoke = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Pokemon name must be only alphabet characters"),
];

const displayPokemonsData = async (req, res) => {
  const pokemons = await db.getPokemonsData();
  res.render("./pokemons/pokemons-list", { pokemons: pokemons });
};

const newPokemonGet = async (req, res) => {
  const types = await db.getTypesData();
  const trainers = await db.getTrainersData();
  res.render("./pokemons/new-pokemon", {
    types: types,
    trainers: trainers,
  });
};

const newPokemonPost = [
  validatePoke,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const types = await db.getTypesData();
      const trainers = await db.getTrainersData();
      return res.status(400).render("./pokemons/new-pokemon", {
        errors: errors.array(),
        trainers: trainers,
        types: types,
      });
    }
    await db.addPokemon(req.body.name, req.body.type_id, req.body.trainer_id);
    res.redirect("/pokemons");
  },
];

const deletePokemonPost = async (req, res) => {
  await db.deletePokemon(req.params.id);
  res.redirect("/pokemons");
};

const editPokemonGet = async (req, res) => {
  const types = await db.getTypesData();
  const trainers = await db.getTrainersData();
  const pokemonData = await db.getPokemonById(req.params.id);
  res.render("./pokemons/edit-pokemon", {
    pokemon: pokemonData[0],
    types: types,
    trainers: trainers,
  });
};

const editPokemonPost = [
  validatePoke,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const types = await db.getTypesData();
      const trainers = await db.getTrainersData();
      const pokemonData = await db.getPokemonById(req.params.id);
      return res.status(400).render("./pokemons/edit-pokemon", {
        errors: errors.array(),
        trainers: trainers,
        types: types,
        pokemon: pokemonData[0],
      });
    }
    await db.updatePokemon(
      req.params.id,
      req.body.name,
      req.body.type_id,
      req.body.trainer_id
    );
    res.redirect("/pokemons");
  },
];

module.exports = {
  displayPokemonsData,
  newPokemonGet,
  newPokemonPost,
  deletePokemonPost,
  editPokemonGet,
  editPokemonPost,
};
