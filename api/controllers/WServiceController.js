/**
 * WServiceController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
 module.exports = {
  

  new: function (req,res){
    res.view();
  },
  
  
  create: function(req, res, next) {

    var wServiceObj = {
      project: req.param('project'),
      name: req.param('name'),

    }
    WService.create(wServiceObj, function wServiceCreated(err, wService) {

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
      console.log(wService);
      res.send(wService);
    });
  },


  show: function(req, res, next) {
    WService.findOne(req.param('id'), function foundWService(err, wService) {
      if (err) return next(err);
      if (!wService) return next();
      res.send(wService);
    });
  },

  index: function(req, res, next) {
    // Get an array of all users in the User collection(e.g. table)
    WService.find(function foundUsers(err, wServices) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.send(wServices)
    });
  },

  'getWSData': function(req, res, next) {
    WService.findOne({id:req.param('id')}).populate('wSDatas').exec(function foundProject(err, wSDatas) {
      if (err) return next(err);
      if (!WService) return next();
      // pass the array down to the /views/index.ejs page
      res.send(wSDatas)
      //  res.json(user)
      // console.log("datas",wSDatas);

    });
  },

  'getWSTrigger': function(req, res, next) {
    WService.findOne({id:req.param('id')}).populate('wSTriggers').exec(function foundProject(err, wSTriggers) {
      if (err) return next(err);
      if (!WService) return next();
      // pass the array down to the /views/index.ejs page
      res.send(wSTriggers)
      //  res.json(user)
       //console.log("triggers",wSTriggers);

     });
  },

  'getWSAction': function(req, res, next) {
    WService.findOne({id:req.param('id')}).populate('wSActions').exec(function foundProject(err, wSActions) {
      if (err) return next(err);
      if (!WService) return next();
      // pass the array down to the /views/index.ejs page
      res.send(wSActions);
     //  console.log("actions",wSActions);
      //  res.json(user)

    });
  },

};