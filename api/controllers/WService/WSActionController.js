module.exports = {
    

  new: function (req,res){
    res.view();
  },
    
  
  create: function(req, res, next) {

    var cOActionObj = {
      wService: req.param('wService'),

    }
    WSAction.create(wSActionObj, function cObjectCreated(err, WSAction) {

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
      console.log(WSAction);
      res.send(WSAction);
      });
  },


  // show: function(req, res, next) {
  //   WSbject.findOne(req.param('id'), function foundWSbject(err, WSAction) {
  //     if (err) return next(err);
  //     if (!cObject) return next();
  //     res.send(cObject);
  //   });
  // },

  // index: function(req, res, next) {

  //   // Get an array of all users in the User collection(e.g. table)
  //   WSbject.find(function foundUsers(err, cObjects) {
  //     if (err) return next(err);
  //     // pass the array down to the /views/index.ejs page
  //     res.send(cObjects)
  //   });
  // },

};