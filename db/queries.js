const pool = require("./pool");

async function getDbList() {
  const { rows } = await pool.query(`SELECT table_name
  FROM information_schema.tables
 WHERE table_schema='public'
   AND table_type='BASE TABLE';`);
  return rows;
}

async function getTrainersData() {
  const { rows } = await pool.query(`SELECT * FROM trainers ORDER BY id;`);
  return rows;
}

async function getPokemonsData() {
  const { rows } = await pool.query(`
    SELECT pokemons.id, pokemons.name, trainers.name AS trainer, types.type 
    FROM pokemons 
    LEFT JOIN trainers ON pokemons.trainer_id = trainers.id
    LEFT JOIN types ON pokemons.type_id = types.id
    ORDER BY pokemons.id`);
  return rows;
}

async function getTypesData() {
  const { rows } = await pool.query(`SELECT * FROM types ORDER BY id;`);
  return rows;
}

async function addTrainer(name, game) {
  await pool.query(`INSERT INTO trainers (name, game)
    VALUES
    ('${name}','${game}')
    ;`);
}

async function addType(type) {
  await pool.query(`INSERT INTO types (type)
    VALUES
    ('${type}')
    ;`);
}

async function addPokemon(name, type_id, trainer_id) {
  await pool.query(`INSERT INTO pokemons (name, type_id, trainer_id)
    VALUES
    ('${name}', '${type_id}', '${trainer_id}')
    ;`);
}

async function deleteTrainer(id) {
  await pool.query(`DELETE FROM trainers WHERE id=${id};`);
}

async function deleteType(id) {
  await pool.query(`DELETE FROM types WHERE id=${id};`);
}

async function deletePokemon(id) {
  await pool.query(`DELETE FROM pokemons WHERE id=${id};`);
}

async function getTrainerById(id) {
  const { rows } = await pool.query(`SELECT * FROM trainers WHERE id=${id};`);
  return rows;
}

async function getTypeById(id) {
  const { rows } = await pool.query(`SELECT * FROM types WHERE id=${id};`);
  return rows;
}

async function getPokemonById(id) {
  const { rows } = await pool.query(`SELECT * FROM pokemons WHERE id=${id};`);
  return rows;
}

async function updateTrainer(id, name, game) {
  await pool.query(`UPDATE trainers
    SET name = '${name}', game = '${game}'
    WHERE id = ${id}
    `);
}

async function updateType(id, type) {
  await pool.query(`UPDATE types
    SET type = '${type}'
    WHERE id = ${id}
    `);
}

async function updatePokemon(id, name) {
  await pool.query(`UPDATE pokemons
    SET name = '${name}'
    WHERE id = ${id}
    `);
}

module.exports = {
  getDbList,
  getPokemonsData,
  getTrainersData,
  getTypesData,
  addTrainer,
  deleteTrainer,
  getTrainerById,
  updateTrainer,
  addType,
  deleteType,
  getTypeById,
  updateType,
  addPokemon,
  deletePokemon,
  getPokemonById,
  updatePokemon,
};
