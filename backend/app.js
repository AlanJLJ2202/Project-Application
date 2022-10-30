const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/articulos_api");

mongoose.connect("mongodb+srv://admin:0TpvBms3jz8oxkLA@clusterproject.3w83j3v.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
  console.log('Base de datos conectada');
})
.catch(()=>{
  console.log('Conexion fallida :(');
})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  res.setHeader("Allow", "GET, POST PATCH DELETE, OPTIONS");
  next();
});

app.use("/api", postRoutes);
module.exports = app;
