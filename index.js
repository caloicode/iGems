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

var idValues;
app.get("/", async (req, res) => {
  const pg_data = await db.query(`SELECT * FROM gaim_data`);
  const data = pg_data.rows;
  idValues = data.map(id => id.id)
  // console.log(idValues);

  res.render("index.ejs", {
    dataSamp: data
  });
  // res.render("index.ejs", { dataSamp });
});

app.post("/addIgems", async (req, res) => {
  const igemArray = req.body.igems;
  console.log(igemArray);


  let counter = 0;
  igemArray.forEach((igem) => {
    dataSamp[counter].earned += Number(igem);
    counter++;
  });

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
  console.log(req.body);
  res.redirect('/')

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});