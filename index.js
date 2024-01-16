import {
  count
} from "console";
import express from "express";
import pg from 'pg';

// import dataSamp from "../data";

const app = express();
const port = 3000;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "gaim",
  password: "dbdbdb1234",
  port: 5432
});
db.connect();

var dataSamp = [{
    id: 1,
    timestamp: "",
    category: "Math",
    task: "Trigo",
    status: "Pending",
    earned: 5,
  },
  {
    id: 2,
    timestamp: "",
    category: "Code",
    task: "Postgres",
    status: "Completed",
    earned: 20,
  },
  {
    id: 3,
    timestamp: "",
    category: "Nihongo",
    task: "Unit 28",
    status: "Pending",
    earned: 31,
  },
];




app.get("/", async (req, res) => {
  const pg_data = await db.query(`SELECT * FROM gaim_data`);
  const data = pg_data.rows;
  res.render("index.ejs", {
    dataSamp: data
  });
});


var idValues;

app.post("/addIgems", async (req, res) => {
  const pg_data = await db.query(`SELECT * FROM gaim_data`);
  const data = pg_data.rows;

  idValues = data.map(id => id.id)
  // console.log("idValues:", idValues);

  const igemArray = req.body.igems;
  // console.log("igemArray:", igemArray);

  var id_igem = [];
  igemArray.forEach((item, index) => {
    if (item != "") {
      id_igem.push([idValues[index], item]);
    }
  });

  var array = id_igem.map(i => {
    return `WHEN id = ${i[0]} THEN ${parseInt(i[1])} + earned`
  }).join(" ");

  // console.log("id_igem:", id_igem);
  // console.log(array);

  await db.query(`UPDATE gaim_data SET earned = CASE ${array} ELSE earned END;`)
  res.redirect("/");
});



app.post("/addGaim", (req, res) => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const date = `${year}-${month}-${day}`;
  const category = req.body.category;
  const task = req.body.task;
  const status = req.body.status;
  const earned = req.body.earned;

  db.query(`INSERT INTO gaim_data (date, category, task, status, earned) VALUES('${date}', '${category}', '${task}', '${status}', '${earned}');`);

  res.redirect("/");
});

app.post('/edit', (req, res) => {
  const updates = req.body.edit;
  db.query(`UPDATE gaim_data SET category = '${updates[1]}', task = '${updates[2]}', status = '${updates[3]}', earned = ${parseInt(updates[4])} WHERE id = ${updates[0]}`);  
  // console.log(req.body.edit);

  res.redirect('/')
})

app.post('/delete', async (req, res) => {
  const deleteID = req.body.id;
  await db.query(`DELETE FROM gaim_data WHERE id = ${deleteID}`)
  // console.log("delete id:", req.body.id); 
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});