module.exports = {
    

  new: function (req,res){
    res.view();
  },
    
  
  create: function(req, res, next) {

    var wSTriggerObj = {
      wService: req.param('wService'),

    }
    WSTrigger.create(wSTriggerObj, function wServiceCreated(err, WSTrigger) {

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
      console.log("new TRigger",WSTrigger);
      res.send(WSTrigger);
      });
  },

  delete: function(req,res,next){
    WSTrigger.destroy({id:req.param('id')}).exec(function(err,data){
      console.log ("deleted WSTrigger", req.param('id'));
    });
 res.send(WSTrigger);

    },

  // show: function(req, res, next) {
  //   WService.findOne(req.param('id'), function foundWService(err, WSData) {
  //     if (err) return next(err);
  //     if (!wService) return next();
  //     res.send(wService);
  //   });
  // },

  // index: function(req, res, next) {

  //   // Get an array of all users in the User collection(e.g. table)
  //   WService.find(function foundUsers(err, wServices) {
  //     if (err) return next(err);
  //     // pass the array down to the /views/index.ejs page
  //     res.send(wServices)
  //   });
  // },

};