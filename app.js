const path = require("node:path");
const express = require("express");
const indexRouter = require("./routes/indexRoutes");
const PORT = process.env.PORT || 3000;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
