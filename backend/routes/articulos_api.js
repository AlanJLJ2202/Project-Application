//Agregar express
const express = require("express");
const Articulo = require('../models/articulo');
const { route } = require("../app");
const router = express.Router();

router.post("",(req, res, next)=>{
  const articulo = new Articulo({
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    cantidad: req.body.cantidad,
    categoria: req.body.categoria
  });

  articulo.save().then(createdPost => {
    res.status(201).json({
      message: 'Articulo added succesfull',
      id: createdPost._id
    });
  });

});

router.put("/:id", (req, res, next)=>{
  const articulo = new Articulo({
  _id: req.body.id,
  nombre: req.body.nombre,
  precio: req.body.precio,
  descripcion: req.body.descripcion,
  cantidad: req.body.cantidad,
  categoria: req.body.categoria
});
  Articulo.updateOne({_id: req.params.id}, articulo).then(result=>{
    console.log(result);
    res.status(200).json({message: "Articulo updated succesfully"});
  })
});

router.get('', (req,res,next)=>{
 Articulo.find().then(documents =>{
  res.status(200).json({
    message: 'Articulos expuestos con Exito!',
    articulos: documents
  });
 });
});

router.get("/:id", (req, res, next)=>{
  Articulo.findById(req.params.id).then(articulo=>{
    if(articulo){
      res.status(200).json(articulo);
    }else{
      res.status(404).json({message: 'Articulo no encontrado'})
    }
  });
});

router.delete('/:id',(req, res, next)=>{
  Articulo.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:'Articulo eliminado'});
  });
});

module.exports = router;
