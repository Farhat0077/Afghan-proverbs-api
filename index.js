const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// middleware setup
app.use(express.json());

//data storage path
const dataFile = "./info.json";

//getting all proverbs
const getProverbs = () => {
  const data = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(data);
};

//saving  proverbs
const saveProverbs = (proverbs) => {
  fs.writeFileSync(dataFile, JSON.stringify(proverbs, null, 2));
};

//Routes

//get/proverbs
app.get("/proverbs", (req, res) => {
  const proverbs = getProverbs();
  res.json(proverbs);
});

//get/proverbs/id
app.get("/proverbs/:id", (req, res) => {
  const proverbs = getProverbs();
  const proverb = proverbs.find((p) => p.id === parseInt(req.params.id));
  if (proverb) {
    res.json(proverb);
  } else {
    res.status(404).json({ message: "proverb with this id not found! " });
  }
});
// post/proverbs/id
app.post("/proverbs", (req, res) => {
  const proverbs = getProverbs();
  const newProverb = req.body;
  proverbs.push(newProverb);
  saveProverbs(proverbs);
  res.status(201).json(newProverb);
});

//put/proverbs/id
app.put("/proverbs/:id", (req, res) => {
  const proverbs = getProverbs();
  const index = proverbs.findIndex((p) => p.id === parseInt(req.params.id));

  if (index !== -1) {
    proverbs[index] = {
      ...proverbs[index],
      ...req.body,
      id: proverbs[index].id,
    };

    saveProverbs(proverbs);

    res.json(proverbs[index]);
  } else {
    res.status(404).json({ message: "Proverb with this id not found !" });
  }
});

//delet/proverbs/id
app.delete("/proverbs/:id", (req, res) => {
  const proverbs = getProverbs();
  const index = proverbs.findIndex((p) => p.id === parseInt(req.params.id));

  if (index !== -1) {
    const [deleted] = proverbs.splice(index, 1);
    saveProverbs(proverbs);
    res.json(deleted);
  } else {
    res.status(404).json({ message: "Proverb  with this id not found !" });
  }
});
app.listen(PORT, () => {
  console.log(`server is running  http://localhost:${PORT}`);
});
