/**
 * DAnalystController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
 module.exports = {
  

  new: function (req,res){
    res.view();
  },
  
  
  create: function(req, res, next) {

    var dAnalystObj = {
      project: req.param('project'),
      name: req.param('name'),

    }
    DAnalyst.create(dAnalystObj, function dAnalystCreated(err, dAnalyst) {

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
      console.log(dAnalyst);
      res.send(dAnalyst);
    });
  },


  show: function(req, res, next) {
    DAnalyst.findOne(req.param('id'), function foundDAnalyst(err, dAnalyst) {
      if (err) return next(err);
      if (!dAnalyst) return next();
      res.send(dAnalyst);
    });
  },

  index: function(req, res, next) {
    // Get an array of all users in the User collection(e.g. table)
    DAnalyst.find(function foundUsers(err, dAnalysts) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.send(dAnalysts)
    });
  },

  'getDAData': function(req, res, next) {
    DAnalyst.findOne({id:req.param('id')}).populate('dADatas').exec(function foundProject(err, dADatas) {
      if (err) return next(err);
      if (!DAnalyst) return next();
      // pass the array down to the /views/index.ejs page
      res.send(dADatas)
      //  res.json(user)
      // console.log("datas",dADatas);

    });
  },

  'getDATrigger': function(req, res, next) {
    DAnalyst.findOne({id:req.param('id')}).populate('dATriggers').exec(function foundProject(err, dATriggers) {
      if (err) return next(err);
      if (!DAnalyst) return next();
      // pass the array down to the /views/index.ejs page
      res.send(dATriggers)
      //  res.json(user)
       //console.log("triggers",dATriggers);

     });
  },

  'getDAAction': function(req, res, next) {
    DAnalyst.findOne({id:req.param('id')}).populate('dAActions').exec(function foundProject(err, dAActions) {
      if (err) return next(err);
      if (!DAnalyst) return next();
      // pass the array down to the /views/index.ejs page
      res.send(dAActions);
     //  console.log("actions",dAActions);
      //  res.json(user)

    });
  },

};