import express from "express";

import { getSPIData } from "./database.js";

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.get("/spidata", async (req, res) => {
  const data = await getSPIData();
  res.send(data);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
