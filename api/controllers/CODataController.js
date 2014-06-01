module.exports = {
    

  new: function (req,res){
    res.view();
  },
    
  
  create: function(req, res, next) {

    var cODataObj = {
      cObject: req.param('cObject'),

    }
    COData.create(cODataObj, function cObjectCreated(err, COData) {

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
      console.log(COData);
      res.send(COData);
      });
  },
    delete: function(req,res,next){
    COData.destroy({id:req.param('id')}).exec(function(err,data){
      console.log ("deleted COData", req.param('id'));
    });
      res.send(COData);

    },


  // show: function(req, res, next) {
  //   CObject.findOne(req.param('id'), function foundCObject(err, COData) {
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