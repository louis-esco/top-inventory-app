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
  await pool.query(
    `INSERT INTO trainers (name, game)
    VALUES
    ($1, $2)`,
    [name, game]
  );
}

async function addType(type) {
  await pool.query(
    `INSERT INTO types (type)
    VALUES
    ($1)`,
    [type]
  );
}

async function addPokemon(name, type_id, trainer_id) {
  await pool.query(
    `INSERT INTO pokemons (name, type_id, trainer_id)
    VALUES
    ($1, $2, $3)`,
    [name, type_id, trainer_id]
  );
}

async function deleteTrainer(id) {
  await pool.query(`DELETE FROM trainers WHERE id=$1`, [id]);
}

async function deleteType(id) {
  await pool.query(`DELETE FROM types WHERE id=$1`, [id]);
}

async function deletePokemon(id) {
  await pool.query(`DELETE FROM pokemons WHERE id=$1`, [id]);
}

async function getTrainerById(id) {
  const { rows } = await pool.query(`SELECT * FROM trainers WHERE id=$1`, [id]);
  return rows;
}

async function getTypeById(id) {
  const { rows } = await pool.query(`SELECT * FROM types WHERE id=$1`, [id]);
  return rows;
}

async function getPokemonById(id) {
  const { rows } = await pool.query(`SELECT * FROM pokemons WHERE id=$1`, [id]);
  return rows;
}

async function updateTrainer(id, name, game) {
  await pool.query(
    `UPDATE trainers
    SET name = $1, game = $2
    WHERE id = $3
    `,
    [name, game, id]
  );
}

async function updateType(id, type) {
  await pool.query(
    `UPDATE types
    SET type = $1
    WHERE id = $2
    `,
    [type, id]
  );
}

async function updatePokemon(id, name, type_id, trainer_id) {
  await pool.query(
    `UPDATE pokemons
    SET name = $1, type_id = $2, trainer_id = $3
    WHERE id = $4
    `,
    [name, type_id, trainer_id, id]
  );
}

async function getPokemonsByType() {
  const { rows } = await pool.query(
    `SELECT types.id, types.type, pokemons.name AS pokemons FROM types
    LEFT JOIN pokemons on types.id = pokemons.type_id`
  );
  return rows;
}

async function getPokemonsByTrainer() {
  const { rows } = await pool.query(
    `SELECT trainers.id, trainers.name, trainers.game, pokemons.name AS pokemons FROM trainers
    LEFT JOIN pokemons on trainers.id = pokemons.trainer_id`
  );
  return rows;
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
  getPokemonsByType,
  getPokemonsByTrainer,
};
