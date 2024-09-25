#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const populateQuery = `

DELETE FROM types;
DELETE FROM trainers;
DELETE FROM pokemons;

ALTER SEQUENCE types_id_seq RESTART WITH 1;
ALTER SEQUENCE trainers_id_seq RESTART WITH 1;
ALTER SEQUENCE pokemons_id_seq RESTART WITH 1;


INSERT INTO types (type) 
VALUES
  ('Grass'),
  ('Fire'),
  ('Water'),
  ('Fighting'),
  ('Poison'),
  ('Normal'),
  ('Flying'),
  ('Electric');

  INSERT INTO trainers (name, game) 
  VALUES
  ('Red', 'Crystal'),
  ('Chase', 'Red'),
  ('Ethan', 'Blue'),
  ('Green', 'Violet'),
  ('Elaine', 'Ruby'),
  ('Kris', 'Sapphire');

INSERT INTO pokemons (name, trainer_id, type_id)
VALUES
('Bulbasaur', 4, 5),
('Charmander', 6, 3),
('Squirtle', 4, 1),
('Caterpie', 2, 7),
('Pidgey', 1, 4),
('Rattata', 3, 6),
('Pikachu', 6, 2),
('Jigglypuff', 6, 2);
`;

async function populate() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  await client.connect();
  await client.query(populateQuery);
  await client.end();
  console.log("done");
}

populate();
