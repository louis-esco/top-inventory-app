const express = require("express");
const indexController = require("../controllers/indexController");
const trainersController = require("../controllers/trainersController");
const typesController = require("../controllers/typesController");
const pokemonsController = require("../controllers/pokemonsController");

const router = express.Router();

router.get("/", indexController.displayDbList);

router.get("/trainers", trainersController.displayTrainersData);
router.get("/trainers/new", trainersController.newTrainerGet);
router.post("/trainers/new", trainersController.newTrainerPost);
router.post("/trainers/delete/:id", trainersController.deleteTrainerPost);
router.get("/trainers/edit/:id", trainersController.editTrainerGet);
router.post("/trainers/edit/:id", trainersController.editTrainerPost);

router.get("/types", typesController.displayTypesData);
router.get("/types/new", typesController.newTypeGet);
router.post("/types/new", typesController.newTypePost);
router.post("/types/delete/:id", typesController.deleteTypePost);
router.get("/types/edit/:id", typesController.editTypeGet);
router.post("/types/edit/:id", typesController.editTypePost);

router.get("/pokemons", pokemonsController.displayPokemonsData);
router.get("/pokemons/new", pokemonsController.newPokemonGet);
router.post("/pokemons/new", pokemonsController.newPokemonPost);
router.post("/pokemons/delete/:id", pokemonsController.deletePokemonPost);
router.get("/pokemons/edit/:id", pokemonsController.editPokemonGet);
router.post("/pokemons/edit/:id", pokemonsController.editPokemonPost);

module.exports = router;
