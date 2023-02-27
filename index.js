// config inicial

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// forma de ler JSON / middlewares

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// rota da API / endpoint
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

// rota inicial / endpoint
app.get("/", (req, res) => {
  // mostrar req

  res.json({ message: "Oi Express!" });
});

// entregrar uma porta
mongoose
  .connect("mongodb://localhost:27017/?readPreference=primary&ssl=false")
  .then(() => {
    console.log("Conectamos com o MongoDB!");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
