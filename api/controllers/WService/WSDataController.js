module.exports = {
    

  new: function (req,res){
    res.view();
  },
    
  
  create: function(req, res, next) {

    var wSDataObj = {
      wService: req.param('wService'),

    }
    WSData.create(wSDataObj, function wServiceCreated(err, WSData) {

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
      console.log(WSData);
      res.send(WSData);
      });
  },


  // show: function(req, res, next) {
  //   WSbject.findOne(req.param('id'), function foundWSbject(err, WSData) {
  //     if (err) return next(err);
  //     if (!wService) return next();
  //     res.send(wService);
  //   });
  // },

  // index: function(req, res, next) {

  //   // Get an array of all users in the User collection(e.g. table)
  //   WSbject.find(function foundUsers(err, wServices) {
  //     if (err) return next(err);
  //     // pass the array down to the /views/index.ejs page
  //     res.send(wServices)
  //   });
  // },

};