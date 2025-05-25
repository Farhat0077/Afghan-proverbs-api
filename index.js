const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// File to store proverbs
const dataFile = "./info.json";

// Read proverbs from file
const getProverbs = () => {
  const data = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(data);
};

// Save proverbs to file
const saveProverbs = (proverbs) => {
  fs.writeFileSync(dataFile, JSON.stringify(proverbs, null, 2));
};

// GET /proverbs - get all proverbs
app.get("/proverbs", (req, res) => {
  const proverbs = getProverbs();
  res.json(proverbs);
});

// GET /proverbs/:id - get one proverb by ID
app.get("/proverbs/:id", (req, res) => {
  const proverbs = getProverbs();
  const proverb = proverbs.find((p) => p.id === parseInt(req.params.id));
  if (proverb) {
    res.json(proverb);
  } else {
    res.status(404).json({ message: "Proverb with this ID not found!" });
  }
});

// POST /proverbs - create a new proverb with unique ID
app.post("/proverbs", (req, res) => {
  const proverbs = getProverbs();
  const newProverb = req.body;

  // Auto-generate a unique ID
  const newId = proverbs.length > 0 ? Math.max(...proverbs.map(p => p.id)) + 1 : 1;
  newProverb.id = newId;

  proverbs.push(newProverb);
  saveProverbs(proverbs);
  res.status(201).json(newProverb);
});

// PUT /proverbs/:id - update a proverb by ID
app.put("/proverbs/:id", (req, res) => {
  const proverbs = getProverbs();
  const index = proverbs.findIndex((p) => p.id === parseInt(req.params.id));

  if (index !== -1) {
    proverbs[index] = {
      ...proverbs[index],
      ...req.body,
      id: proverbs[index].id, // Keep the original ID
    };
    saveProverbs(proverbs);
    res.json(proverbs[index]);
  } else {
    res.status(404).json({ message: "Proverb with this ID not found!" });
  }
});

// DELETE /proverbs/:id - delete a proverb by ID
app.delete("/proverbs/:id", (req, res) => {
  const proverbs = getProverbs();
  const index = proverbs.findIndex((p) => p.id === parseInt(req.params.id));

  if (index !== -1) {
    const [deleted] = proverbs.splice(index, 1);
    saveProverbs(proverbs);
    res.json(deleted);
  } else {
    res.status(404).json({ message: "Proverb with this ID not found!" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
