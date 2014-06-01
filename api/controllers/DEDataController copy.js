module.exports = {
    

  new: function (req,res){
    res.view();
  },
    
  
  create: function(req, res, next) {

    var dADataObj = {
      dAnalyst: req.param('dAnalyst'),

    }
    DAData.create(dADataObj, function dAnalystCreated(err, DAData) {

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
      console.log(DAData);
      res.send(DAData);
      });
  },

  delete: function(req,res,next){
    DAData.destroy({id:req.param('id')}).exec(function(err,data){
      console.log ("deleted DAData", req.param('id'));
    });
    res.send(DAData);


  },


  // show: function(req, res, next) {
  //   DAbject.findOne(req.param('id'), function foundDAbject(err, DAData) {
  //     if (err) return next(err);
  //     if (!dAnalyst) return next();
  //     res.send(dAnalyst);
  //   });
  // },

  // index: function(req, res, next) {

  //   // Get an array of all users in the User collection(e.g. table)
  //   DAbject.find(function foundUsers(err, dAnalysts) {
  //     if (err) return next(err);
  //     // pass the array down to the /views/index.ejs page
  //     res.send(dAnalysts)
  //   });
  // },

};