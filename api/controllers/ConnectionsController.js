module.exports = {
    

  new: function (req,res){
    res.view();
  },
    
  
  create: function(req, res, next) {

    var connectionObj = {
      project: req.param('project'),
      start: req.param('start'),
      end: req.param('end'),
    }

    Connections.create(connectionObj, function cObjectCreated(err, Connections) {

      // // If there's an error
      // if (err) return next(err);
      if (err) {
        console.log("err");
        req.session.flash = {
          err: err
        }

        // If error redirect back to sign-up page
        return res.send('error');
      }
      //  res.redirect('/project/index/' + project.id);
//      console.log(Connections);
      res.send(Connections);
      });
  },

  'getConnections': function(req, res, next) {
    Connections.find({project:req.param('project')}).exec(function foundProject(err, Connections) {
      if (err) return next(err);
            if (!CObject) return next();
      // pass the array down to the /views/index.ejs page
       res.send(Connections);
       console.log("connections",Connections);
      //  res.json(user)

    });
  }


  // show: function(req, res, next) {
  //   CObject.findOne(req.param('id'), function foundCObject(err, Connections) {
  //     if (err) return next(err);
  //     if (!cObject) return next();
  //     res.send(cObject);
  //   });
  // },

  // index: function(req, res, next) {

  //   // Get an array of all users in the User collection(e.g. table)
  //   CObject.find(function foundUsers(err, cObjects) {
  //     if (err) return next(err);
  //     // pass the array down to the /views/index.ejs page
  //     res.send(cObjects)
  //   });
  // },

};