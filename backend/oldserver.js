const express = require("express");
const mssql = require("mssql");
const cors = require("cors");

const app = express();
const port = 8000;
const config = {
  user: "DESKTOP-50T6J1U\Aman Dhiman",
  password: "",
  server: "DESKTOP-50T6J1U\\SQLEXPRESS",
  database: "ztester",
  port: "1433",
  connectionTimeout: 15000
};

mssql
  .connect(config)
  .then(() => {
    console.log("Connected to SQL Server");
  })
  .catch((err) => {
    console.log("Error connecting to SQL Server:", err);
  });

app.use(cors());

app.get("/", (req, res) => {
  const query = "SELECT * FROM your_table";

  mssql
    .query(query)
    .then((result) => {
        console.log(result)
      res.json(result.recordset);
    })
    .catch((err) => {
      console.log("Error executing query:", err);
      res.status(500).send("Error retrieving data from SQL Server");
    });
});

app.listen(port, () => {
  console.log(`Server is running on PORT http://localhost:` + port);
});
