const sql = require("msnodesqlv8");
const express = require('express')
const cors = require('cors')


const connectionString = "server=DESKTOP-50T6J1U\\SQLEXPRESS;Database=ztester;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const app  = express();

app.use(cors())
app.get("/", (req, res) => {
  const query = "SELECT * FROM Employees";
  sql.query(connectionString,query,(err,response)=>{
    //console.log(response)
    res.send(response)
  })
});

app.get('/employee/:id',(req,res)=>{
  const userId = parseInt(req.params.id);
  const query = "select * from employees where EMPLOYEE_ID = "+userId
  console.log(query)
  sql.query(connectionString,query,(err,response)=>{
    //console.log(response)
    res.send(response)
  })
})


app.listen(8000, () => {
  console.log(`Server is running on PORT http://localhost:8000` );
});
