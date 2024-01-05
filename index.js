import { count } from "console";
import express from "express";

// import dataSamp from "../data";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var dataSamp = [
  {
    id: 1,
    category: "Math",
    task: "Trigo",
    status: "Pending",
    earned: 5,
  },
  {
    id: 2,
    category: "Code",
    task: "Postgres",
    status: "Completed",
    earned: 20,
  },
  {
    id: 3,
    category: "Nihongo",
    task: "Unit 28",
    status: "Pending",
    earned: 31,
  },
];

app.get("/", (req, res) => {
  console.log(dataSamp.length);
  res.render("index.ejs", { dataSamp });
});

app.post("/addIgems", (req, res) => {
  const igemArray = req.body.igems;
  let counter = 0;

  igemArray.forEach((igem) => {
    dataSamp[counter].earned += Number(igem);
    counter++;
  });
  res.redirect("/");
});

app.post("/addGaim", (req, res) => {
  const category = req.body.category;
  const task = req.body.task;
  const status = req.body.status;
  const earned = req.body.earned;

  const lastId = dataSamp[dataSamp.length - 1].id;
  console.log(lastId);

  dataSamp.push({
    id: lastId + 1,
    category: category,
    task: task,
    status: status,
    earned: parseInt(earned),
  });

  console.log(dataSamp);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
