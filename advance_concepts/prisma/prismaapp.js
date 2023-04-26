const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Cors = require("cors");
const bodyParser = require("body-parser");
app.use(Cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
  bodyParser.json()
);
// app.use();

app.get("/prismaget", async (req, res) => {
  try {
    const users = await prisma.User.findFirst({ where: { name: "nish" } });
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

app.get("/prismafindmany", async (req, res) => {
  try {
    const users = await prisma.User.findMany({
      skip: 0,
      take: 3,
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/prismaaggregate", async (req, res) => {
  try {
    const count = await prisma.User.aggregate({
      _count: {
        id: true,
      },
      _sum: {
        id: true,
      },
      _max: {
        id: true,
      },
    });
    const count_id = count._max.id;
    //I was trying to fetch the other columns of the max id by using another query ...
    const results = await prisma.User.findMany({
      where: {
        id: count_id,
      },
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/prismapost", async (req, res) => {
  //   console.log(req.body);
  const email = req.body.email;
  const name = req.body.name;
  try {
    await prisma.User.create({
      data: { email: email, name: name },
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/prismaupdate", async (req, res) => {
  const id = Number(req.body.id);
  const email = req.body.email;
  const name = req.body.name;
  try {
    await prisma.User.update({
      where: { id: id },
      data: { email: email, name: name },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put("/prismaupdatemany", async (req, res) => {
  const name = req.body.name;
  const newname = req.body.newname;
  try {
    await prisma.User.updateMany({
      where: { name: name },
      data: { name: newname },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.delete("/prismadelete", async (req, res) => {
  const id = Number(req.body.id);
  try {
    await prisma.User.delete({
      where: { id: id },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.delete("/deletemany", async (req, res) => {
  const name = req.body.name;
  try {
    await prisma.User.deleteMany({
      where: { name: name },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/prismapagination", async (req, res) => {
  const skip = Number(req.body.skip);
  const take = Number(req.body.take);
  try {
    const contents = await prisma.User.findMany({
      take: take,
      skip: skip,
      where: {
        id: 2,
        // name: "nishanth",
      },
    });
    res.status(200).json(contents);
  } catch (err) {
    res.send(400).json(err);
  }
});

// Include method has to be added
// app.post("/prismafilters",async(req,res)=>{

// })

app.listen(3030, (err) => {
  if (err) res.status(400).json(err);
  else {
    console.log("connected to Port : 3030");
  }
});
