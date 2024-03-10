const express = require("express");
const app = express();
const cors = require("cors");

const { createDbConnection } = require("./data-layer/dbConfig.js");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/v1/api/executeServices", require("./Routers/index.js"));

// Test Route
app.get("/", async (req, res) => {
  res.json({ data: "Form's Server Is Up and Connected!!" });
});

createDbConnection();

app.listen(PORT, () => {
  console.log(`Server is Up and Running on Port: ${PORT}`);
});
