//Agregar express
const express = require("express");
const Post = require('../models/articulo');
const { route } = require("../app");
const router = express.Router();

router.post("",(req, res, next)=>{
  const post = new Post({
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    cantidad: req.body.cantidad,
    categoria: req.body.categoria
  });
  articulo.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added succesfull',
      postId: createdPost._id
    });
  });
});

router.put("/:id", (req, res, next)=>{
  const post = new Post({
  _id:req.body.id,
  nombre: req.body.nombre,
  precio: req.body.precio,
  descripcion: req.body.descripcion,
  imagen: req.body.imagen,
  cantidad: req.body.cantidad,
  categoria: req.body.categoria
});
  Post.updateOne({_id: req.params.id}, post).then(result=>{
    res.status(200).json({message: "Post updated succesfully"});
  })
});

router.get('', (req,res,next)=>{
 Post.find().then(documents =>{
  res.status(200).json({
    message: 'Publicaciones expuestas con Exito!',
    posts: documents
  });
 });
});

router.get("/:id", (req, res, next)=>{
  Post.findById(req.params.id).then(post=>{
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message: 'Post no encontrado'})
    }
  });
});

router.delete('/:id',(req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:'Publicacion eliminada'});
  });
});

module.exports = router;
