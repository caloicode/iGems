import express from "express";
import pg from 'pg';
import moment from 'moment';
// const moment = require('moment');

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

import gdhs from "./sql_queries.js";

app.get("/", async (req, res) => {
  //must be the same as /addIgem
  // const pg_data = await db.query(`SELECT * FROM gaim_data ORDER BY id`);
  const pg_data = await db.query(gdhs);
  const data = pg_data.rows;
  // console.log(data);


  //set as styles
  const colors = data.map(d => {
    if (d.status === 'URGENT') {
      // return '#e8afa7'
      return 'red'
    } else if (d.status === 'Pending') {
      // return '#E2E2E2'
      return 'gray'
    } else {
      return 'none'
    }
  });

  // const ail_data = await db.query('')
  // const habitStrengthHTML = 
  // console.log(colors);

  // Get the current date
  const currentDate = new Date();

  // Create an array to store the days
  const daysArray = [];
  for (let i = 0; i < 7; i++) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - i);
    const day = previousDate.getDate();
    daysArray.push(day);
  }

  daysArray.reverse();

  // Log the array of days
  // console.log("daysArray:", daysArray);




  const pg_sum = await db.query(`SELECT SUM(earned) FROM gaim_data`);
  const sum = pg_sum.rows[0].sum;
  // console.log(sum);

  res.render("index.ejs", {
    dataSamp: data,
    sum,
    colors,
    daysArray
  });
});



// const id_igem_test = [[3, '0'], [1, '0'], [2, '0']];

// const array_add = id_igem_test.map(i => {
//   return `VALUES(${i[0]}, ${date}, ${Number(i[1])})`
// }).join(", ");

// console.log(array_add);

var idValues;
app.post("/addIgems", async (req, res) => {
  const pg_data = await db.query(`SELECT * FROM gaim_data ORDER BY id`);
  const data = pg_data.rows;

  idValues = data.map(id => id.id)
  // console.log("idValues:", idValues);
  const add_date = req.body.add_date;
  const igemArray = req.body.igems;
  // console.log(add_date);

  // console.log("igemArray:", igemArray);

  var id_igem = [];
  //FIX (MUST BE ID-DEPENDENT, NOT ORDER-DEPENDENT)
  igemArray.forEach((item, index) => {
    if (item != "") {
      id_igem.push([idValues[index], item]);
    }
  });

  // console.log("id_igem", id_igem);

  var array_set = id_igem.map(i => {
    return `WHEN id = ${i[0]} THEN ${Number(i[1])} + earned`
  }).join(" ");

  const array_add = id_igem.map(i => {
    return `(${i[0]}, '${add_date}', ${Number(i[1])})`
  }).join(", ");

  // console.log(array_add);
  // console.log("query: ", `INSERT INTO add_igem_log (gaim_data_id, date, igems_earned) ${array_add};`);

  await db.query(`INSERT INTO add_igem_log (gaim_data_id, date, igems_earned) VALUES${array_add};`);
  await db.query(`UPDATE gaim_data SET earned = CASE ${array_set} ELSE earned END;`);
  // await db.query(``)
  res.redirect("/");
});


app.post("/addGaim", (req, res) => {
  const date = req.body.add_gaim_date;
  const category = req.body.category;
  const task = req.body.task;
  const status = req.body.status;
  // const earned = req.body.earned;

  db.query(`INSERT INTO gaim_data (date, category, task, status, earned) VALUES('${date}', '${category}', '${task}', '${status}', 0);`);

  res.redirect("/");
});

app.post('/edit', async (req, res) => {
  const updates = req.body.edit;
  // console.log(updates);

  // console.log("query:", `UPDATE gaim_data SET date = '${updates[1]}', category = '${updates[2]}', task = '${updates[3]}', status = '${updates[4]}', earned = ${Number(updates[5])} WHERE id = ${parseInt(updates[0])}`);
  if (updates[4] === 'Completed') {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const date = `${year}-${month}-${day}`;

    await db.query(`INSERT INTO completed_log (gaim_data_id, date) VALUES(${parseInt(updates[0])}, '${date}')`);
  }

  await db.query(`UPDATE gaim_data SET date = '${updates[1]}', category = '${updates[2]}', task = '${updates[3]}', status = '${updates[4]}', earned = ${Number(updates[5])} WHERE id = ${parseInt(updates[0])}`);

  // console.log(req.body.edit);

  res.redirect('/')
})

app.post('/delete', async (req, res) => {
  const deleteID = req.body.id;
  await db.query(`DELETE FROM add_igem_log WHERE gaim_data_id = ${deleteID}`);
  await db.query(`DELETE FROM gaim_data WHERE id = ${deleteID}`);
  // console.log("delete id:", req.body.id); 
  res.redirect('/')
})

app.get('/dailyEarnings', async (req, res) => {
  const pg_stats = await db.query(`SELECT date, SUM(igems_earned) AS total_value FROM add_igem_log GROUP BY date ORDER BY date;`);
  const data = pg_stats.rows;

  const dates = data.map(entry => moment(entry.date).format('MM-DD'));
  const values = data.map(entry => parseFloat(entry.total_value));

  console.log("dates", dates);
  console.log("values", values);



  // res.redirect('/');
  // Render the EJS file with data
  res.render('stats_daily.ejs', {
    title: 'Daily iGems Earned',
    dates,
    values
  });

  // res.json(stats);
  // res.render('stats_daily.ejs')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});