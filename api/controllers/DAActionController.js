module.exports = {


  new: function (req,res){
    res.view();
  },

  
  create: function(req, res, next) {

    var dAActionObj = {
      dAnalyst: req.param('dAnalyst'),

    }
    DAAction.create(dAActionObj, function cObjectCreated(err, DAAction) {

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
      console.log(DAAction);
      res.send(DAAction);
    });
  },

  delete: function(req,res,next){
    DAAction.destroy({id:req.param('id')}).exec(function(err,data){
      console.log ("deleted DAAction", req.param('id'));
    });
      res.send(DAAction);

    },


  // show: function(req, res, next) {
  //   DAbject.findOne(req.param('id'), function foundDAbject(err, DAAction) {
  //     if (err) return next(err);
  //     if (!cObject) return next();
  //     res.send(cObject);
  //   });
  // },

  // index: function(req, res, next) {

  //   // Get an array of all users in the User collection(e.g. table)
  //   DAbject.find(function foundUsers(err, cObjects) {
  //     if (err) return next(err);
  //     // pass the array down to the /views/index.ejs page
  //     res.send(cObjects)
  //   });
  // },

};