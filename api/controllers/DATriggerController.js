module.exports = {
    

  new: function (req,res){
    res.view();
  },
    
  
  create: function(req, res, next) {

    var dATriggerObj = {
      dAnalyst: req.param('dAnalyst'),

    }
    DATrigger.create(dATriggerObj, function dAnalystCreated(err, DATrigger) {

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
      console.log("new TRigger",DATrigger);
      res.send(DATrigger);
      });
  },

  delete: function(req,res,next){
    DATrigger.destroy({id:req.param('id')}).exec(function(err,data){
      console.log ("deleted DATrigger", req.param('id'));
    });
 res.send(DATrigger);

    },

  // show: function(req, res, next) {
  //   DAnalyst.findOne(req.param('id'), function foundDAnalyst(err, DAData) {
  //     if (err) return next(err);
  //     if (!dAnalyst) return next();
  //     res.send(dAnalyst);
  //   });
  // },

  // index: function(req, res, next) {

  //   // Get an array of all users in the User collection(e.g. table)
  //   DAnalyst.find(function foundUsers(err, dAnalysts) {
  //     if (err) return next(err);
  //     // pass the array down to the /views/index.ejs page
  //     res.send(dAnalysts)
  //   });
  // },

};