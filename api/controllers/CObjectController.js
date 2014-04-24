/**
 * CObjectController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
module.exports = {
    

  new: function (req,res){
    res.view();
  },
    
  
  create: function(req, res, next) {

    var cObjectObj = {
      project: req.param('project'),
      name: req.param('name'),

    }
    CObject.create(cObjectObj, function cObjectCreated(err, cObject) {

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
      console.log(cObject);
      res.send(cObject);
      });
  },


  show: function(req, res, next) {
    CObject.findOne(req.param('id'), function foundCObject(err, cObject) {
      if (err) return next(err);
      if (!cObject) return next();
      res.send(cObject);
    });
  },

  index: function(req, res, next) {
    // Get an array of all users in the User collection(e.g. table)
    CObject.find(function foundUsers(err, cObjects) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.send(cObjects)
    });
  },

 'getCOData': function(req, res, next) {
  CObject.findOne({id:req.param('id')}).populate('cODatas').exec(function foundProject(err, cODatas) {
      if (err) return next(err);
            if (!CObject) return next();
      // pass the array down to the /views/index.ejs page
       res.send(cODatas)
      //  res.json(user)
      // console.log("datas",cODatas);

    });
  },

 'getCOTrigger': function(req, res, next) {
  CObject.findOne({id:req.param('id')}).populate('cOTriggers').exec(function foundProject(err, cOTriggers) {
      if (err) return next(err);
            if (!CObject) return next();
      // pass the array down to the /views/index.ejs page
       res.send(cOTriggers)
      //  res.json(user)
       //console.log("triggers",cOTriggers);

    });
  },

     'getCOAction': function(req, res, next) {
  CObject.findOne({id:req.param('id')}).populate('cOActions').exec(function foundProject(err, cOActions) {
      if (err) return next(err);
            if (!CObject) return next();
      // pass the array down to the /views/index.ejs page
       res.send(cOActions);
     //  console.log("actions",cOActions);
      //  res.json(user)

    });
  },

};