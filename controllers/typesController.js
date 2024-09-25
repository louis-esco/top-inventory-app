const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateType = [
  body("type")
    .trim()
    .isAlpha()
    .withMessage("Type name must be only alphabet characters"),
];

const displayTypesData = async (req, res) => {
  const query = await db.getPokemonsByType();
  const types = [];
  for (let row of query) {
    const found = types.findIndex((el) => el.id === row.id);
    if (found > -1) types[found].pokemons.push(row.pokemons);
    else types.push({ ...row, pokemons: [row.pokemons] });
  }
  res.render("./types/types-list", { types: types });
};

const newTypeGet = (req, res) => {
  res.render("./types/new-type");
};

const newTypePost = [
  validateType,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("./types/new-type", {
        errors: errors.array(),
      });
    }
    await db.addType(req.body.type);
    res.redirect("/types");
  },
];

const deleteTypePost = async (req, res) => {
  await db.deleteType(req.params.id);
  res.redirect("/types");
};

const editTypeGet = async (req, res) => {
  const typeData = await db.getTypeById(req.params.id);
  res.render("./types/edit-type", { type: typeData[0] });
};

const editTypePost = [
  validateType,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const typeData = await db.getTypeById(req.params.id);
      return res.status(400).render("./types/edit-type", {
        errors: errors.array(),
        type: typeData[0],
      });
    }
    await db.updateType(req.params.id, req.body.type);
    res.redirect("/types");
  },
];

module.exports = {
  displayTypesData,
  newTypeGet,
  newTypePost,
  deleteTypePost,
  editTypeGet,
  editTypePost,
};
