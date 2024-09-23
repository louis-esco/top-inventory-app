const db = require("../db/queries");

const displayTypesData = async (req, res) => {
  const types = await db.getTypesData();
  res.render("./types/types-list", { types: types });
};

const newTypeGet = (req, res) => {
  res.render("./types/new-type");
};

const newTypePost = async (req, res) => {
  await db.addType(req.body.type);
  res.redirect("/types");
};

const deleteTypePost = async (req, res) => {
  await db.deleteType(req.params.id);
  res.redirect("/types");
};

const editTypeGet = async (req, res) => {
  const typeData = await db.getTypeById(req.params.id);
  res.render("./types/edit-type", { type: typeData[0] });
};

const editTypePost = async (req, res) => {
  await db.updateType(req.params.id, req.body.type);
  res.redirect("/types");
};

module.exports = {
  displayTypesData,
  newTypeGet,
  newTypePost,
  deleteTypePost,
  editTypeGet,
  editTypePost,
};
