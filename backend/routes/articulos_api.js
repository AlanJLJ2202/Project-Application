//Agregar express
const express = require("express");
const Articulo = require('../models/articulo');
//const { route } = require("../app");
const router = express.Router();
const multer =require("multer");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Extension no valida");
    if(isValid){
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
})

router.post("", multer({storage: storage}).single("image"), (req, res, next)=>{
  const url = req.protocol + '://' + req.get("host");
    const articulo = new Articulo({
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    cantidad: req.body.cantidad,
    categoria: req.body.categoria,
    imagePath: url + "/images/" + req.file.filename
  });

  articulo.save().then(createdPost => {
    res.status(201).json({
      message: 'Articulo added succesfull',
      articulo:{
        ...createdPost,
        id: createdPost._id
      }
    });
  })
});

router.put("/:id",  multer({storage: storage}).single("image"), (req, res, next)=>{
  //const articulo = new Articulo({
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const articulo = {
  //_id: req.body.id,
  nombre: req.body.nombre,
  precio: req.body.precio,
  descripcion: req.body.descripcion,
  cantidad: req.body.cantidad,
  categoria: req.body.categoria,
  imagePath: imagePath
};
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
