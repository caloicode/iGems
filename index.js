import express from "express";
import pg from 'pg';

const app = express();
const port = 3000;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));


const db = new pg.Client({
  user: process.env.PG_user || "postgres",
  host: process.env.PG_host || "localhost",
  database: process.env.PG_database || "gaim",
  password: process.env.PG_password || "dbdbdb1234",
  port: process.env.PG_port || 5432
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
  //must be the same as /addIgem
  const pg_data = await db.query(`SELECT * FROM gaim_data ORDER BY id`);
  const data = pg_data.rows;
  const pg_sum = await db.query(`SELECT SUM(earned) FROM gaim_data`);
  const sum = pg_sum.rows[0].sum;
  console.log(sum);
  
  res.render("index.ejs", {
    dataSamp: data, sum
  });
});


var idValues;

app.post("/addIgems", async (req, res) => {
  const pg_data = await db.query(`SELECT * FROM gaim_data ORDER BY id`);
  const data = pg_data.rows;

  idValues = data.map(id => id.id)
  // console.log("idValues:", idValues);

  const igemArray = req.body.igems;
  // console.log("igemArray:", igemArray);

  var id_igem = [];
  // igemArray.forEach((item, index) => {
  //   if (item != "") {
  //     id_igem.push([idValues[index], item]);
  //   }
  // });

  console.log(id_igem);
  
  var array = id_igem.map(i => {
    return `WHEN id = ${i[0]} THEN ${Number(i[1])} + earned`
  }).join(" ");

  console.log(array);
  

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

app.post('/edit', async (req, res) => {
  const updates = req.body.edit;
  await db.query(`UPDATE gaim_data SET category = '${updates[1]}', task = '${updates[2]}', status = '${updates[3]}', earned = ${Number(updates[4])} WHERE id = ${updates[0]}`);  
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