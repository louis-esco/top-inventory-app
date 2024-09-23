const db = require("../db/queries");

const displayDbList = async (req, res) => {
  const dbList = await db.getDbList();
  res.render("index", { dbList: dbList });
};

const displayDbData = async (req, res) => {
  const dbData = await db.getDbData(req.params.db);
  res.render("data", { dbData: dbData });
};

module.exports = { displayDbList, displayDbData };
