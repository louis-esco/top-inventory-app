const db = require("../db/queries");

const displayPokemonsData = async (req, res) => {
  const pokemons = await db.getPokemonsData();
  res.render("./pokemons/pokemons-list", { pokemons: pokemons });
};

const newPokemonGet = (req, res) => {
  res.render("./pokemons/new-pokemon");
};

const newPokemonPost = async (req, res) => {
  await db.addPokemon(req.body.name);
  res.redirect("/pokemons");
};

const deletePokemonPost = async (req, res) => {
  await db.deletePokemon(req.params.id);
  res.redirect("/pokemons");
};

const editPokemonGet = async (req, res) => {
  const pokemonData = await db.getPokemonById(req.params.id);
  res.render("./pokemons/edit-pokemon", { pokemon: pokemonData[0] });
};

const editPokemonPost = async (req, res) => {
  await db.updatePokemon(req.params.id, req.body.name);
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
