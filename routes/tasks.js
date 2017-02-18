var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://navenprasad:chelsea26@ds159497.mlab.com:59497/tasklist-naven', ['tasks']);


// GET ALL TASKS
router.get('/tasks',function(req, res, next){
  db.tasks.find(function(err, tasks){
      if(err){
        res.send(err);
      }
      res.json(tasks);
  });
});

// GET SINGLE TASKS
router.get('/task/:id',function(req, res, next){
  db.tasks.findOne({_id: mongojs.ObjectID(req.params.id)},function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
  });
});


// Save Task
router.post('/task', function(req, res, next){
  var task = req.body;
  if(!task.title || task.isDone +''){
    res.status(400);
    res.json({
      "error": "BAD DATA"
    });
  }else{
    db.task.save(task, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(tasks);
    })
  }
});

//DELETE Task

router.delete('/task/:id',function(req, res, next){
  db.tasks.remove({_id: mongojs.ObjectID(req.params.id)},function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
  });
});


//UPDATE TASK

router.put('/task/:id',function(req, res, next){
  var task = req.body;
  var updTask = {};

  if(task.isDone){
    updTask.isDone = task.isDone;
  }

  if(task.title){
    updTask.title = task.title;
  }

  if(!updTask){
    res.status(400);
    res.json({
      "error" : "Bad Data"
    });
  } else{
    db.tasks.update({_id: mongojs.ObjectID(req.params.id)},updTask, {},function(err, task){
        if(err){
          res.send(err);
        }
        res.json(task);
    });

  }
});

//32mins



module.exports = router;
