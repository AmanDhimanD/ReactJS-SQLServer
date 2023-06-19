const sql = require("msnodesqlv8");
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const connectionString =
  "server=DESKTOP-50T6J1U\\SQLEXPRESS;Database=ztester;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const query = "SELECT * FROM Employees";
  sql.query(connectionString, query, (err, response) => {
    //console.log(response)
    res.send(response);
  });
});

app.post("/api/sendCode", (req, res) => {
  const code = req.body.code;
  // Process the received code
  console.log(code);
  // Send a response back to the client
  sql.query(connectionString, code, (err, response) => {
    if (err) {
      // Handle any errors that occurred during query execution
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Error executing SQL query" });
    } else {
      // Send the response back to the frontend
      res.json(response);
    }
  });
});

app.listen(8000, () => {
  console.log(`Server is running on PORT http://localhost:8000`);
});
