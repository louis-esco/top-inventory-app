const db = require("../db/queries");

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

const newPokemonPost = async (req, res) => {
  await db.addPokemon(req.body.name, req.body.type_id, req.body.trainer_id);
  res.redirect("/pokemons");
};

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

const editPokemonPost = async (req, res) => {
  await db.updatePokemon(
    req.params.id,
    req.body.name,
    req.body.type_id,
    req.body.trainer_id
  );
  res.redirect("/pokemons");
};

module.exports = {
  displayPokemonsData,
  newPokemonGet,
  newPokemonPost,
  deletePokemonPost,
  editPokemonGet,
  editPokemonPost,
};
