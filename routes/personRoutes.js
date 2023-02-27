const router = require("express").Router();

const Person = require("../models/Person");

router.post("/", async (req, res) => {
  // req
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatório" });
    return;
  }

  // create
  try {
    await Person.create(person);

    res.status(201).json({ message: "Pessoa criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const people = await Person.findOne({ _id: id });

    if (!people) {
      res.status(400).json({ message: "Pessoa não encontrada na base" });
      return;
    }

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// UPDATE
//  PUT - atualização total
//  PATCH - atualização parcial
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(400).json({ message: "Pessoa não encontrada na base" });
      return;
    }

    res.status(201).json({ message: "Pessoa editada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedPerson = await Person.deleteOne({ _id: id });

    if (deletedPerson.matchedCount === 0) {
      res.status(400).json({ message: "Pessoa não encontrada na base" });
      return;
    }

    res.status(201).json({ message: "Pessoa deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
