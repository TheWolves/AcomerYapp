const router = require('express').Router(),
mongojs = require('mongojs'),
db = mongojs('mongodb://Jason25Dev:123456789@ds117759.mlab.com:17759/acomeryapp',['restaurantes']);


router.get('/restaurantes', (req, res, next) =>{
  db.restaurantes.find((err, restaurantes) =>{
      if(err) return next(err);
      res.json(restaurantes);
  });
});

router.get('/restaurantes', (req, res, next) =>{
  db.restaurantes.find((err, restaurantes) =>{
      if(err) return next(err);
      res.json(restaurantes);
  });
});

router.get('/restaurantes/:id', (req, res, next) =>{
  db.restaurantes.findOne({_id: mongojs.Object(req.params.id)},(err, restaurante) =>{
      if(err) return next(err);
      res.json(restaurante);
  });
});

router.post('/restaurantes', (req, res, next) =>{
  const restaurante = req.body;
  if(!restaurante.title  || !(restaurante.isDone + '')){
    res.status(400).json({
      error: 'Bad Data'
    });
  } else{
    db.restaurantes.save(restaurante, (err, task)=>{
      if(err) return next(err);
      res.json(restaurante);
    });
  }
});

router.delete('/restaurantes/:id', (req, res, next) =>{
  db.restaurantes.remove({_id: mongojs.Object(req.params.id)}, (err, result) =>{
  if(err) return next(err);
  res.json(result);
});
});


router.put('/restaurantes/:id', (req, res, next) =>{
  db.restaurantes.update({_id: mongojs.ObjectId(req,params.id)},(err, task)=>{

  } )
})


module.exports = router;
